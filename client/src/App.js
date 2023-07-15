import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import { AppContext } from "./Context/AppContext";
import { useContext, useEffect } from "react";
import Home from "./pages/Home/Home";

function App() {
  const { token, setToken } = useContext(AppContext);
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
  }, []);
  // com
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={token ? <Home /> : <Login />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
