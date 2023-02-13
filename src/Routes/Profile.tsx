import { collection } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { updateProfile } from "firebase/auth";
interface Props {
  userObj: any;
  refreshUser;
}
const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    auth.signOut();
    refreshUser();
  };
  const getMyPosts = async () => {
    collection(db, "post");
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      refreshUser();
    }
  };
  console.log(userObj.photoURL);
  return (
    <>
      <div>profile</div>
      <img src={userObj.photoURL} />
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={newDisplayName} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
