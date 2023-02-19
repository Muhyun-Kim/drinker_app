import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { faCocktail } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = ({ userObj }) => {
  return (
    <nav className="flex justify-center mt-10 mb-4">
      <ul className="flex">
        <li>
          <Link to="/" className="m-3" >
            <FontAwesomeIcon
              icon={faCocktail}
              size="xl"
              className="text-fuchsia-400"
            />
          </Link>
        </li>
        <li>
          <Link to="/Profile">{userObj.displayName}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
