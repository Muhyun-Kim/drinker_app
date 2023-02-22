import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Auth from "../Routes/Auth";
import CreatePost from "../Routes/CreatePost";
import Home from "../Routes/Home";
import AnimatedRouters from "./AnimatedRouters";
import Profile from "../Routes/Profile";
import Nav from "./Nav";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../index.css";

interface Props {
  isLoggedIn: boolean;
  userObj: any;
  refreshUser: any;
  postCollectionRef: any;
}

const AppRouter = ({
  isLoggedIn,
  userObj,
  refreshUser,
  postCollectionRef,
}: Props) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Nav userObj={userObj} />}
      <AnimatedRouters
        isLoggedIn={isLoggedIn}
        userObj={userObj}
        refreshUser={refreshUser}
        postCollectionRef={postCollectionRef}
      />
    </BrowserRouter>
  );
};

export default AppRouter;
