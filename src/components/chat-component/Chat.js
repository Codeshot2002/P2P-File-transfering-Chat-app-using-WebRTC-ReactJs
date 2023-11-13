import React, { useState } from 'react';
import ChatContainer from './ChatContainer';
import './chat.css';

function Chat() {
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const i = 0;
    const handleSendMessage = () => {
      if (newMessage.trim() !== '') {
        setChatMessages([{ text: newMessage },...chatMessages]);
        setNewMessage('');
      }
      console.log(chatMessages);
    };
  
    return (
        <>
      <div className="App">
        <h1>Chat App</h1>
        <ChatContainer chatMessages={chatMessages} />
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      </>
    );
  }

export default Chat