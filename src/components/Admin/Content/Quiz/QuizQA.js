import { useEffect, useState } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import {
  getAllQuizForAdmin,
  getQuizWithQA,
  postUpsertQA,
} from "../../../../services/apiService";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import { toast } from "react-toastify";

const QuizQA = () => {
  const initStateQuestion = [
    {
      id: uuid(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuid(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  const [questions, setQuestions] = useState(initStateQuestion);

  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  useEffect(() => {
    getAllQuizByUser();
  }, []);

  useEffect(() => {
    if (selectedQuestion.value) {
      fetchQuizWithQA();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuestion]);

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuestion.value);

    if (res && res.EC === 0) {
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        const q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question - ${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question - ${q.id}.png`,
            "image/png"
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    }
  };

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

  const handleAddAndRemoveItem = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuid(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuid(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      const questionClone = _.cloneDeep(questions);
      const newQuestion = questionClone.filter((item) => item.id !== id);
      setQuestions(newQuestion);
    }
  };

  const handleAddAndRemoveAnwser = (type, id, answerID) => {
    const questionClone = _.cloneDeep(questions);

    if (type === "ADD") {
      const newArr = {
        id: uuid(),
        description: "",
        isCorrect: false,
      };
      let index = questionClone.findIndex((item) => item.id === id);

      questionClone[index].answers.push(newArr);

      setQuestions(questionClone);
    }

    if (type === "REMOVE") {
      let index = questionClone.findIndex((item) => item.id === id);

      questionClone[index].answers = questionClone[index].answers.filter(
        (item) => item.id !== answerID
      );

      setQuestions(questionClone);
    }
  };

  const handleChangeQuestionAndAnwsers = (type, e, id) => {
    const questionClone = _.cloneDeep(questions);

    if (type === "QUESTION") {
      const index = questionClone.findIndex((item) => item.id === id);

      if (index > -1) {
        questionClone[index].description = e;
        setQuestions(questionClone);
      }
    }

    if (type === "UPLOAD") {
      const index = questionClone.findIndex((item) => item.id === id);

      questionClone[index].imageFile = e.target.files[0];
      questionClone[index].imageName = e.target.files[0].name;

      setQuestions(questionClone);
    }
  };

  const handleAnwsersQuestion = (type, id, anwserID, value) => {
    const questionClone = _.cloneDeep(questions);
    const index = questionClone.findIndex((item) => item.id === id);

    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        (anwser) => {
          if (anwser.id === anwserID) {
            if (type === "CHECKED") {
              anwser.isCorrect = value;
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
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
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

    let questionClone = _.cloneDeep(questions);

    for (let i = 0; i < questionClone.length; i++) {
      if (questionClone[i].imageFile) {
        questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
      }
    }

    let res = await postUpsertQA({
      quizId: selectedQuestion.value,
      questions: questionClone,
    });

    if (res && res.EC === 0) {
      fetchQuizWithQA();
      toast.success("Create succes question and answsers");
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="question-container">
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
                <div className="question-list" key={item.id}>
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
                            item.id
                          )
                        }
                      />
                      <label>Description {index + 1}</label>
                    </div>
                    <div className="upload">
                      <label className="label" htmlFor={`${item.id}`}>
                        <BiImageAdd />
                      </label>
                      <input
                        id={item.id}
                        type="file"
                        hidden
                        onChange={(e) =>
                          handleChangeQuestionAndAnwsers("UPLOAD", e, item.id)
                        }
                      />
                      <span>
                        {item.imageName
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
                            handleAddAndRemoveItem("REMOVE", item.id)
                          }
                        >
                          <IoIosRemoveCircle className="trash" />
                        </span>
                      )}
                    </div>
                  </div>
                  {item.answers &&
                    item.answers.length > 0 &&
                    item.answers.map((answer, index) => {
                      return (
                        <div className="answers-content" key={answer.id}>
                          <input
                            checked={answer.isCorrect}
                            type="checkbox"
                            className="form-check-input"
                            onChange={(e) =>
                              handleAnwsersQuestion(
                                "CHECKED",
                                item.id,
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
                                  item.id,
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
                                handleAddAndRemoveAnwser("ADD", item.id)
                              }
                            >
                              <IoIosAddCircle className="icons" />
                            </span>
                            {item.answers.length > 1 && (
                              <span
                                onClick={() =>
                                  handleAddAndRemoveAnwser(
                                    "REMOVE",
                                    item.id,
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

export default QuizQA;
