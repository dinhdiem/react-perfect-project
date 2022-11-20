import React, { useState } from "react";
import CreateUser from "./CreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";

const ManagerUser = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="manage-user-container">
      <div className="title">Manage Users</div>
      <div className="user-content">
        <div className="btn-add">
          <button className="btn btn-primary" onClick={() => setShow(true)}>
            <FcPlus /> ADD NEW USER
          </button>
        </div>
        <div className="table">Table</div>
        <CreateUser show={show} setShow={setShow} />
      </div>
    </div>
  );
};

export default ManagerUser;
