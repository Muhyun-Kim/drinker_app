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
  };
  const getMyPosts = async () => {
    const posts = collection(db, "post");
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateProfile(auth.currentUser, {
      displayName: newDisplayName,
    })
    refreshUser();
  };
  return (
    <>
      <div>profile</div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={newDisplayName} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
