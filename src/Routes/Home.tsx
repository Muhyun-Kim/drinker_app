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
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import Post from "./Post";
import { url } from "inspector";

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
    let attachmentURL = "";
    const attachmentRef = ref(storage, `${userObj.uid}/${Date.now()}`);
    await uploadString(attachmentRef, attachment, "data_url");
    attachmentURL = await getDownloadURL(attachmentRef);
    const postObj = {
      text: post,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentURL,
    };
    await addDoc(collection(db, "post"), {
      postObj,
    });
    console.log(attachmentURL);
    setPost("");
    setAttachment(null);
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
      const result = (finishedEvent.currentTarget as any).result;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
  posts.map((post)=>{console.log(post.postObj.creatorId)})
  console.log(userObj.uid)
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
            isOwner={post.postObj.postObj === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
