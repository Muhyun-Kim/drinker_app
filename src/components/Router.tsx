import { collection, DocumentData } from "firebase/firestore";
import { ref } from "firebase/storage";
import React, { useState } from "react";
import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { db, storage } from "../firebase";
import Auth from "../Routes/Auth";
import CreatePost from "../Routes/CreatePost";
import Home from "../Routes/Home";
import Profile from "../Routes/Profile";
import Nav from "./Nav";
import { v4 as uuidv4 } from "uuid";

interface Props {
  isLoggedIn: boolean;
  userObj: any;
  refreshUser: any;
}

const AppRouter = ({ isLoggedIn, userObj, refreshUser }: Props) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Nav userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path="/"
              element={
                <Home
                  userObj={userObj}
                />
              }
            />
            <Route
              path="/Profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
          </>
        ) : (
          <Route path="*" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
