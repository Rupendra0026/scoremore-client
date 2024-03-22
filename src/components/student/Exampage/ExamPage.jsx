import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ExamPage.css";
import { FaTrash } from "react-icons/fa";
import Feedback from "../sections/Feedback";

const ExamPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState();
  const [notice, setNotice] = useState(true);
  const [testData, setTestData] = useState();
  const [questions, setQuestions] = useState();
  const [i, setI] = useState(0);
  const [feedVis, setFeedVis] = useState(false);
  const [submitCount,setSubmitCout]=useState(0);
  const [answers, setAnswers] = useState(
    Array(questions && questions.length).fill(null)
  );
  const [timer, setTimer] = useState(0);
  const [time, setTime] = useState({
    min: 0,
    sec: 0,
  });
  const startTest = async () => {
    // setNotice(!notice)
    try {
      let req = await fetch(`/student/takeTest/${params.testid}`, {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
        },
      });
      const res = await req.json();
      if (res.status == 202) {
        alert(res.msg);
        navigate("/student/home");
      } else if (res.status == 200) {
        // console.log(res.data)

        //to make the test full screen
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
        setTestData(res.data);
        setQuestions(res.data.testQuestions);
        console.log(res.data);
        setTimer(parseInt(res.data.testTime));
        setNotice(!notice);
      } else {
        alert(res.msg);
        navigate("/student/home");
        setAnswers([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const addAnswer = (q, a) => {
    let newanswers = [...answers];
    newanswers[q] = a + 1;
    setAnswers(newanswers);
  };

  const clearAnswer = (index) => {
    let arr = [...answers];
    arr[index] = null;
    setAnswers(arr);
  };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data && data.token) {
      setUser(data);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time.min < timer) {
        if (time.sec < 60) {
          setTime({ ...time, sec: time.sec + 1 });
        } else {
          if (time.sec == 60 && time.min < timer) {
            setTime({ min: time.min + 1, sec: 0 });
          }
        }
      } else {
        if (timer != 0 && time.min == timer) {
          clearInterval(intervalId);
          submitTest();
        }
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [time.sec, time.min, notice]);

  const submitTest = async () => {
    if(submitCount<1){
      setSubmitCout(submitCount+1);
      let req = await fetch(`/student/exam/submit/${params.testid}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          data: answers,
        }),
      });
      let res = await req.json();
      if (res.status == 200) {
        alert(res.msg);
        setFeedVis(!feedVis);
      } else {
        alert(res.msg);
      }
    }
  };
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
          if(submitCount<1){
            submitTest();
          }
      }
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [answers,submitCount]);

  return (
    <>
      <div className="exam-navbar">
        <div className="title">
          <p>Exam vista</p>
        </div>
        <div className="actions" style={{ color: "white" }}>
          <p>{user && user.name}</p>
        </div>
      </div>

      <div className="exam-page">
        {notice && (
          <>
            <div className="notice-msg">
              <h3>Key Points</h3>
              <ul>
                <li>Don't refresh the page</li>
                <li>Student can take test only once</li>
                <li>Click Submit button after completion</li>
                <li>Test will be Auto Submited after given time completes</li>
                <li>
                  Test will be autoSubmitted if you minimize the screen during
                  the test
                </li>
              </ul>
              <div className="btn">
                <button onClick={startTest}>Start</button>
              </div>
            </div>
          </>
        )}

        {!notice && !feedVis && (
          <div className="questions">
            <>
              <div className="question-heading">
                <div className="headings">
                  <h3>Test Name:{testData.testName}</h3>
                  <p>Code: {testData.testCode}</p>
                </div>
                <div className="timer">
                  <p>
                    Time:
                    {(time.min > 10 ? time.min : "0" + time.min) +
                      ":" +
                      (time.sec > 10 ? time.sec : "0" + time.sec)}
                  </p>
                  <p>Questions:{i + 1 + "/" + questions.length}</p>
                </div>
              </div>
              <hr />
              <div className="que">
                {questions && i < questions.length && (
                  <>
                    <h3 style={{ margin: "5px" }}>{questions[i].question} </h3>
                    <ul>
                      {questions[i].options.map((data, index) => {
                        return (
                          <>
                            <li
                              onClick={() => addAnswer(i, index)}
                              className={
                                answers[i] == index + 1 ? "check" : "fail"
                              }
                            >
                              {data}
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </>
                )}
                <div className="que-btns">
                  <button
                    onClick={() => setI((prev) => (prev > 0 ? prev - 1 : prev))}
                  >
                    prev
                  </button>
                  {i < questions.length - 1 ? (
                    <>
                      <button onClick={() => setI((prev) => prev + 1)}>
                        next
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={submitTest}>submit</button>
                    </>
                  )}
                  {answers[i] != null && (
                    <button onClick={() => clearAnswer(i)}>
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            </>
          </div>
        )}
      </div>
      {feedVis && (
        <>
          <div className="feebackform">
            <Feedback testName={testData.testName} />
          </div>
        </>
      )}
    </>
  );
};

export default ExamPage;
