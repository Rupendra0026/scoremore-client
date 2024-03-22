import { useNavigate } from 'react-router-dom'
import './Feedback.css'
import { useState } from 'react';
const Feedback = ({testName}) => {
  const navigate=useNavigate();
  const [feedback,setFeedBack]=useState("");

  const skip=()=>{
    navigate('/student/home');
  }
  const sendFeedBack=async()=>{
    if(feedback!=""){
      try{
        let req=await fetch('/student/feedback',{
          method:"POST",
          headers:{
            "Content-Type":"Application/json"
          },
          body:JSON.stringify({
            data:{
              feedback:feedback,
              testName:testName,
            }
          })
        })
        let res=await req.json();
        if(res.status==200){
          alert(res.msg);
          navigate('/student/home');
        }
        else{
          alert(res.msg)
        }
      }
      catch(err){
        alert("Faild to send feedback");
        navigate('/student/home');
      }
    }

    else{
      alert("feedback cant be empty");
    }
  }

  return (
    <>
    <div className="feedback-box">
        <div className="form-feed">
            <h4>Thanks!! Your response has been saved</h4>
            <input placeholder='Feedback'onChange={(e)=>setFeedBack(e.target.value)}/>
            <div className="btns">
                <button onClick={skip}>Skip</button>
                <button onClick={sendFeedBack}>submit</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Feedback