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
  return (
    <div className="flex justify-center mt-12">
      <img src={userObj.photoURL} className="" />
      <div className="flex flex-col justify-between items-center">
        <form onSubmit={onSubmit} className="w-4/5 flex flex-col">
          <input
            className=" text-center text-black"
            type="text"
            onChange={onChange}
            value={newDisplayName}
          />
          <input type="submit" value="Update" />
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;
