// NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.errorText}>404</h1>
      <p style={styles.messageText}>Page Not Found</p>
    </div>
  );
};
const floatKeyframes = {
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
  },
  animationName: 'float',
};

const pulseKeyframes = {
  '@keyframes pulse': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.6 },
  },
  animationName: 'pulse',
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#e0f7fa',
    color: '#0077b6',
    overflow: 'hidden',
  },
  errorText: {
    fontSize: '10rem',
    fontWeight: 'bold',
    animation: 'float 3s ease-in-out infinite',
    ...floatKeyframes,
  },
  messageText: {
    fontSize: '1.5rem',
    animation: 'pulse 1.5s ease-in-out infinite',
    ...pulseKeyframes,
  },
};

// Define keyframes inline

export default NotFound;
