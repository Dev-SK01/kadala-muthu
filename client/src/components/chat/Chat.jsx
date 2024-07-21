import React, { useEffect, useState } from "react";
import "./chat.css";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
const Chat = () => {
  const [seed, setSeed] = useState("");
  const [message , setMessage] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = async(e)=>{
      e.preventDefault();
      console.log(message);
  }

  return (

    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://api.dicebear.com/9.x/notionists/svg?seed=${seed}`}
        />

        <div className="chat__headerInfo">
          <h3>React Developers</h3>
          <p>Last Updated {new Date().toString().slice(0, 25)}</p>
        </div>

        <div className="chat__headerRight">
          {/* icon for the chats */}
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <p className="chat__message">
          <span className="chat__name">Srikanth</span>
          hello From Anton
          <span className="chat__timestamp">
            {new Date().toString().slice(0, 25)}
          </span>
        </p>
        <p className="chat__message chat__receiver">
          <span className="chat__name">Srikanth</span>
          hello From Anton
          <span className="chat__timestamp">
            {new Date().toString().slice(0, 25)}
          </span>
        </p>
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input 
          type="text" 
          placeholder="Type a Message" 
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
