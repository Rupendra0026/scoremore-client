import { useEffect, useState } from "react";
import "./SideNavbar.css";
import {
  FaHome,
  FaBookOpen,
  FaRegBookmark,
  FaCalculator,
  FaUser,
} from "react-icons/fa";

const SideNavbar = ({ toggle, updateToggle, UpdateMain,displayMain }) => {
  const [highLight, setHighLight] = useState("s-exam");
  const closeToggle = () => {
    setTimeout(() => {
      updateToggle();
    }, 500);
  };
  useEffect(() => {
    UpdateMain(highLight);
  }, [highLight]);
  return (
    <>
      <div className="sideNav-options">
        <div className="options">
          <ul>
            <li
              onClick={() => setHighLight("s-exam")}
              className={displayMain === "s-exam" ? "high" : ""}
            >
              <FaBookOpen
                color={displayMain === "s-exam" ? "white" : "rebeccapurple"}
              />
              <p>Schedule Exam</p>
            </li>
            <li
              onClick={() => setHighLight("exam")}
              className={displayMain === "exam" ? "high" : ""}
            >
              <FaRegBookmark
                color={displayMain === "exam" ? "white" : "rebeccapurple"}
              />
              <p>Exams</p>
            </li>
            <li
              onClick={() => setHighLight("score")}
              className={displayMain === "score" ? "high" : ""}
            >
              <FaCalculator
                color={displayMain === "score" ? "white" : "rebeccapurple"}
              />
              <p>Scores</p>
            </li>
            <li onClick={() => setHighLight("profile")}
              className={displayMain === "profile" ? "high" : ""}>
              <FaUser color={displayMain === "profile" ? "white" : "rebeccapurple"}/>
              <p>Profile</p>
            </li>
          </ul>
        </div>
      </div>
      {toggle && (
        <>
          <div className="toggle-options">
            <div className="options">
              <ul>
                <li
                  onClick={() => {
                    setHighLight("home");
                    closeToggle();
                  }}
                  className={displayMain === "home" ? "high" : ""}
                >
                  <FaHome
                    color={displayMain === "home" ? "white" : "rebeccapurple"}
                  />
                  <p>Home</p>
                </li>
                <li
                  onClick={() => {
                    setHighLight("s-exam");
                    closeToggle();
                  }}
                  className={displayMain === "s-exam" ? "high" : ""}
                >
                  <FaBookOpen
                    color={displayMain === "s-exam" ? "white" : "rebeccapurple"}
                  />
                  <p>Schedule Exam</p>
                </li>
                <li
                  onClick={() => {
                    setHighLight("exam");
                    closeToggle();
                  }}
                  className={displayMain === "exam" ? "high" : ""}
                >
                  <FaRegBookmark
                    color={displayMain === "exam" ? "white" : "rebeccapurple"}
                  />
                  <p>Exams</p>
                </li>
                <li
                  onClick={() => {
                    setHighLight("score");
                    closeToggle();
                  }}
                  className={displayMain === "score" ? "high" : ""}
                >
                  <FaCalculator
                    color={displayMain === "score" ? "white" : "rebeccapurple"}
                  />
                  <p>Scores</p>
                </li>
                <li onClick={() => {setHighLight("adminprofile");closeToggle();}}
              className={displayMain === "adminprofile" ? "high" : ""}>
              <FaUser color={displayMain === "adminprofile" ? "white" : "rebeccapurple"}/>
              <p>Profile</p>
            </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SideNavbar;
