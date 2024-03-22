import React, { useEffect, useState } from "react";
import "../sections/ExamsCard.css";
import { FaClock, FaPenAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CardHeading from "../../CardsHeading/CardHeading";
import CardsContent from "../../CardsContent/CardsContent";

const ExamsCard = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const fetchTests = async () => {
    let req = await fetch("/studentTests", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });
    let res = await req.json();
    if (res.status == 200) {
      setTests(res.Tests);
    }
  };
  const takeTest = (data) => {
    if (data._id) {
      navigate(`/student/exam/${data._id}`);
    }
  };
  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <>
      <div className="exams-available-card">
        <CardHeading heading="Exams Available" />
        {tests.length > 0 ? (
          <>
            <CardsContent>
              <div className="tests-List">
                {tests &&
                  tests.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div
                          className="test-item"
                          onClick={() => takeTest(data)}
                        >
                          <div className="test-actions">
                            <h3>{data.testName}</h3>
                            {/* <p style={{cursor:"pointer"}}><FaPenAlt color='rebeccapurple'/></p> */}
                          </div>
                          <div className="subitems">
                            <div
                              className="clock"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "2px",
                              }}
                            >
                              <FaClock color="rebeccapurple" />
                              <p>{data.testTime}</p>
                            </div>
                            <p>Questions: {data.noofQuestions}</p>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </div>
            </CardsContent>
          </>
        ) : (
          <>
            <h4 style={{ margin: "20px" }}>No Tests Available</h4>
          </>
        )}
      </div>
    </>
  );
};

export default ExamsCard;
