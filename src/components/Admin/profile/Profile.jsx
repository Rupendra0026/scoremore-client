import React, { useEffect, useState } from "react";
import "./Profile.css";
import { FaMinus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const [key, setKey] = useState("");
  const [finalData, setFinalData] = useState({
    name: "",
    gmail: "",
    keys: "",
  });

  const updateProfile =async() => {
    if(finalData.keys==""){
        if(key!=""){
          let req=await fetch(`/updatekey/${key}`,{
            method:"GET",
            "Content-Type":"Application/json"
          });
          let res=await req.json()
          if(res.status==200){
            console.log(res.data)
            localStorage.setItem('data',JSON.stringify(res.data))
            setFinalData({
              name:res.data.name,
              gmail:res.data.gmail,
              keys:res.data.keys
            })
            setKey("")
            alert(res.msg)
          }
          else{
            alert(res.msg)
          }
        }
        else{
            alert("key cant be empty")
        }
    }
    else{
        alert("only one key can there")
    }
  };
  const deleteKey = async() => {
    if(window.confirm("tests and students linked with this key will also be deleted")){
      let req=await fetch('/deletekey',({
        method:"GET",
        headers:{
          "Content-Type":"Application/json"
        }
      }));
      const res=await req.json();
      if(res.status==200){
        console.log(res.data)
        localStorage.setItem('data',JSON.stringify(res.data))
        setFinalData({
          name:res.data.name,
          gmail:res.data.gmail,
          keys:res.data.keys
        })
        alert(res.msg)
      }
      else{
        alert(res.msg)
      }
    }
  };
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data.token) {
      setFinalData({
        ...finalData,
        name: data.name,
        gmail: data.gmail,
        keys: data.keys,
      });
    }
  },[]);
  return (
    <>
      {finalData.gmail && (
        <div className="profile">
          <div className="profile-form">
            <div className="profile-heading">
              <h1>Profile</h1>
            </div>
            <div className="form">
              <input
                type="text"
                value={finalData && finalData.gmail}
                readOnly
              />
              <input
                type="text"
                value={finalData && finalData.name}
                onChange={(e) =>
                  setFinalData({ ...finalData, name: e.target.value })
                }
              />

              {finalData.keys == "" ? (
                <>
                  <input
                    type="text"
                    placeholder='enter new key ex:"ahbsa1$"'
                    value={key}
                    maxLength={8}
                    onChange={(e) => {
                      setKey(e.target.value);
                    }}
                  ></input>
                  <p>**No key is available, Add key</p>
                </>
              ) : (
                <>
                  <div className="keyslist">
                    {finalData.keys != "" && (
                      <>
                        <h4 style={{ alignItems: "center" }}> key</h4>
                        <p id="note" style={{textAlign:"center"}}>
                          **If key is deleted all the exams created and students
                          registered with key this key,will be deleted
                        </p>
                        <div className="keyitem">
                          <p>{finalData.keys}</p>
                          <NavLink onClick={deleteKey}>
                            <FaTrash color="rebeccapurple" />
                          </NavLink>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              {(key!= "" && finalData.keys!="")||(key!= "" && finalData.keys=="") &&(
                      <>
                        <h4 style={{ alignItems: "center" }}> key</h4>
                        <p id="note" style={{textAlign:"center"}}>
                          **created key will be connected with tests and
                          registered students
                        </p>
                        <div className="keyitem">
                          <p>{key}</p>
                          <NavLink onClick={() => setKey("")}>
                            <FaMinus color="rebeccapurple" />
                          </NavLink>
                        </div>
                      </>
                    )}
              <button onClick={updateProfile}>update</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
