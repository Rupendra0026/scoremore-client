import {useState,useEffect} from 'react'
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";


const AppNavbar = ({UpdateMain,updateToggle,toggle}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
      
  const logoutUser = async() => {
    if (localStorage.getItem("data")) {
      let res=await fetch('/logout',{
        method:"GET",
        headers:{
          "Content-Type":"Application/json"
        }
      });
      const response=await res.json()
      if(response.status==200){
        alert(response.msg)
          localStorage.clear();
      navigate("/");
      }
      else{
        alert(response.msg)
      }
      
    }
  };
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data && data.token) {
      setUser(data);
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
     <div className="navbar">
        <div className="title">
          <p>Exam Vista</p>
        </div>
        <div className="actions">
          <NavLink onClick={()=>UpdateMain("profile")} style={{textTransform:"uppercase"}}>{user && user.name.slice(0, 1)}</NavLink>
          <button onClick={logoutUser}>Logout</button>
          <div className="sideToggle" onClick={() => updateToggle()}>
            <p>
              {toggle ? <FaTimes color="white" /> : <FaBars color="white" />}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppNavbar