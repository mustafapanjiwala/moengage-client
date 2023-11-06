import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SearchPage from "./components/SearchPage/SearchPage.js";
import BreweryDetail from "./components/BreweryDetail/BreweryDetail.js";
import Login from "./components/Login/Login.js";
import Signup from "./components/Signup/Signup.js";
import { UserProvider } from "./user_context.js";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/home" element={<SearchPage />} />
          <Route path="/brewery/:id" element={<BreweryDetail />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
