import React, { useEffect, useState } from "react";
import "./chat.css";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useData } from "../contextAPI/DataProvider";
import { useParams } from "react-router-dom";
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
