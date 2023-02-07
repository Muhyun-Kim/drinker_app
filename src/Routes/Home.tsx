/**
 * Author : muhyun-kim
 * Modified : 2023/02/05
 * Function : ホーム画面
 */

import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import Post from "./Post";

interface Props {
  userObj: any;
}

const Home = ({ userObj }: Props) => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [attachment, setAttachment] = useState();
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
    const strageRef = ref(storage);
    // await addDoc(collection(db, "post"), {
    //   text: post,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setPost("");
  };

  //ポスト内容を記入するための機能
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setPost(value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const result = (finishedEvent.currentTarget as any).result;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Post" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" />
            <button onClick={onClearAttachment}>clear photo</button>
          </div>
        )}
      </form>
      <div>
        {posts.map((post) => (
          <Post
            key={post.id}
            postObj={post}
            isOwner={post.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
