import React from "react";
import {createRoom,joinRoom} from './webRTC'
function Video() {
  return (
    <>
    <input type="text" id='room-input' />
      <button id="create-room" onClick={createRoom}>Create room</button>
      <button className="join-room" onClick={joinRoom}>Join</button>
    </>
  );
}

export default Video;
