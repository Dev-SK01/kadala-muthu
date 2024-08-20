import React, { useEffect, useState } from "react";
import "./chat.css";
import { Avatar, IconButton } from "@mui/material";
import {AttachFile,InsertEmoticon,MoreVert,SearchOutlined} from "@mui/icons-material";
import axios from "axios";
import { useData } from "../contextAPI/DataProvider";
import { useParams } from "react-router-dom";
import Pusher from 'pusher-js'

const Chat = () => {

  const [seed, setSeed] = useState("");
  const [message, setMessage] = useState("");
  const [groupName, setGroupName] = useState("");
  const [updateAt, setUpdatedAt] = useState("");
  const [groupMessages, setGroupMessages] = useState([]);
  const [{ user }] = useData();
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      axios.get(`http://localhost:2500/rooms/${roomId}`).then((res) => {
        setGroupName(res.data.name);
        setUpdatedAt(res.data.updatedAt);
      });

      axios.get(`http://localhost:2500/messages/${roomId}`).then((res) => {
        setGroupMessages(res.data);
      });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  // realtime message sending using pusher
  useEffect(()=>{
    const pusher = new Pusher('e58366e9cc404c5fcd77', {
     cluster: 'ap2'
   });
   
   const roomChannel = pusher.subscribe('messages');
   roomChannel.bind('inserted', (MessageData) => {
     setGroupMessages((prevMessagesData)=>[...prevMessagesData , MessageData]);
   });
 },[]);

  // send message function
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    } else {
      await axios.post("http://localhost:2500/message/new", {
        message: message,
        name: user.displayName,
        timestamp: new Date().toLocaleString(),
        uid: user.uid,
        groupId: roomId,
      });
      setMessage("");
      const updatedMessage = {
        message: message,
        name: user.displayName,
        updatedAt: new Date(),
        uid: user.uid,
        groupId: roomId,
      }
      setGroupMessages([...groupMessages,updatedMessage]);
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://api.dicebear.com/9.x/notionists/svg?seed=${seed}`}
        />

        <div className="chat__headerInfo">
          <h3>{groupName ? groupName : "Welcome To Kadala Muthu"}</h3>
          <p>
            {updateAt
              ? `Last Updated ${new Date(updateAt).toString().slice(0, 25)}`
              : "Start Chat..."}
          </p>
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
      {/* realtime message sending pusher */}
      <div className="chat__body">
        {groupMessages.map((msg, index) => (
          <p
            className={`chat__message ${
              msg.uid === user.uid && "chat__receiver"
            }`}
            key={index}
          >
            <span className="chat__name">{msg.name}</span>
            {msg.message}
            <span className="chat__timestamp">
              {new Date(msg.updatedAt).toString().slice(0, 25)}
            </span>
          </p>
        ))}
      </div>

     {groupName &&  
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
      </div>}
    </div>
  );
};

export default Chat;
