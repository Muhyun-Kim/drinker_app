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
import AuthForm from "../components/AuthForm";

const Auth = () => {
  

  
  const onSocialClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.currentTarget as HTMLButtonElement).name;
    let provider;
    if (name === "googleAuth") {
      provider = new GoogleAuthProvider();
    } // add social login if I want
    if (provider) {
      provider.addScope("profile");
      provider.addScope("email");
      await signInWithPopup(auth, provider);
    }
  };
  return (
    <div>
      <AuthForm />

      <div>
        <button name="googleAuth" onClick={onSocialClick}>
          Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
