/**
 * Author : muhyun-kim
 * Modified : 2023/02/13
 * Function : ポスト作成
 */
import { addDoc } from "firebase/firestore";
import { getDownloadURL, uploadString } from "firebase/storage";
import React, { useState } from "react";

interface Props {
  userObj;
  attachmentRef;
  postCollectionRef;
}

const PostFactory = ({ userObj, attachmentRef, postCollectionRef }) => {
  const [post, setPost] = useState("");
  const [attachment, setAttachment] = useState("");
  //ポスト内容の送信ボタン機能、ポスト内容をdbに保存し、書いた内容を空にする。
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let attachmentPath;
    e.preventDefault();
    attachmentPath = uploadString(attachmentRef, attachment, "data_url").then(
      () => getDownloadURL(attachmentRef)
    );
    attachmentPath.then((url) => {
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
    });
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
    <>
      <form className="flex flex-col items-center" onSubmit={onSubmit}>
        <div className="flex w-4/5 mb-2">
          <input type="file" accept="image/*" onChange={onFileChange} />
          <input type="submit" value="投稿" />
        </div>
        <input
          className="w-4/5 h-20 rounded-lg pl-1 text-black mb-8"
          value={post}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
        />
        {attachment && (
          <div>
            <img src={attachment} width="50px" />
            <button onClick={onClearAttachment}>clear photo</button>
          </div>
        )}
      </form>
    </>
  );
};

export default PostFactory;
