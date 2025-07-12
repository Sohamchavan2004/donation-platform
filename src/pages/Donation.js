import React, { useState } from 'react';
import './Donation.css';

const Donation = ({ onShowNotification, onUpdateCredits }) => {
  const [formData, setFormData] = useState({
    pickupDate: '',
    address: '',
    contactNumber: '',
    itemDescription: '',
    photo: null
  });
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [otpVerified, setOTPVerified] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setFormData(prev => ({ ...prev, photo: file }));
  };

  const handleSendOTP = () => {
    if (formData.contactNumber.length === 10) {
      setShowOTP(true);
      onShowNotification('OTP Sent!', 'Verification code sent to your mobile number');
    }
  };

  const handleVerifyOTP = () => {
    if (otp === '1234') {
      setOTPVerified(true);
      onShowNotification('OTP Verified!', 'Your mobile number has been verified successfully');
    } else {
      onShowNotification('Invalid OTP', 'Please enter the correct OTP');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpVerified) {
      onShowNotification('Verification Required', 'Please verify your mobile number first');
      return;
    }
    onUpdateCredits(50);
    onShowNotification('Donation Scheduled!', 'Your pickup has been scheduled. Our team will contact you soon!');
    setFormData({ pickupDate: '', address: '', contactNumber: '', itemDescription: '', photo: null });
    setShowOTP(false);
    setOTP('');
    setOTPVerified(false);
  };

  return React.createElement('div', { className: 'donation-page' },
    React.createElement('div', { className: 'donation-container' },
      React.createElement('div', { className: 'donation-header' },
        React.createElement('h1', { className: 'donation-title' }, 'Schedule Donation Pickup'),
        React.createElement('p', { className: 'donation-subtitle' }, 'Help the environment while earning credits')
      ),
      
      React.createElement('form', { onSubmit: handleSubmit, className: 'donation-form' },
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Pickup Date'),
          React.createElement('input', {
            type: 'date',
            name: 'pickupDate',
            value: formData.pickupDate,
            onChange: handleInputChange,
            required: true,
            className: 'form-input'
          })
        ),
        
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Address'),
          React.createElement('textarea', {
            name: 'address',
            value: formData.address,
            onChange: handleInputChange,
            required: true,
            rows: 3,
            placeholder: 'Enter your full address',
            className: 'form-input form-textarea'
          })
        ),
        
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Contact Number'),
          React.createElement('div', { className: 'contact-section' },
            React.createElement('input', {
              type: 'tel',
              name: 'contactNumber',
              value: formData.contactNumber,
              onChange: handleInputChange,
              required: true,
              placeholder: '10-digit mobile number',
              className: 'form-input'
            }),
            React.createElement('button', {
              type: 'button',
              onClick: handleSendOTP,
              disabled: formData.contactNumber.length !== 10,
              className: 'otp-btn'
            }, 'Send OTP')
          )
        ),
        
        showOTP && React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Enter OTP'),
          React.createElement('div', { className: 'otp-section' },
            React.createElement('input', {
              type: 'text',
              value: otp,
              onChange: (e) => setOTP(e.target.value),
              placeholder: 'Enter 4-digit OTP',
              className: 'form-input'
            }),
            React.createElement('button', {
              type: 'button',
              onClick: handleVerifyOTP,
              className: 'verify-btn'
            }, 'Verify')
          )
        ),
        
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Item Description'),
          React.createElement('textarea', {
            name: 'itemDescription',
            value: formData.itemDescription,
            onChange: handleInputChange,
            required: true,
            rows: 3,
            placeholder: 'Describe the items you want to donate',
            className: 'form-input form-textarea'
          })
        ),
        
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, 'Upload Photo'),
          React.createElement('input', {
            type: 'file',
            accept: 'image/*',
            onChange: handleFileChange,
            required: true,
            className: 'file-input'
          })
        ),
        
        React.createElement('button', {
          type: 'submit',
          className: 'submit-btn'
        }, 'Schedule Pickup (+50 Credits)')
      )
    )
  );
};

export default Donation;