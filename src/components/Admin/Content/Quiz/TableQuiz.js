import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";

const TableQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);

  const getAllQuizAdmin = async () => {
    const res = await getAllQuizForAdmin();
    if (res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  useEffect(() => {
    getAllQuizAdmin();
  }, []);

  return (
    <>
      <div>List Quiz:</div>
      <table className="table table-bordered table-hover mt-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length !== 0 &&
            listQuiz?.map((item) => {
              return (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td>
                    <img
                      src={`data:image/jpeg;base64, ${item.image}`}
                      alt="anh"
                      width="60px"
                      height={"50px"}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
