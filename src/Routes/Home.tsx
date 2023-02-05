/**
 * Author : muhyun-kim
 * Modified : 2023/02/05
 * Function : ホーム画面
 */

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";

interface Props {
  userObj: any;
}

const Home = ({ userObj }: Props) => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState<DocumentData[]>([]);

  useEffect(() => {
    //firestroe databaseからdbをリアルタイムで持ってくる機能
    onSnapshot(collection(db, "post"), (snapshot) => {
      const postArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postArr);
    });
  }, []);

  //ポスト内容の送信ボタン機能、ポスト内容をdbに保存し、書いた内容を空にする。
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addDoc(collection(db, "post"), {
      text: post,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setPost("");
  };

  //ポスト内容を記入するための機能
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setPost(value);
  };
  console.log(userObj);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={post}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Post" />
      </form>
      <div>
        {posts.map((post) => (
          <div>
            <h4 key={post.id}>
              {post.createdAt}:{post.text}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
