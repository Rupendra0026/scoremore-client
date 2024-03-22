import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";
import SideNavbar from "./SideNavbar";
import HomeCard from "../sections/HomeCard";
import SExamCard from "../sections/SExamCard";
import ExamCard from "../sections/ExamCard";
import ScoreCard from "../sections/ScoreCard";
import Profile from "../profile/Profile";
import AppNavbar from "../../AppNavbar/AppNavbar";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [toggle, setToggle] = useState(false);
  const [displayMain, setDisplayMain] = useState("home");
  const renderContent = () => {
    switch (displayMain) {
      case 's-exam':
        return (<SExamCard/>);
        case 'exam':
          return(<ExamCard/>);
        case 'score':
          return(<ScoreCard/>);
        case 'profile':
          return (<Profile/>);
      default:
        return <h1>Default content</h1>;
    }
  };
  const updateToggle = () => {
    setToggle(!toggle);
  };
  const UpdateMain = (main) => {
    setDisplayMain(main);
  };
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data && data.token) {
      if(data.category!="admin"){
        navigate('/')
      }
      setUser(data);
    } else {
      navigate("/");
    }
  },[]);
  return (
    <>
            <AppNavbar 
      UpdateMain={UpdateMain} 
      updateToggle={updateToggle}
      toggle={toggle}/>
      <div className="side-main-nav">
        <div className="sidenav">
          <SideNavbar
            toggle={toggle}
            updateToggle={updateToggle}
            UpdateMain={UpdateMain}
            displayMain={displayMain}
          />
        </div>
        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Navbar;
