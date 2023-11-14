import React from "react";
import splitterLogo from "../assets/images/logo.svg";


function Header() {
  return (
    <header className="header fade-in-down">
      <img src={splitterLogo} alt="splitter-logo" />
    </header>
  );
}

export default Header;
