import React from 'react';

const Notification = ({ notification }) => {
  const notificationSyle = {
    backgroundColor: notification.type === 'ok' ? '#4caf50' : '#f44336',
    color: 'white',
    borderRadius: 4,
    padding: '10px 20px',
    marginTop: 20,
    boxShadow: '0 5px 20px -5px lightgray'
  }


  if (notification.message === null)
    return null;

  return (
    <div style={notificationSyle}>
      {notification.message}
    </div>
  );
};

export default Notification;