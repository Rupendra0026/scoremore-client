import { useEffect, useState } from "react";
import '../../Admin/Navbar/SideNavbar.css'
import {
  FaHome,
  FaBookOpen,
  FaRegBookmark,
  FaRunning,
  FaUserCircle
} from "react-icons/fa";

const StudentSideNav = ({ toggle, updateToggle, UpdateMain,displayMain }) => {
  const [highLight, setHighLight] = useState("exam");
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
              onClick={() => setHighLight("exam")}
              className={displayMain === "exam" ? "high" : ""}
            >
              <FaBookOpen
                color={displayMain === "exam" ? "white" : "rebeccapurple"}
              />
              <p>Exams available</p>
            </li>
            <li
              onClick={() => setHighLight("scores")}
              className={displayMain === "scores" ? "high" : ""}
            >
              <FaRegBookmark
                color={displayMain === "scores" ? "white" : "rebeccapurple"}
              />
              <p>Scores</p>
            </li>
            <li
              onClick={() => setHighLight("profile")}
              className={displayMain === "profile" ? "high" : ""}
            >
              <FaUserCircle
                color={displayMain === "profile" ? "white" : "rebeccapurple"}
              />
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
                    setHighLight("exam");
                    closeToggle();
                  }}
                  className={displayMain === "exam" ? "high" : ""}
                >
                  <FaBookOpen
                    color={displayMain === "exam" ? "white" : "rebeccapurple"}
                  />
                  <p>Exams Available</p>
                </li>
                <li
                  onClick={() => {
                    setHighLight("scores");
                    closeToggle();
                  }}
                  className={displayMain === "scores" ? "high" : ""}
                >
                  <FaRegBookmark
                    color={displayMain === "scores" ? "white" : "rebeccapurple"}
                  />
                  <p>score</p>
                </li>
                <li
                  onClick={() => {
                    setHighLight("profile");
                    closeToggle();
                  }}
                  className={displayMain === "profile" ? "high" : ""}
                >
                  <FaRunning
                    color={displayMain === "profile" ? "white" : "rebeccapurple"}
                  />
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

export default StudentSideNav;
