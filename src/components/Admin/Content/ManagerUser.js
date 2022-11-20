import React from "react";
import CreateUser from "./CreateUser";
import "./ManageUser.scss";

const ManagerUser = () => {
  return (
    <div className="manage-user-container">
      <div className="manage-title">Tilte</div>
      <div className="manage-content">
        <div>
          <button>ADD</button>
        </div>
        <div>Table</div>
        <CreateUser />
      </div>
    </div>
  );
};

export default ManagerUser;
