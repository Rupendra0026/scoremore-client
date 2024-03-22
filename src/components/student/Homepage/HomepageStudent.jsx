import React, { useState } from 'react'
import './Homepage.css'
import StudentNav from '../Navbar/StudentNav'
import { FaFacebookMessenger } from 'react-icons/fa'
import ChatBox from '../sections/ChatBox'

const HomepageStudent = () => {
  const [disChatbox,setDisChatbox]=useState(false);
  const displaychat=()=>{
    setDisChatbox(!disChatbox);
  }
  return (
    <>
    <StudentNav/>
    {
      !disChatbox && (
        <>
        <div className="chatbox-icon" onClick={displaychat}>
      <FaFacebookMessenger color='rebeccapurple' size={"30px"}/>
    </div>
        </>
      )
    }
    {
      disChatbox && (
        <>
        <div className="main-chatbox">
          <ChatBox displaychat={displaychat}/>
      </div>
        </>
      )
    }
    </>
  )
}

export default HomepageStudent