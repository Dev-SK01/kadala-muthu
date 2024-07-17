import React from "react";
import Login from "./components/login/Login";
import { useData } from "./components/contextAPI/DataProvider";
import Chat from "./components/chat/Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";
const App = () => {
  const [{ user }] = useData();

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <BrowserRouter>
            <SideBar />
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </>
  );
};

export default App;
