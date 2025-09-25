import React, { useEffect, useState } from 'react';
import './WelcomeAnimation.css';

const WelcomeAnimation = ({ username, onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  
  console.log('WelcomeAnimation component rendered with username:', username);
  
  const lines = [
    `Welcome to OBS Banking, ${username}!`,
    'Access all features at your service 24/7.',
    'Customer service solves your issues within 24 hours.',
    'Enjoy secure and private banking.'
  ];

  useEffect(() => {
    console.log('WelcomeAnimation useEffect started');
    const animateLines = () => {
      const timeline = [
        { delay: 0, duration: 800 },
        { delay: 1100, duration: 800 },
        { delay: 2200, duration: 800 },
        { delay: 3300, duration: 800 }
      ];

      timeline.forEach((timing, index) => {
        setTimeout(() => {
          setCurrentLine(index + 1);
        }, timing.delay);
      });

      // Complete animation after all lines are shown
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 5000);
    };

    animateLines();
  }, [username, onComplete]);

  return (
    <div className="welcome-overlay">
      <div className="welcome-container">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`welcome-line ${index < currentLine ? 'visible' : ''} ${
              index === 0 ? 'primary-line' : ''
            }`}
            style={{ animationDelay: `${index * 1.1}s` }}
          >
            {index === 0 ? (
              <>
                Welcome to OBS Banking,{' '}
                <span className="username-highlight">{username}</span>!
              </>
            ) : (
              line
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeAnimation;