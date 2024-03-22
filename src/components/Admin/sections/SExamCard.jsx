import { useEffect, useState } from "react";
import "./SExamCard.css";

const SExam = () => {
  const [user, setUser] = useState();
  const [displayQue, setDispalyQue] = useState(false);
  const [que, setQue] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });
  const [examInfo, setExamInfo] = useState({
    testName: "",
    keys: user && user.keys,
    noofQuestions: "",
    testTime: "",
    testQuestions: [],
    testAnswers: [],
  });
  const clearForms = () => {
    setExamInfo({
      testName: "",
      noofQuestions: "",
      testTime: "",
      testQuestions: [],
      testAnswers: [],
    });
    setQue({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    });
  };
  const nextForm = () => {
    console.log(examInfo)
    if (
      examInfo.testName &&
      examInfo.keys &&
      examInfo.noofQuestions &&
      examInfo.testTime
    ) {
      setDispalyQue(true);
      console.log(examInfo);
    } else {
      alert("all fields are required");
    }
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setQue({ ...que, [name]: value });
  };
  const addQuestion = () => {
    if (examInfo.testQuestions.length < parseInt(examInfo.noofQuestions)) {
      if (
        (que.question && que.answer && que.option1) ||
        que.option2 ||
        que.option3 ||
        que.option1
      ) {
        setExamInfo((prev) => ({
          ...prev,
          testQuestions: [
            ...prev.testQuestions,
            {
              question: que.question,
              options: [que.option1, que.option2, que.option3, que.option4],
            },
          ],
          testAnswers: [...prev.testAnswers, que.answer],
        }));
        setQue({
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
        });
      }
    }
  };

  const submitData = async () => {
    let res = await fetch("/addTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: examInfo,
      }),
    });
    let response = await res.json();
    if (res.status == 200) {
      console.log(response);
      alert(response.msg);
      clearForms();
      setDispalyQue(!displayQue);
    } else {
      alert(response.msg);
    }
  };
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data && data.token) {
      setUser(data);
      setExamInfo({ ...examInfo,keys:data.keys });
    }
  }, [displayQue]);

  //   useEffect(() => {
  //     console.log(examInfo);
  //   }, [examInfo.testQuestions]);

  return (
    <>
    
      <div className="add-exam-card">
      {
     user && user.keys!=""?
     <div className="exam-form">
        <div className="heading">
          <h2 style={{ textAlign: "center" }}>
            {!displayQue ? "Create Exam" : "Add questions"}
          </h2>
        </div>
        {!displayQue ? (
          <>
            <input
              type="text"
              value={examInfo.testName}
              placeholder="*Enter Test Name"
              required
              onChange={(e) =>
                setExamInfo({ ...examInfo, testName: e.target.value })
              }
            />
            <input
              type="text"
              value={user && user.keys}
              placeholder="*Enter Test code"
              required
              readOnly
            />
            <input
              type="number"
              value={examInfo.noofQuestions}
              placeholder="*Enter No Of Questions"
              required
              onChange={(e) =>
                setExamInfo({ ...examInfo, noofQuestions: e.target.value })
              }
            />
            <input
              type="number"
              value={examInfo.testTime}
              placeholder="*Enter Test Time in min"
              required
              onChange={(e) =>
                setExamInfo({ ...examInfo, testTime: e.target.value })
              }
            />
            <button onClick={nextForm}>Next</button>
          </>
        ) : (
          <>
            {examInfo.testQuestions.length <
              parseInt(examInfo.noofQuestions) && (
              <>
                <p style={{ textAlign: "right" }}>
                  {" "}
                  questions {examInfo.testQuestions.length}/
                  {examInfo.noofQuestions}
                </p>
                <input
                  type="text"
                  value={que.question}
                  name="question"
                  placeholder="Enter Question"
                  onChange={(e) => handleChange(e)}
                />

                <input
                  type="text"
                  value={que.option1}
                  name="option1"
                  placeholder="Enter Option 1"
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="text"
                  value={que.option2}
                  name="option2"
                  placeholder="Enter Option 2"
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="text"
                  value={que.option3}
                  name="option3"
                  placeholder="Enter Option 3"
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="text"
                  value={que.option4}
                  name="option4"
                  placeholder="Enter Option 4"
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="number"
                  value={que.answer}
                  name="answer"
                  placeholder="Enter Answer As Option Number"
                  onChange={(e) => handleChange(e)}
                />
              </>
            )}
            {examInfo.testQuestions.length <
            parseInt(examInfo.noofQuestions) ? (
              <button onClick={addQuestion}>Add</button>
            ) : (
              <button onClick={submitData}>submit</button>
            )}
          </>
        )}
      </div>:(
        <>
        <div className="heading">
          <h2 style={{textAlign:"center"}}>Create key in profile to add the test</h2>
        </div>
        </>
      )
      }
    </div>
    </>
  );
};

export default SExam;
