import React from 'react';

const ChatContainer = ({ chatMessages }) => {
  // Reverse the order of chatMessages temporarily
  return (
    <div className="chat-container">
      {chatMessages.map((message, index) => (
        <div key={index} className="chat-message">
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
