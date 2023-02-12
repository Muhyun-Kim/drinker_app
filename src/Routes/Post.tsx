import React from "react";
import { doc, deleteDoc, updateDoc, deleteField } from "firebase/firestore";
import { db, storage, storageRef } from "../firebase";
import { useState } from "react";
import { async } from "@firebase/util";
import { getStorage, ref, deleteObject } from "firebase/storage";

interface Props {
  postObj;
  isOwner: boolean;
  postCollectionRef;
  attachmentRef;
  post;
}

const Post = ({
  postObj,
  isOwner,
  postCollectionRef,
  attachmentRef,
  post,
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [newPost, setNewPost] = useState(postObj.text);
  //ポスト削除機能
  const onDeleteClick = async () => {
    const desertRef = ref(storage, postObj.img);
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteObject(desertRef);
      await deleteDoc(doc(postCollectionRef, post));
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(postObj, newPost);
    await deleteDoc;
    setEditing(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewPost(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="edit your post"
              value={newPost}
              required
              onChange={onChange}
            />
            <input type="submit" value="update post" />
          </form>
          <button onClick={toggleEditing}>cancle</button>
        </>
      ) : (
        <>
          {postObj.img && <img src={postObj.img} width="50px" />}
          {postObj.text && (
            <h4>
              {postObj.createdAt}:{postObj.text}
            </h4>
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>delete</button>
              <button onClick={toggleEditing}>edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
