import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';

const MyPeerComponent = () => {
  const [myPeer, setMyPeer] = useState(null);
  const [peerIdInput, setPeerIdInput] = useState('');
  const [connectedPeers, setConnectedPeers] = useState([]);

  useEffect(() => {
    var name = prompt("");
    // Create a Peer object with a custom ID (replace 'your-custom-id' with your desired ID)
    const peer = new Peer(name);

    // Event handler for when the connection to the signaling server is open
    peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
    });

    // Event handler for an incoming connection
    peer.on('connection', (conn) => {
      // Handle incoming data from the connected peer
      conn.on('data', (data) => {
        console.log('Received data:', data);
      });

      // Add the connected peer to the list
      setConnectedPeers((prevPeers) => [...prevPeers, conn.peer]);

      // Automatically connect to other peers when a new peer connects
      connectToOtherPeers(conn.peer);
    });

    // Set the created peer object in the state
    setMyPeer(peer);

    // Clean up the Peer object when the component unmounts
    return () => {
      peer.destroy();
    };
  }, []);

  const connectToPeer = () => {
    if (myPeer && peerIdInput) {
      // Check if the peer ID is already in the connectedPeers state
      if (connectedPeers.includes(peerIdInput)) {
        console.log('Already connected to ' + peerIdInput);
        return;
      }

      const conn = myPeer.connect(peerIdInput);

      // Handle the connection status
      conn.on('open', () => {
        console.log('Connected to ' + conn.peer);
      });

      // Handle incoming data from the connected peer
      conn.on('data', (data) => {
        console.log('Received data:', data);
      });

      // Add the connected peer to the list
      setConnectedPeers((prevPeers) => [...prevPeers, conn.peer]);

      // Automatically connect to other peers when a new peer connects
      connectToOtherPeers(conn.peer);
    }
  };

  // Function to connect to other peers when a new peer connects
  const connectToOtherPeers = (newPeerId) => {
    connectedPeers.forEach((existingPeerId) => {
      if (existingPeerId !== newPeerId) {
        // Connect to the other peer
        const conn = myPeer.connect(existingPeerId);

        // Handle the connection status
        conn.on('open', () => {
          console.log(`Connected to ${existingPeerId} via ${newPeerId}`);
        });

        // Handle incoming data from the connected peer
        conn.on('data', (data) => {
          console.log('Received data:', data);
        });
      }
    });
  };

  return (
    <div>
      <h1>My PeerJS Component</h1>
      <input
        type="text"
        placeholder="Enter peer ID"
        value={peerIdInput}
        onChange={(e) => setPeerIdInput(e.target.value)}
      />
      <button onClick={connectToPeer}>Connect to Peer</button>

      <h2>Connected Peers</h2>
      <ul>
        {connectedPeers.map((peer) => (
          <li key={peer}>{peer}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyPeerComponent;
