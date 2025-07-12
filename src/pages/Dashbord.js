import React from 'react';
import './Dashboard.css';

const Dashboard = ({ credits, onShowNotification, onUpdateCredits }) => {
  const activities = [
    {
      icon: '👕',
      title: 'Donate Clothes',
      description: 'Schedule a pickup for your unused clothes',
      credits: '+50 credits',
      color: 'bg-blue-500',
      path: '/donation'
    },
    {
      icon: '👥',
      title: 'Join Cleanup',
      description: 'Participate in community cleanup drives',
      credits: '+75 credits',
      color: 'bg-green-600',
      action: () => {
        onUpdateCredits(75);
        onShowNotification(
          'Cleanup Joined!',
          "You've successfully joined the next cleanup drive. We'll notify you about the details!"
        );
      }
    },
    {
      icon: '📚',
      title: 'Attend Workshop',
      description: 'Learn about sustainable living practices',
      credits: '+30 credits',
      color: 'bg-purple-500',
      action: () => {
        onUpdateCredits(30);
        onShowNotification(
          'Workshop Registered!',
          "You've been registered for the upcoming sustainability workshop. Check your email for details!"
        );
      }
    }
  ];

  const stats = [
    { label: 'Donations Made', value: '12.8kg', subtext: 'Clothes donated' },
    { label: 'Donation Count', value: '7', subtext: 'Times donated' }
  ];

  return React.createElement('div', { className: 'dashboard' },
    // Hero Section
    React.createElement('div', { className: 'hero-section' },
      React.createElement('h1', { className: 'hero-title' }, 'Welcome to Your Eco Dashboard'),
      React.createElement('p', { className: 'hero-subtitle' }, 
        'Track your environmental impact and earn credits for sustainable actions')
    ),

    // Credits Balance
    React.createElement('div', { className: 'credits-card' },
      React.createElement('div', { className: 'credits-header' },
        React.createElement('span', { className: 'credits-icon' }, '🪙'),
        React.createElement('h2', { className: 'credits-title' }, 'Credits Balance')
      ),
      React.createElement('div', { className: 'credits-amount' }, credits),
      React.createElement('p', { className: 'credits-subtitle' }, 'Available for rewards')
    ),

    // Stats Grid
    React.createElement('div', { className: 'stats-grid' },
      stats.map((stat, index) =>
        React.createElement('div', { key: index, className: 'stat-card' },
          React.createElement('div', { className: 'stat-value' }, stat.value),
          React.createElement('div', { className: 'stat-label' }, stat.label),
          React.createElement('div', { className: 'stat-subtext' }, stat.subtext)
        )
      )
    ),

    // Action Cards
    React.createElement('div', { className: 'actions-grid' },
      activities.map((activity, index) =>
        React.createElement('div', { key: index, className: 'action-card' },
          React.createElement('div', { className: `action-icon ${activity.color}` }, activity.icon),
          React.createElement('h3', { className: 'action-title' }, activity.title),
          React.createElement('p', { className: 'action-description' }, activity.description),
          React.createElement('div', { className: 'action-footer' },
            React.createElement('span', { className: 'action-credits' }, activity.credits),
            React.createElement('button', {
              onClick: activity.action || (() => window.location.href = activity.path || '#'),
              className: 'action-btn'
            }, activity.path ? 'Get Started' : 'Join Now')
          )
        )
      )
    )
  );
};

export default Dashboard;