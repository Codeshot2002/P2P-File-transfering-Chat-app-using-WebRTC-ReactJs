import React from 'react';

const ChatContainer = ({ chatMessages,host }) => {
  const isMessageFromHost = (name) => name == host;
  return (
    <div className={`chat-container ${isMessageFromHost(chatMessages[0]?.name) ? 'from-host' : 'from-others'}`}>
      {chatMessages.map((message, index) => (
        <div key={index} className={`chat-message ${isMessageFromHost(message.name) ? 'from-host' : 'from-others'}`}>
          {message.message}
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
