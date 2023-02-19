/**
 * Author : muhyun-kim
 * Modified : 2023/02/05
 * Function : ホーム画面
 */
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { ref } from "firebase/storage";
import Post from "./Post";
import PostFactory from "./CreatePost";
import { BrowserRouter, Link, Router, Route, Routes } from "react-router-dom";
import CreatePost from "./CreatePost";
import path from "path";

interface Props {
  userObj;
  postCollectionRef;
  attachmentRef;
}

const Home = ({ userObj, postCollectionRef, attachmentRef }: Props) => {
  const [posts, setPosts] = useState<DocumentData[]>([]);

  useEffect(() => {
    //firestroe databaseからdbをリアルタイムで持ってくる機能
    onSnapshot(postCollectionRef, (snapshot) => {
      const postArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postArr);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center">
        <Link
          to="/CreatePost"
          className="w-4/5 h-20 rounded-lg bg-white pl-1 text-neutral-400 mb-8"
        >
          テキスト入力
        </Link>
        {posts.map((post) => (
          <Post
            key={post.id}
            postObj={post.postObj}
            isOwner={post.postObj.creatorId === userObj.uid}
            postCollectionRef={postCollectionRef}
            post={post.id}
          />
        ))}
      </div>
        
    </div>
  );
};

export default Home;
