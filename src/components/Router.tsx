import { render } from "@testing-library/react";
import React, { Component } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../Routes/Auth";
import Home from "../Routes/Home";

interface Props {
  isLoggedIn: boolean;
}

class AppRouter extends Component<Props> {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Router>
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Auth />} />
          )}
        </Routes>
      </Router>
    );
  }
}

export default AppRouter;
