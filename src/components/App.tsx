import React from "react";

import { Router } from "@reach/router";

import "./App.scss";

import Podcast from "./Podcast";

const App: React.FC = () => {
  return (
    <div className="podcast__wrapper">
      <Router>
        <Podcast path=":name/" />
      </Router>
    </div>
  );
};

export default App;
