import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCocktail } from "@fortawesome/free-solid-svg-icons";
import "../index.css";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <FontAwesomeIcon
        icon={faCocktail}
        className="fa-2xl mb-4 text-fuchsia-400 animate-bounce"
      />
      <span className="text-slate-50 text-2xl animate-bounce">Loaing</span>
    </div>
  );
};

export default Loading;
