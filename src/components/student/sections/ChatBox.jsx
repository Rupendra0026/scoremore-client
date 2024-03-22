
import { useEffect, useState } from 'react';
import { queries, queriesMap } from '../Constants/Query'
import './ChatBox.css'
import { FaCross, FaTimes } from 'react-icons/fa';
const ChatBox = ({displaychat}) => {
    const [answers,setAnswers]=useState("");
    let values=queriesMap;
    const showSolution=(data)=>{
        let answers=values.get(data.id);
        setAnswers(answers.ans)
    }
  return (
    <>

    <div className="chatbox">
        <div className="top">
        <h3>Query resolver</h3>
        <div className="close-icon">
        <p onClick={()=>displaychat()}><FaTimes color='rebeccapurple' size={"20px"}/></p>
    </div>
        </div>
    
        <div className="main-heading">
        <div className="queries">
            <ul>
                {
                    queries.map((data,index)=>{
                        return(
                            <>
                            <li key={index} onClick={()=>showSolution(data)}>{data.que}</li>
                            </>
                        )
                    })
                }
            </ul>
            {
                answers!="" && (
                    <>
                    <div className="solution">
                    <h5>{answers}</h5>
                    </div>
                    </>
                )
            }
        </div>
        </div>
    </div>
    </>
  )
}

export default ChatBox