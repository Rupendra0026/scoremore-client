import React, { useEffect, useState } from "react";
import CardHeading from "../../CardsHeading/CardHeading";
import CardContent from "../../CardsContent/CardsContent";
import "./ExamCard.css";
import { FaDownload, FaEye, FaTrash } from "react-icons/fa";
import { downloadCSV } from "../../CSV_download/CSV_Function";

const ExamCard = ({score=false,heading="Created Exams"}) => {
  const [examsList, setExamsList] = useState([]);

  const deleteExam=async(data)=>{
    let req=await fetch(`/delete/test/${data._id}`,{
      method:"GET",
      headers:{
        "Content-Type":"Application/json"
      }
    });
    const res=await req.json();
    if(res.status==200){
      setExamsList(res.data);
      alert(res.msg);
    }
    else{
      alert(res.msg);
    }
  }
  const getScores=async(data)=>{
    
    let req=await fetch(`/student/scores/${data._id}`,{
      method:"GET",
      headers:{
        "Content-Type":"Application/json"
      }
    });
    let res=await req.json();
    if(res.status==200){
      if(res.data.length>0){
        downloadCSV(res.data);
      }
      else{
        alert("No one took the test");
      }
    }
  }
  const fetchTests = async () => {
    let req = await fetch("/admincreatedtests", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });
    const res = await req.json();
    if (res.status == 200) {
      setExamsList(res.data);
    }
  };
  useEffect(() => {
    fetchTests();
  }, []);
  return (
    <>
      <div className="exams-available">
        <CardHeading heading={heading} />
        {examsList.length > 0 ? (
          <>
            <CardContent>
              <div className="lists">
                {
                  examsList.map((data,index)=>{
                    return(
                      <React.Fragment key={index}>
                       <div className="test-item">
                       <h4>{data.testName}</h4>
                       {
                        score ? 
                        <p style={{cursor:"pointer"}} onClick={()=>getScores(data)}><FaDownload color="rebeccapurple"/></p>
                        :
                        <p style={{cursor:"pointer"}} onClick={()=>deleteExam(data)}><FaTrash color="rebeccapurple"/></p>
                       }
                       </div>
                      </React.Fragment>
                    )
                  })
                }
              </div>
            </CardContent>
          </>
        ) : (
          <h4 style={{margin:"10px"}}>No tests created</h4>
        )}
      </div>
    </>
  );
};

export default ExamCard;
