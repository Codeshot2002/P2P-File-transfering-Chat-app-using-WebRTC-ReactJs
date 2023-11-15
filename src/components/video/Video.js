import React, { useEffect, useState } from 'react'
import { Peer } from "peerjs";
function Video() {
  //p2p states
  const [id, setId] = useState('id');
  const [remoteId, setRemoteId] = useState('');
  const [peer, setpeer] = useState();

  const [messages, setMessages] = useState([]);
  const [newMesg, setNewMesg] = useState();

  
  useEffect(() => {
    //setting up connection
    const peer = new Peer();
    setpeer(peer);

    var connection = false;

    //receive mesgs
    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        // Will print 'hi!'
        console.log(data);
        if (!connection && data.length == 36) {
          setRemoteId(data);
          connection = true;
        }
        else{setMessages((prevMessage) => [data,...prevMessage]);}
      });
    });
  }, [])

  const connect = () => {
    const conn = peer.connect(remoteId);
    conn.on("open", () => {
      conn.send(id)
    })
  }

  const send = () => {
    setMessages([{ text: newMesg }, ...messages]);
    console.log(newMesg);
    if (remoteId) {
      const conn = peer.connect(remoteId);
      conn.on("open", () => {
        conn.send(newMesg);
      })
    }else{
      console.log("input remote ID");
    }
  }
  return (
    <>
      <input type="text" id="peer_input" placeholder='Peer ID' value={remoteId} onChange={(e) => { setRemoteId(e.target.value); setId(peer._id); }} />
      <input type="text" placeholder='Send your message' value={newMesg} onChange={(e) => setNewMesg(e.target.value)} />
      <button onClick={send}>Send</button>
      <button onClick={connect}>Connect</button>
      <br />
      <p id="user1">Your id : {id}</p>
      <br />
      <button onClick={() => {console.log(messages)}}>Show</button>

    </>
  )
}

export default Video