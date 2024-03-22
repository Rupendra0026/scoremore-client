import React, { useState } from "react";
import Login from "../Register/login/Login";
import Signup from "../Register/signup/Signup";
import { FaCode, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Landingpage.css";

const Landingpage = () => {
  const [signup, setSignup] = useState("login");
  return (
    <>
      <div className="landing-page">
        <div className="left-part">
          <div className="heading">
            <h1>Exam Vista</h1>
          </div>
          <div className="icons">
            <ul>
              <li>
                <FaGithub />
              </li>
              <li>
                <FaTwitter />
              </li>
              <li>

                <FaInstagram />
              </li>
              <li>
                <FaCode />
              </li>
            </ul>
          </div>
        </div>
        <div className="right-part">
          <div className="login-form">
            <div className="selection">
              <button onClick={() => setSignup("login")} className={signup=="login"?"login":""}>Login</button>
              <button onClick={() => setSignup("register")} className={signup=="register"?"register":""}>Register</button>
            </div>
            <div className="signup-part">
              {signup == "login" ? <Login /> : <Signup />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landingpage;
