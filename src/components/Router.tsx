import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "../Routes/Auth";
import CreatePost from "../Routes/CreatePost";
import Home from "../Routes/Home";
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
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path="/"
              element={
                <Home userObj={userObj} postCollectionRef={postCollectionRef} />
              }
            />
            <Route
              path="/Profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
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
    </BrowserRouter>
  );
};

export default AppRouter;
