import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import StudentSideNav from "./StudentSideNav";
import ExamsCard from "../sections/ExamsCard";
import AppNavbar from "../../AppNavbar/AppNavbar";
import ScoresCard from "../sections/ScoresCard";
import Profile from "../Profile/Profile";

const StudentNav = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [toggle, setToggle] = useState(false);
  const [displayMain, setDisplayMain] = useState("home");

  const renderContent = () => {
    switch (displayMain) {
      case "exam":
        return <ExamsCard />;
      case "scores":
      return(<ScoresCard/>);
      case "profile":
        return (<Profile/>);
      default:
        return <h1>Default content</h1>;
    }
  };

  const UpdateMain = (main) => {
    setDisplayMain(main);
  };

  const updateToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data && data.token) {
      if (data.category != "student") {
        navigate("/");
      }
      setUser(data);
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <AppNavbar
        UpdateMain={UpdateMain}
        updateToggle={updateToggle}
        toggle={toggle}
      />
      <div className="side-main-nav">
        <div className="sidenav">
          <StudentSideNav
            toggle={toggle}
            updateToggle={updateToggle}
            UpdateMain={UpdateMain}
            displayMain={displayMain}
          />
        </div>
        <div className="main-content">{renderContent()}</div>
      </div>
    </>
  );
};

export default StudentNav;
