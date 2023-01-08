import { useEffect, useState } from "react";
import Select from "react-select";
import "./question.scss";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import {
  getAllQuizForAdmin,
  postCreateAnswerForQuestion,
  postCreateQuestionForQuiz,
} from "../../../../services/apiService";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import { toast } from "react-toastify";

const Questions = () => {
  const initStateQuestion = [
    {
      questionID: uuid(),
      description: "",
      questionFile: "",
      questionName: "",
      anwsers: [
        {
          id: uuid(),
          description: "",
          inCorrect: false,
        },
      ],
    },
  ];
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  const [questions, setQuestions] = useState(initStateQuestion);

  useEffect(() => {
    getAllQuizByUser();
  }, []);

  const getAllQuizByUser = async () => {
    const res = await getAllQuizForAdmin();
    const { DT } = res;
    const newData = DT.map((item) => {
      return {
        value: item.id,
        label: `${item.id} - ${item.description}`,
      };
    });
    setListQuiz(newData);
  };

  const handleChange = (e) => {
    setSelectedQuestion(e);
  };

  const handleAddAndRemoveItem = (type, questionID) => {
    if (type === "ADD") {
      const newQuestion = {
        questionID: uuid(),
        description: "",
        questionFile: "",
        questionName: "",
        anwsers: [
          {
            id: uuid(),
            description: "",
            inCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      const questionClone = _.cloneDeep(questions);
      const newQuestion = questionClone.filter(
        (item) => item.questionID !== questionID
      );
      setQuestions(newQuestion);
    }
  };

  const handleAddAndRemoveAnwser = (type, questionID, answerID) => {
    const questionClone = _.cloneDeep(questions);

    if (type === "ADD") {
      const newArr = {
        id: uuid(),
        description: "",
        inCorrect: false,
      };
      let index = questionClone.findIndex(
        (item) => item.questionID === questionID
      );

      questionClone[index].anwsers.push(newArr);

      setQuestions(questionClone);
    }

    if (type === "REMOVE") {
      let index = questionClone.findIndex(
        (item) => item.questionID === questionID
      );

      questionClone[index].anwsers = questionClone[index].anwsers.filter(
        (item) => item.id !== answerID
      );

      setQuestions(questionClone);
    }
  };

  const handleChangeQuestionAndAnwsers = (type, e, questionID) => {
    const questionClone = _.cloneDeep(questions);

    if (type === "QUESTION") {
      const index = questionClone.findIndex(
        (item) => item.questionID === questionID
      );

      if (index > -1) {
        questionClone[index].description = e;
        setQuestions(questionClone);
      }
    }

    if (type === "UPLOAD") {
      const index = questionClone.findIndex(
        (item) => item.questionID === questionID
      );

      questionClone[index].questionFile = e.target.files[0];
      questionClone[index].questionName = e.target.files[0].name;

      setQuestions(questionClone);
    }
  };

  const handleAnwsersQuestion = (type, questionID, anwserID, value) => {
    const questionClone = _.cloneDeep(questions);
    const index = questionClone.findIndex(
      (item) => item.questionID === questionID
    );

    if (index > -1) {
      questionClone[index].anwsers = questionClone[index].anwsers.map(
        (anwser) => {
          if (anwser.id === anwserID) {
            if (type === "CHECKED") {
              anwser.inCorrect = value;
            }

            if (type === "INPUT") {
              anwser.description = value;
            }
          }
          return anwser;
        }
      );
      setQuestions(questionClone);
    }
  };

  const handleSubmitQuiz = async () => {
    if (_.isEmpty(selectedQuestion)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    // validate question

    let indexQuestion = 0;
    let isValidQuestion = false;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        indexQuestion = i;
        isValidQuestion = true;
        break;
      }
    }

    if (isValidQuestion) {
      toast.error(`Not errors for question ${indexQuestion + 1}`);
      return;
    }

    // validate answers for question
    let isValidAnswers = false;
    let indexAnswer = 0;
    let indexQuestionForAnswer = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].anwsers.length; j++) {
        if (!questions[i].anwsers[j].description) {
          isValidAnswers = true;
          indexAnswer = j;
          break;
        }
      }
      indexQuestionForAnswer = i;

      if (isValidAnswers) break;
    }

    if (isValidAnswers) {
      toast.error(
        `Not errors answer ${
          indexAnswer + 1
        } for question ${indexQuestionForAnswer}`
      );
      return;
    }

    // submit question

    for (const question of questions) {
      const q = await postCreateQuestionForQuiz(
        +selectedQuestion.value,
        question.description,
        question.questionFile
      );

      for (const answer of question.anwsers) {
        await postCreateAnswerForQuestion(
          answer.description,
          answer.inCorrect,
          q.DT.id
        );
      }
    }

    toast.success("Create succes question and answsers");
    setQuestions(initStateQuestion);
  };

  return (
    <div className="question-container">
      <div className="title">Question Description</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select Quiz</label>
          <Select
            defaultValue={selectedQuestion}
            onChange={handleChange}
            options={listQuiz}
            className="form-control"
          />
        </div>
        <div className="my-3">Add questions:</div>
        <div>
          {questions &&
            questions.length > 0 &&
            questions.map((item, index) => {
              return (
                <div
                  className="question-list"
                  key={item.questionID ? item.questionID : item.id}
                >
                  <div className="questions-content">
                    <div className="form-floating description">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="name@example.com"
                        value={item.description}
                        onChange={(e) =>
                          handleChangeQuestionAndAnwsers(
                            "QUESTION",
                            e.target.value,
                            item.questionID
                          )
                        }
                      />
                      <label>Description {index + 1}</label>
                    </div>
                    <div className="upload">
                      <label className="label" htmlFor={`${item.questionID}`}>
                        <BiImageAdd />
                      </label>
                      <input
                        id={item.questionID}
                        type="file"
                        hidden
                        onChange={(e) =>
                          handleChangeQuestionAndAnwsers(
                            "UPLOAD",
                            e,
                            item.questionID
                          )
                        }
                      />
                      <span>
                        {item.questionName
                          ? "1 file uploaded"
                          : "0 file is uploaded"}
                      </span>
                    </div>
                    <div className="add">
                      <span onClick={() => handleAddAndRemoveItem("ADD", "")}>
                        <IoIosAddCircle className="icons" />
                      </span>
                      {questions.length > 1 && (
                        <span
                          onClick={() =>
                            handleAddAndRemoveItem("REMOVE", item.questionID)
                          }
                        >
                          <IoIosRemoveCircle className="trash" />
                        </span>
                      )}
                    </div>
                  </div>
                  {item.anwsers &&
                    item.anwsers?.length > 0 &&
                    item.anwsers.map((answer, index) => {
                      return (
                        <div className="answers-content" key={answer.id}>
                          <input
                            checked={answer.inCorrect}
                            type="checkbox"
                            className="form-check-input"
                            onChange={(e) =>
                              handleAnwsersQuestion(
                                "CHECKED",
                                item.questionID,
                                answer.id,
                                e.target.checked
                              )
                            }
                          />
                          <div className="form-floating anwser-name">
                            <input
                              value={answer.description}
                              type="text"
                              className="form-control incorect"
                              placeholder="name@example.com"
                              onChange={(e) =>
                                handleAnwsersQuestion(
                                  "INPUT",
                                  item.questionID,
                                  answer.id,
                                  e.target.value
                                )
                              }
                            />
                            <label>Answer {index + 1}</label>
                          </div>
                          <div className="btn-group">
                            <span
                              onClick={() =>
                                handleAddAndRemoveAnwser("ADD", item.questionID)
                              }
                            >
                              <IoIosAddCircle className="icons" />
                            </span>
                            {item.anwsers.length > 1 && (
                              <span
                                onClick={() =>
                                  handleAddAndRemoveAnwser(
                                    "REMOVE",
                                    item.questionID,
                                    answer.id
                                  )
                                }
                              >
                                <IoIosRemoveCircle className="trash" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}

          {questions && questions.length > 0 && (
            <button onClick={handleSubmitQuiz} className="btn btn-primary">
              Save Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
