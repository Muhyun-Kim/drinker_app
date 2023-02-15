/**
 * Author : muhyun-kim
 * Modified : 2023/02/13
 * Function : 認証機能
 */

import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCocktail } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

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
    <div className="flex flex-col justify-center items-center min-h-screen">
      <FontAwesomeIcon
        icon={faCocktail}
        size="3x"
        style={{ color: "pink" }}
        className="mb-8"
      />
      <AuthForm />
      <div>
        <button name="googleAuth" onClick={onSocialClick}>
          Google<FontAwesomeIcon
        icon={faGoogle}
        style={{ color: "pink" }}
        className="ml-2"
      />
        </button>
      </div>
    </div>
  );
};

export default Auth;
