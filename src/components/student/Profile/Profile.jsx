import { useEffect } from "react";
import CardHeading from "../../CardsHeading/CardHeading";
import CardContent from "../../CardsContent/CardsContent";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import "./Profile.css";
import { useState } from "react";

const Profile = () => {
  const [data, setData] = useState();
  const fetchProfileData = async () => {
    let req = await fetch("/student/profile", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });
    let res = await req.json();
    if (res.status == 200) {
      console.log(res.data);
      setData(res.data);
    } else {
      alert(res.msg);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);
  return (
    <>
      <div className="profile-card">
        <CardHeading heading={"Profile"} />
        {data && data.admin && data.student && (
          <CardContent>
            <div className="student-profile">
              <div className="intro-head">
                <h2>Admin Data</h2>
              </div>
              <div className="Admin-card">
                <p>Name:{data.admin.name}</p>
                <p>Gamil:{data.admin.gmail}</p>
              </div>
              <div className="intro-head">
                <h2>Key</h2>
              </div>
              <div className="key">
                <FaArrowAltCircleUp color="rebeccapurple" size={"30px"} />
                <h3>{data.student.keys}</h3>
                <FaArrowAltCircleDown color="rebeccapurple" size={"30px"} />
                <p style={{ fontSize: "12px", color: "gray" }}>
                  Key:**Connection between student with admin
                </p>
              </div>
              <div className="intro-head">
                <h2>Student Data</h2>
              </div>
              <div className="student-card">
                <p>Name:{data.student.name}</p>
                <p>Gamil:{data.student.gmail}</p>
              </div>
            </div>
          </CardContent>
        )}
      </div>
    </>
  );
};

export default Profile;
