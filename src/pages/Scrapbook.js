import React, { useState } from 'react';
import './Scrapbook.css';

const Scrapbook = ({ entries, onAddEntry, onShowNotification, onUpdateCredits }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    caption: '',
    photo: null
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewEntry(prev => ({
        ...prev,
        photo: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEntry.caption && newEntry.photo) {
      const entry = {
        id: Date.now(),
        image: URL.createObjectURL(newEntry.photo),
        caption: newEntry.caption,
        date: new Date().toISOString().split('T')[0],
        credits: 25
      };

      onAddEntry(entry);
      onUpdateCredits(25);
      onShowNotification('Entry Added!', 'Your eco-deed has been added to the scrapbook and you earned 25 credits!');

      setNewEntry({ caption: '', photo: null });
      setShowAddForm(false);
    }
  };

  return React.createElement('div', { className: 'scrapbook' },
    // Header
    React.createElement('div', { className: 'scrapbook-header' },
      React.createElement('h1', { className: 'scrapbook-title' }, 'Eco-Deeds Scrapbook'),
      React.createElement('p', { className: 'scrapbook-subtitle' }, 'Document your environmental impact and inspire others')
    ),

    // Add Entry Button
    React.createElement('div', { className: 'add-entry-section' },
      React.createElement('button', {
        onClick: () => setShowAddForm(true),
        className: 'add-entry-btn'
      },
        React.createElement('span', { className: 'btn-icon' }, '➕'),
        React.createElement('span', null, 'Add New Entry')
      )
    ),

    // Add Entry Form
    showAddForm && React.createElement('div', { className: 'add-form-container' },
      React.createElement('h2', { className: 'form-title' }, 'Add Your Eco-Deed'),
      React.createElement('form', { onSubmit: handleSubmit, className: 'add-form' },
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' },
            React.createElement('span', { className: 'label-icon' }, '📷'),
            React.createElement('span', null, 'Upload Photo')
          ),
          React.createElement('input', {
            type: 'file',
            accept: 'image/*',
            onChange: handleFileChange,
            required: true,
            className: 'file-input'
          })
        ),

        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Caption'),
          React.createElement('textarea', {
            value: newEntry.caption,
            onChange: (e) => setNewEntry(prev => ({ ...prev, caption: e.target.value })),
            required: true,
            rows: 3,
            placeholder: 'Describe your eco-friendly action...',
            className: 'form-input form-textarea'
          })
        ),

        React.createElement('div', { className: 'form-actions' },
          React.createElement('button', { type: 'submit', className: 'submit-btn' }, 'Add Entry (+25 Credits)'),
          React.createElement('button', { 
            type: 'button', 
            onClick: () => setShowAddForm(false), 
            className: 'cancel-btn' 
          }, 'Cancel')
        )
      )
    ),

    // Gallery
    React.createElement('div', { className: 'gallery' },
      entries.map((entry) =>
        React.createElement('div', { key: entry.id, className: 'gallery-item' },
          React.createElement('div', { className: 'image-container' },
            React.createElement('img', { 
              src: entry.image, 
              alt: entry.caption, 
              className: 'gallery-image' 
            })
          ),
          React.createElement('div', { className: 'item-content' },
            React.createElement('p', { className: 'item-caption' }, entry.caption),
            React.createElement('div', { className: 'item-footer' },
              React.createElement('div', { className: 'item-date' },
                React.createElement('span', { className: 'date-icon' }, '📅'),
                React.createElement('span', null, new Date(entry.date).toLocaleDateString())
              ),
              React.createElement('div', { className: 'item-credits' },
                React.createElement('span', { className: 'credits-icon' }, '🏆'),
                React.createElement('span', null, `+${entry.credits}`)
              )
            )
          )
        )
      )
    ),

    // Empty State
    entries.length === 0 && !showAddForm && React.createElement('div', { className: 'empty-state' },
      React.createElement('span', { className: 'empty-icon' }, '📷'),
      React.createElement('h3', { className: 'empty-title' }, 'No entries yet'),
      React.createElement('p', { className: 'empty-subtitle' }, 'Start documenting your eco-friendly actions!'),
      React.createElement('button', {
        onClick: () => setShowAddForm(true),
        className: 'empty-action-btn'
      }, 'Add Your First Entry')
    )
  );
};

export default Scrapbook;