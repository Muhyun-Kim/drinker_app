/**
 * Author : muhyun-kim
 * Modified : 2023/02/05
 * Function : ホーム画面
 */
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  StorageReference,
  getMetadata,
} from "firebase/storage";
import Post from "./Post";
import { url } from "inspector";
import { async } from "@firebase/util";

interface Props {
  userObj: any;
}

const Home = ({ userObj }: Props) => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [attachment, setAttachment] = useState("");

  const postCollectionRef = collection(db, `post`);
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

  //ポスト内容の送信ボタン機能、ポスト内容をdbに保存し、書いた内容を空にする。
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
    uploadString(attachmentRef, attachment, "data_url").then(() =>
      getDownloadURL(attachmentRef).then((url) => {
        const postObj = {
          text: post,
          createdAt: Date.now(),
          creatorId: userObj.uid,
          img: url,
        };
        addDoc(postCollectionRef, {
            postObj,
          });
        setPost("");
        setAttachment(null);
      })
    );
  };

  //ポスト内容を記入するための機能
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setPost(value);
  };

  //写真(ファイル)選択機能
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
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
