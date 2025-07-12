import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Donation from './pages/Donation';
import Scrapbook from './pages/Scrapbook';
import Rewards from './pages/Rewards';
import Modal from './components/Modal';

function App() {
  const [appState, setAppState] = useState({
    credits: 500,
    donations: [],
    scrapbookEntries: [
      {
        id: 1,
        image: 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?auto=compress&cs=tinysrgb&w=400',
        caption: 'Beach cleanup drive - collected 50kg of plastic waste',
        date: '2024-01-15',
        credits: 75
      },
      {
        id: 2,
        image: 'https://images.pexels.com/photos/6591305/pexels-photo-6591305.jpeg?auto=compress&cs=tinysrgb&w=400',
        caption: 'Donated 20 pieces of clothing to local shelter',
        date: '2024-01-10',
        credits: 50
      },
      {
        id: 3,
        image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
        caption: 'Attended sustainable living workshop',
        date: '2024-01-05',
        credits: 30
      }
    ],
    redeemedRewards: []
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const updateCredits = (amount) => {
    setAppState(prev => ({
      ...prev,
      credits: prev.credits + amount
    }));
  };

  const showNotification = (title, message) => {
    setModalContent({ title, message });
    setShowModal(true);
  };

  const addScrapbookEntry = (entry) => {
    setAppState(prev => ({
      ...prev,
      scrapbookEntries: [entry, ...prev.scrapbookEntries]
    }));
  };

  const redeemReward = (rewardId, cost) => {
    if (appState.credits >= cost) {
      setAppState(prev => ({
        ...prev,
        credits: prev.credits - cost,
        redeemedRewards: [...prev.redeemedRewards, rewardId]
      }));
      return true;
    }
    return false;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard
                  credits={appState.credits}
                  onShowNotification={showNotification}
                  onUpdateCredits={updateCredits}
                />
              }
            />
            <Route 
              path="/donation" 
              element={
                <Donation
                  onShowNotification={showNotification}
                  onUpdateCredits={updateCredits}
                />
              }
            />
            <Route 
              path="/scrapbook" 
              element={
                <Scrapbook
                  entries={appState.scrapbookEntries}
                  onAddEntry={addScrapbookEntry}
                  onShowNotification={showNotification}
                  onUpdateCredits={updateCredits}
                />
              }
            />
            <Route 
              path="/rewards" 
              element={
                <Rewards
                  credits={appState.credits}
                  redeemedRewards={appState.redeemedRewards}
                  onRedeemReward={redeemReward}
                  onShowNotification={showNotification}
                />
              }
            />
          </Routes>
        </main>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={modalContent.title}
          message={modalContent.message}
        />
      </div>
    </Router>
  );
}

export default App;