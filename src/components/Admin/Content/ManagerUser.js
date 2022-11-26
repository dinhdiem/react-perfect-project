import React, { useState, useEffect } from "react";
import CreateUser from "./CreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { getAllUser } from "../../../services/apiService";
import UpdateUser from "./UpdateUser";
import ViewUserInfo from "./ViewUserInfo";
import ModalDeleteUser from "./ModalDeleteUser";

const ManagerUser = () => {
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [showModalDelete, setShowModalDelete] = useState(false);

  useEffect(() => {
    getlistUsers();
  }, []);

  const getlistUsers = async () => {
    const res = await getAllUser();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };

  const handleClickUpdateButton = (user) => {
    setDataUpdate(user);
    setShowUpdate(true);
  };

  const handleClickViewButton = (user) => {
    setDataUpdate(user);
    setShowInfo(true);
  };

  const resetDataUpdate = () => {
    setDataUpdate({});
  };

  const handleClickDeleteButton = (user) => {
    setDataUpdate(user);
    setShowModalDelete(true);
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage Users</div>
      <div className="user-content">
        <div className="btn-add">
          <button className="btn btn-primary" onClick={() => setShow(true)}>
            <FcPlus /> ADD NEW USER
          </button>
        </div>
        <div className="table">
          <TableUser
            listUser={listUser}
            handleClickUpdateButton={handleClickUpdateButton}
            handleClickViewButton={handleClickViewButton}
            handleClickDeleteButton={handleClickDeleteButton}
          />
        </div>
        <CreateUser show={show} setShow={setShow} getlistUsers={getlistUsers} />
        <UpdateUser
          show={showUpdate}
          setShow={setShowUpdate}
          dataUpdate={dataUpdate}
          getlistUsers={getlistUsers}
          resetDataUpdate={resetDataUpdate}
        />
        <ViewUserInfo
          show={showInfo}
          setShow={setShowInfo}
          dataUpdate={dataUpdate}
          resetDataUpdate={resetDataUpdate}
        />
        <ModalDeleteUser
          showModalDelete={showModalDelete}
          setShow={setShowModalDelete}
          dataDelete={dataUpdate}
          getlistUsers={getlistUsers}
        />
      </div>
    </div>
  );
};

export default ManagerUser;
