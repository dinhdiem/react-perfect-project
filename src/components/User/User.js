import React, { useEffect, useState } from "react";
import { getQuizbyUser } from "../../services/apiService";

const User = () => {
  const [allQuiz, setAllQuiz] = useState([]);

  useEffect(() => {
    getAllQuizByUser();
  }, []);

  const getAllQuizByUser = async () => {
    const res = await getQuizbyUser();
    const { DT } = res;
    setAllQuiz(DT);
  };
  return (
    <div className="user-container">
      {allQuiz &&
        allQuiz.length !== 0 &&
        allQuiz.map((item) => {
          return (
            <div key={item.id} className="card" style={{ width: "18rem" }}>
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">{item.description}</p>
                <button className="btn btn-primary">Start now</button>
              </div>
            </div>
          );
        })}
      {allQuiz && allQuiz.length === 0 && (
        <div className="d-flex justify-content-center">
          <span>No quiz</span>
        </div>
      )}
    </div>
  );
};

export default User;
