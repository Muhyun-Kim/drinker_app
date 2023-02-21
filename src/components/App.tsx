import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { auth, db } from "../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import Loading from "./Loading";
import "../index.css";
import { collection } from "firebase/firestore";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser ? true : false);
  const [userObj, setUserObj] = useState(null);
  const postCollectionRef = collection(db, `post`);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        console.log(userObj);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({ ...user });
  };
  return (
    <>
        {init ? (
          <AppRouter
            isLoggedIn={isLoggedIn}
            userObj={userObj}
            refreshUser={refreshUser}
            postCollectionRef={postCollectionRef}
          />
        ) : (
          <Loading />
        )}
    </>
  );
}

export default App;