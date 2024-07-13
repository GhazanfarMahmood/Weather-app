import React from "react";
import "./Nav.scss";

import { BsFillCloudsFill } from "react-icons/bs";
import { BiSolidHome } from "react-icons/bi";
import { AiFillCloud } from 'react-icons/ai'

const Nav = () => {
  return (
    <>
      <div className="navbar">
        <div className="nav-left">
          <BsFillCloudsFill />
          <h1>Weather App</h1>
        </div>
        <div className="nav-right">
          <div>
            <BiSolidHome />
            <h3>Home</h3>
          </div>
          <div>
            <AiFillCloud/>
            <h3>Weather</h3> 
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
