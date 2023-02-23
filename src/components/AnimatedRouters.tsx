import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "../Routes/Auth";
import CreatePost from "../Routes/CreatePost";
import Home from "../Routes/Home";
import Profile from "../Routes/Profile";
import "../index.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

interface Props {
  isLoggedIn: boolean;
  userObj: any;
  refreshUser: any;
  postCollectionRef: any;
}

function AnimatedRouters({
  isLoggedIn,
  userObj,
  refreshUser,
  postCollectionRef,
}: Props) {
  const location = useLocation();
  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          {isLoggedIn ? (
            <>
              <Route
                path="/"
                element={
                  <Home
                    userObj={userObj}
                    postCollectionRef={postCollectionRef}
                  />
                }
              />
              <Route
                path="/Profile"
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              />
                <Route
                  path="/CreatePost"
                  element={
                    <CreatePost
                      userObj={userObj}
                      postCollectionRef={postCollectionRef}
                    />
                  }
                />
            </>
          ) : (
            <Route path="*" element={<Auth />} />
          )}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default AnimatedRouters;
