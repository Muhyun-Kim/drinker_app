import React from "react";
import { doc, deleteDoc, updateDoc, deleteField } from "firebase/firestore";
import { storage } from "../firebase";
import { useState } from "react";
import { ref, deleteObject } from "firebase/storage";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons";

interface Props {
  postObj;
  isOwner: boolean;
  postCollectionRef;
  post;
}

const Post = ({ postObj, isOwner, postCollectionRef, post }: Props) => {
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
    console.log(postObj);
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
    <div className="flex flex-col w-3/5">
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
            className="text-black"
              type="text"
              placeholder="edit your post"
              value={newPost}
              required
              onChange={onChange}
            />
            <input type="submit" value="update post" />
          </form>
          <button onClick={toggleEditing}>取消</button>
        </>
      ) : (
        <>
          {/** 投稿内容の表示画面 */}
          {postObj.text && <h4 className="pl-1">{postObj.text}</h4>}
          {postObj.img && <img className="mb-2" src={postObj.img} />}
          {isOwner && (
            <>
              <div className="flex justify-end items-center pr-1">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="mr-6 text-slate-50"
                  onClick={onDeleteClick}
                />
                <FontAwesomeIcon icon={faPencil} onClick={toggleEditing} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Post;