import React from "react";
import "./Navbar/Navbar.css";
import fire from "../assets/fire.png";
import star from "../assets/star.png";
import smiley from "../assets/smiley.png";
import Toggle from "./Movielist/ToggleButton";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Moviemania</h1>
      
      <div className="navbar_links">
        <Toggle />
       <a href="">
          Popular
          <img src={fire} alt="fire emoji" className="navbar_emoji" />
        </a>
        <a href="">
          Top rated
          <img src={smiley} alt="smiley emoji" className="navbar_emoji" />
        </a>
        <a href="">
          Upcoming
          <img src={star} alt="star emoji" className="navbar_emoji" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
