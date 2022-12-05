import React from "react";
import _ from "lodash";

const Question = ({ data, index, handleCheckBox }) => {
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleCheckBoxQuestion = (e, answerId, questionId) => {
    handleCheckBox(answerId, questionId);
  };
  return (
    <>
      <div className="q-image">
        {data.image ? (
          <img src={`data:image/jepg;base64, ${data.image}`} alt="img" />
        ) : (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
            alt="img"
          />
        )}
      </div>
      <div className="question mb-3">
        Question {index + 1}: {data.description}
      </div>
      <div className="answers">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((item) => {
            return (
              <div className="a-child" key={item.id}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckBoxQuestion(e, item.id, data.questionID)
                    }
                    checked={item.isChecked}
                  />
                  <label className="form-check-label">{item.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
