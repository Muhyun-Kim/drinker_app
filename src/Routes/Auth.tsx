/**
 * Author : muhyun-kim
 * Modified : 2023/02/04
 * Function : 認証機能
 */

import React from "react";
import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
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
        console.log(data);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch ({ code, message }) {
      setError(String(message));
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.currentTarget as HTMLButtonElement).name;
    let provider;
    if (name === "googleAuth") {
      provider = new GoogleAuthProvider();
    } // add social login if I want
    if (provider) {
      provider.addScope("profile");
      provider.addScope("email");
      const result = await signInWithPopup(auth, provider);
    }
  };
  return (
    <div>
      {error}
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log in"} />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Creact Account"}
      </span>
      <div>
        <button name="googleAuth" onClick={onSocialClick}>
          Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
