import React, { useEffect, useState } from "react";
import "./sidebarChat.css";
import { Avatar } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const SideBarChat = ({ addNewChat, name, id ,createGroup}) => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);



  return !addNewChat ? (
    
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://api.dicebear.com/9.x/notionists/svg?seed=${seed}`}
        />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createGroup}>
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SideBarChat;
