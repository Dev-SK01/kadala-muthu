import React, { useEffect, useState } from "react";
import "./sidebarChat.css";
import { Avatar } from "@mui/material";
import axios from 'axios';


const SideBarChat = ({ addNewChat }) => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createGroup = async()=>{
    const groupName = prompt("Enter A Group Name");
    if(groupName){
      try{
         await axios.post('http://localhost:2500/group/create', {
          groupName : groupName
         });
      }catch(err){
        console.log(err)
      }
    }
  }

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar
        src={`https://api.dicebear.com/9.x/notionists/svg?seed=${seed}`}
      />
      <div className="sidebarChat__info">
        <h2>Srikanth</h2>
      </div>
    </div>
  ) : (
    <div className="sidebarChat" onClick={createGroup}>
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SideBarChat;
