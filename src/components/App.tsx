import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { auth } from "../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser ? true : false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = auth.currentUser;
    console.log(user);
  };
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default App;
