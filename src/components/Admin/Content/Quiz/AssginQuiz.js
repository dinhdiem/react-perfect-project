import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  getAllQuizForAdmin,
  getAllUser,
  postAssignQuiz,
} from "../../../../services/apiService";

const AssignQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getAllQuizByUser();
    getAllUserAPI();
  }, []);

  const getAllQuizByUser = async () => {
    const res = await getAllQuizForAdmin();
    const { DT } = res;
    const newData = DT.map((item) => {
      return {
        value: item.id,
        label: `${item.id} - ${item.name}`,
      };
    });
    setListQuiz(newData);
  };

  const getAllUserAPI = async () => {
    const res = await getAllUser();
    const { DT } = res;
    const newData = DT.map((item) => {
      return {
        value: item.id,
        label: `${item.id} - ${item.username} - ${item.email}`,
      };
    });
    setListUser(newData);
  };

  const handleAssgin = async () => {
    const res = await postAssignQuiz(
      selectedQuestion.value,
      selectedUser.value
    );

    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="row">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz</label>
        <Select
          defaultValue={selectedQuestion}
          onChange={setSelectedQuestion}
          options={listQuiz}
          className="form-control"
        />
      </div>
      <div className="col-6 form-group">
        <label className="mb-2">Select User</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
          className="form-control"
        />
      </div>
      <div className="mt-3">
        <button className="btn btn-warning" onClick={handleAssgin}>
          Assign quiz
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
