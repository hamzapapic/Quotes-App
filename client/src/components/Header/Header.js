import React, { useState } from "react";
import "./Header.css";
export default function Header() {
  const [tokens, setTokens] = useState(localStorage.getItem("token"));
  return (
    <div className="header">
      <h2 className="maintext">Quotes App</h2>
      <div className="logoutdiv">
        <button
          className={tokens ? "logout" : "nobtn"}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload(true);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
