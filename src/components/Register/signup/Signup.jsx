import React, { useState } from "react";
import "./Signup.css";
import "../login/Login.css";

const Signup = () => {
  const [category, setCategory] = useState("admin");
  const [user, setUser] = useState({
    name: "",
    gmail: "",
    password: "",
    category: "admin",
    passKey: "",
  });
  const SignupUser = async () => {
    if (user.category == "admin"&& user.gmail!="" && user.name!="" && user.password!="") {
      const request = await fetch("/registeruser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: user,
        }),
      }).then(async (res) => {
        let response = await res.json();
        if (response.status == 200) {
          console.log(response);
          alert(response.msg);
          setUser({
            name: "",
            gmail: "",
            password: "",
            category: "admin",
            passKey: "",
          });
        } else {
          alert(response.msg);
        }
      });
    } else if(user.category == "student" && user.passKey != "" && user.gmail!="" && user.name!="") {
        try{
          const request = await fetch("/RegisterStudent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: user,
            }),
          }).then(async (res) => {
            let response = await res.json();
            if (response.status == 200) {
              console.log(response);
              alert(response.msg);
              setUser({
                name: "",
                gmail: "",
                password: "",
                category: "admin",
                passKey: "",
              });
            } else {
              alert(response.msg);
            }
          });
        }
        catch(err){
          alert("Failed to register(Manual msg)")
        }
    }
    else{
      alert("All fields are required");
    }
  };

  return (
    <>
      <div className="signup">
        <div className="signup-form">
          <div className="signup-heading">
            <h1>register</h1>
          </div>
          <div className="form">
            <input
              type="text"
              placeholder="enter name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="enter gmail"
              value={user.gmail}
              onChange={(e) => setUser({ ...user, gmail: e.target.value })}
            />
            <select
              name=""
              id=""
              onChange={(e) => setUser({ ...user, category: e.target.value })}
            >
              <option value="admin">admin</option>
              <option value="student">student</option>
            </select>
            {user.category == "student" && (
              <input
                type="text"
                value={user.passKey}
                placeholder="enter pass key"
                onChange={(e) => setUser({ ...user, passKey: e.target.value })}
              ></input>
            )}
            <input
              type="password"
              placeholder="enter password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button onClick={SignupUser}>Register</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
