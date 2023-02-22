/**
 * Author : muhyun-kim
 * Modified : 2023/02/13
 * Function : ポスト作成
 */

import { addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import { faImage, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { Transition, CSSTransition } from 'react-transition-group';

interface Props {
  userObj: object;
  postCollectionRef: any;
}

const CreatePost = ({ userObj, postCollectionRef }) => {
  const [post, setPost] = useState("");
  const [attachment, setAttachment] = useState("");
  const navigate = useNavigate();
  const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);


  //ポスト内容の送信ボタン機能、ポスト内容をdbに保存し、書いた内容を空にする。
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let attachmentPath: Promise<any>;
    e.preventDefault();
    if (attachment != "") {
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
        navigate("/");
      });
    } else {
      alert("写真を選択してください");
    }
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
  const onClearAttachment = () => {
    setAttachment(null);
  };
  const imgIcon = <FontAwesomeIcon icon={faImage} />;
  return (
    <>
      <form className="flex flex-col items-center" onSubmit={onSubmit}>
        <div className="flex w-4/5 mb-2 px-4 justify-between">
          <label>
            {imgIcon}
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
          </label>
          <input type="submit" value="投稿" />
        </div>
        <input
          className="w-4/5 h-20 rounded-lg pl-1 text-black mb-8"
          value={post}
          onChange={onChange}
          type="text"
          placeholder="テキスト入力"
          maxLength={120}
        />
        {attachment && (
          <div className="flex flex-col items-center w-4/6">
            <img src={attachment} className="mb-4" />
            <button onClick={onClearAttachment} className="self-end">
              <FontAwesomeIcon icon={faBan} />
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default CreatePost;
