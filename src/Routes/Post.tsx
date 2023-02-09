import React from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { async } from "@firebase/util";
import { getStorage, ref, deleteObject } from "firebase/storage";

interface Props {
  postObj;
  isOwner: boolean;
  attachmentRef;
}

const Post = ({ postObj, isOwner, attachmentRef }: Props) => {
  const [editing, setEditing] = useState(false);
  const [newPost, setNewPost] = useState(postObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure delete?");
    if (ok) {
      console.log(postObj.id);
      await deleteDoc(doc(db, "post", `${postObj.id}`));
      await deleteObject(attachmentRef).then(() => {});
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(postObj, newPost);
    await updateDoc(doc(db, "post", `${postObj.id}`), {
      text: newPost,
    });
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
          {postObj.attachmentURL && (
            <img src={postObj.attachmentURL} width="50px" />
          )}
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
