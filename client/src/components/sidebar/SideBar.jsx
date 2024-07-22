import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import { useData } from "../contextAPI/DataProvider";
import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import SideBarChat from "../sidebar-chat/SideBarChat";
import axios from "axios";

const SideBar = () => {
  const [{ user }] = useData();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:2500/all/groups").then((res) => {
      setGroups(res.data);
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search Chat or Start New Chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SideBarChat addNewChat />
        {groups.map((group) => (
          <SideBarChat key={group._id} id={group._id} name={group.name} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
