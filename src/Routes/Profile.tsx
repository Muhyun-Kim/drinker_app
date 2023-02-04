import React from "react";
import { auth } from "../firebase";

const Profile = () => {
  const onLogOutClick = () => {
    auth.signOut();
  };
  return (
    <>
      <span>profile</span>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
