import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuizByOne } from "../../services/apiService";
import _ from "lodash";
import "./detailQuiz.scss";
import Question from "./Question";

const DetailQuiz = () => {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const getOneQuiz = async () => {
    const res = await getQuizByOne(id);
    if (res && res.EC === 0) {
      const data = _.chain(res.DT)
        .groupBy("id")
        .map((value, key) => {
          let data = [];
          let description,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              description = item.description;
              image = item.image;
            }
            item.answers.isChecked = false;
            data.push(item.answers);
          });
          return { questionID: key, answers: data, description, image };
        })
        .value();
      setData(data);
    }
  };

  useEffect(() => {
    getOneQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSetIndex = (text) => {
    if (text === "prev" && index > 0) {
      setIndex(index - 1);
    }

    if (text === "next" && data && index + 1 < data.length) {
      setIndex(index + 1);
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(data);
    let question = dataQuizClone.find(
      (item) => +item.questionID === +questionId
    );

    if (question && question.answers) {
      let data = question?.answers?.map((item) => {
        if (+item.id === +answerId) {
          item.isChecked = !item.isChecked;
        }
        return item;
      });
      question.answers = data;
    }

    let index = dataQuizClone.findIndex(
      (item) => +item.questionID === +questionId
    );

    if (index > -1) {
      dataQuizClone[index] = question;
      setData(dataQuizClone);
    }
  };

  const handleFinishQuiz = () => {
    const payload = {
      quizId: +id,
      answers: [],
    };

    const answers = [];

    if (data && data.length > 0) {
      data.forEach((item) => {
        let questionID = +item.questionID;
        let userAnswerId = [];

        item.answers.forEach((item) => {
          if (item.isChecked) {
            userAnswerId.push(item.id);
          }
        });

        answers.push({
          questionID,
          userAnswerId,
        });
      });
    }
    payload.answers = answers;

    console.log(payload);
  };

  return (
    <div className="q-cotainer">
      <div className="left-content">
        <div className="title">
          Quiz {id}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-content">
          <Question
            handleCheckBox={handleCheckBox}
            data={data && data.length > 0 ? data[index] : []}
            index={index}
          />
        </div>
        <div className="footer d-flex gap-2 justify-content-center">
          <button
            className="btn btn-secondary"
            onClick={() => handleSetIndex("prev")}
          >
            Prev
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSetIndex("next")}
          >
            Next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleFinishQuiz()}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">Count down</div>
    </div>
  );
};

export default DetailQuiz;
