import React from "react";
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

const SideBar = () => {
  const [{ user }] = useData();
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
        <SideBarChat />
        <SideBarChat />
        <SideBarChat />
      </div>
    </div>
  );
};

export default SideBar;
