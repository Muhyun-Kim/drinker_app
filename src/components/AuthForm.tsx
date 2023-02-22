/**
 * Author : muhyun-kim
 * Modified : 2023/02/13
 * Function : 認証機能フォーム
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import "../index.css";


const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [newAccount, setNewAccount] = useState(true);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch ({ code, message }) {
      setError(`パスワードが間違っているか存在しないアカウントです。`);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <span>{error}</span>
      <form className="flex flex-col text-center" onSubmit={onSubmit}>
        <input
          className="authInput"
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          className="authInput"
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          className="w-full p-2 rounded-full bg-pink-400"
          type="submit"
          value={newAccount ? "Create Account" : "Log in"}
        />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Creact Account"}
      </span>
    </>
  );
};

export default AuthForm;
