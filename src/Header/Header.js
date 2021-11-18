import React from "react";
import "./Header.css";
import logo from "../assets/cloud_js_logo.svg";

const Header = () => {
  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="TileDB Cloud JS logo" />
    </div>
  );
};

export default Header;
