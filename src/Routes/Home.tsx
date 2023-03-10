/**
 * Author : muhyun-kim
 * Modified : 2023/02/05
 * Function : ホーム画面
 */
import React, { useEffect, useState } from "react";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import Post from "./Post";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { db, storage } from "../firebase";
import { ref } from "firebase/storage";
import CreatePost from "./CreatePost";

interface Props {
  userObj;
  postCollectionRef;
}

const Home = ({ userObj, postCollectionRef }: Props) => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const location = useLocation()
  console.log(location)

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
