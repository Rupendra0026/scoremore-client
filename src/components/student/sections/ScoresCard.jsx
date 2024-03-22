import React, {useState,useEffect} from 'react'
import CardHeading from '../../CardsHeading/CardHeading'
import CardsContent from '../../CardsContent/CardsContent'
import './ScoresCard.css'
import {FaArrowAltCircleRight} from "react-icons/fa"

const ScoresCard = () => {
  const [studentScore,setStudentScore]=useState([]);
  const studentScoreFetch=async()=>{
    let req=await fetch('/student/scores',{
      method:"GET",
      headers:{
        "Content-Type":"Application/json"
      }
    }) ;
    let res=await req.json();
    if(res.status==200){
      setStudentScore(res.data);
      console.log(res.data);
    }
    else{
      alert(res.msg);
    }
  }
  useEffect(()=>{
    studentScoreFetch()
  },[])
  return (
    <>
    <div className="score-card">
    <CardHeading heading={"Scores"}/>
    {
      studentScore.length >0 ? (
        <>
        <CardsContent>
        <div className="score-item">
          <h4>Test Name</h4>
          <h4>Score</h4>
        </div>
      {
        studentScore.map((data,inde)=>{
          return(
            <React.Fragment>
                <div className="score">
                  <div className="score-head">
                  <FaArrowAltCircleRight color='rebeccapurple'/>
                  <h4> {data.testName}</h4>
                  </div>
                <h4>{data.score}</h4>
                </div>
            </React.Fragment>
          )
        })
      }
    </CardsContent>
        </>
      ):
      (
        <h4 style={{marginTop:"20px"}}>Scores Not Available</h4>
      )
    }
    </div>
    </>
  )
}

export default ScoresCard