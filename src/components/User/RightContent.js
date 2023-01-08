import React, { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = ({ data, handleFinishQuiz, setIndex }) => {
  const refDiv = useRef([]);
  const timeOut = () => {
    handleFinishQuiz();
  };

  const getClass = (question) => {
    if (question && question.answers.length > 0) {
      let checkedQuestion = question.answers.find(
        (item) => item.isChecked === true
      );

      if (checkedQuestion) {
        return "question selected";
      }
    }

    return "question";
  };

  const handleCickQuestion = (index, question) => {
    setIndex(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item.className === "question clicked") {
          item.className = "question";
        }
      });
    }

    if (question && question.answers.length > 0) {
      let checkedQuestion = question.answers.find(
        (item) => item.isChecked === true
      );
      if (checkedQuestion) {
        return;
      }
    }
    refDiv.current[index].className = "question clicked";
  };

  return (
    <>
      <div className="main-countdown">
        <CountDown timeOut={timeOut} />
      </div>
      <div className="main-question">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <div
                className={getClass(item)}
                key={index}
                onClick={() => handleCickQuestion(index, item)}
                ref={(el) => (refDiv.current[index] = el)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
