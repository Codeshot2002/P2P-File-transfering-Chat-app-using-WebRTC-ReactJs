import React, { useState } from 'react';
import ChatContainer from './ChatContainer';
import './chat.css';

function Chat() {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();

  const[myId, setMyId] = useState();
  const[remoteId, setRemoteId] = useState([]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newChatMessage = { name: myId, message: newMessage };
      setChatMessages([newChatMessage, ...chatMessages]);
      setNewMessage('');
    }
    console.log(chatMessages);
  };




  //Entering details (Starting part)
  const [name, setName] = useState('');
  const [lobbyName, setLobbyName] = useState('');

  const handleJoinLobby = () => {
    if (name && lobbyName) {
      //Join lobby
      console.log(name + " joined the lobby");
      setMyId(name);
    } else {
      alert('Please enter your name and lobby name.');
    }
  };

  const handleCreateLobby = () => {
    if (name && lobbyName) {
      //Create lobby
      console.log(name + "created the lobby");
      setMyId(name);
    } else {
      alert('Please enter your name and lobby name.');
    }
  };



  return (
    <>
      <div className="dialog-box">
      <h2>Enter Your Details</h2>
      <label>
        Your Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Lobby Name:
        <input
          type="text"
          value={lobbyName}
          onChange={(e) => setLobbyName(e.target.value)}
        />
      </label>
      <div>
        <button onClick={handleJoinLobby}>Join Lobby</button>
        <button onClick={handleCreateLobby}>Create Lobby</button>
      </div>
    </div>
      <div className="App">
        <h1>Chat App</h1>
        <ChatContainer chatMessages={chatMessages} 
        host={myId}/>
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