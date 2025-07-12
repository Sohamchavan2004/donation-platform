import React from 'react';
import './Rewards.css';

const Rewards = ({ credits, redeemedRewards, onRedeemReward, onShowNotification }) => {
  const rewards = [
    { id: 'voucher-500', title: '₹500 Shopping Voucher', description: 'Redeemable at partner eco-friendly stores', credits: 400, value: '₹500', icon: '🛍️', color: 'bg-blue-500', category: 'Shopping' },
    { id: 'discount-20', title: '20% Off Organic Products', description: 'Valid on all organic food items', credits: 200, value: '20%', icon: '🥗', color: 'bg-green-600', category: 'Food' },
    { id: 'coffee-free', title: 'Free Coffee for a Week', description: 'At participating sustainable cafes', credits: 150, value: '7 Days', icon: '☕', color: 'bg-yellow-500', category: 'Beverage' },
    { id: 'transport-50', title: '₹50 Transport Credit', description: 'For eco-friendly ride sharing', credits: 100, value: '₹50', icon: '🚗', color: 'bg-purple-500', category: 'Transport' },
    { id: 'movie-ticket', title: 'Free Movie Ticket', description: 'Valid at eco-conscious cinema chains', credits: 300, value: '1 Ticket', icon: '🎬', color: 'bg-red-500', category: 'Entertainment' },
    { id: 'gift-card-100', title: '₹100 Gift Card', description: 'Universal gift card for sustainable brands', credits: 120, value: '₹100', icon: '🎁', color: 'bg-indigo-500', category: 'Shopping' }
  ];

  const handleRedeem = (reward) => {
    if (redeemedRewards.includes(reward.id)) {
      onShowNotification('Already Redeemed', 'You have already redeemed this reward!');
      return;
    }
    const success = onRedeemReward(reward.id, reward.credits);
    if (success) {
      onShowNotification('Reward Redeemed!', `You've successfully redeemed ${reward.title}. Check your email for redemption details!`);
    } else {
      onShowNotification('Insufficient Credits', `You need ${reward.credits} credits to redeem this reward. You currently have ${credits} credits.`);
    }
  };

  const categories = [...new Set(rewards.map(r => r.category))];

  return React.createElement('div', { className: 'rewards' },
    // Header
    React.createElement('div', { className: 'rewards-header' },
      React.createElement('h1', { className: 'rewards-title' }, 'Rewards Store'),
      React.createElement('p', { className: 'rewards-subtitle' }, 'Redeem your eco-credits for amazing rewards'),
      React.createElement('div', { className: 'current-credits' },
        React.createElement('span', { className: 'credits-icon' }, '🪙'),
        React.createElement('span', { className: 'credits-text' }, `${credits} Credits Available`)
      )
    ),

    // Categories
    React.createElement('div', { className: 'categories' },
      categories.map(category =>
        React.createElement('div', { key: category, className: 'category-section' },
          React.createElement('h2', { className: 'category-title' }, category),
          React.createElement('div', { className: 'rewards-grid' },
            rewards.filter(r => r.category === category).map(reward =>
              React.createElement('div', { 
                key: reward.id, 
                className: `reward-card ${redeemedRewards.includes(reward.id) ? 'redeemed' : ''}` 
              },
                React.createElement('div', { className: `reward-icon ${reward.color}` }, reward.icon),
                React.createElement('h3', { className: 'reward-title' }, reward.title),
                React.createElement('p', { className: 'reward-description' }, reward.description),
                React.createElement('div', { className: 'reward-value' }, reward.value),
                React.createElement('div', { className: 'reward-footer' },
                  React.createElement('span', { className: 'reward-cost' }, `${reward.credits} credits`),
                  React.createElement('button', {
                    onClick: () => handleRedeem(reward),
                    disabled: redeemedRewards.includes(reward.id) || credits < reward.credits,
                    className: 'redeem-btn'
                  }, 
                    redeemedRewards.includes(reward.id) ? 'Redeemed' : 
                    credits < reward.credits ? 'Insufficient Credits' : 'Redeem'
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};

export default Rewards;