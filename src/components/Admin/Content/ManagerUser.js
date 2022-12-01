import React, { useState, useEffect } from "react";
import CreateUser from "./CreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { getUserPaginate } from "../../../services/apiService";
import UpdateUser from "./UpdateUser";
import ViewUserInfo from "./ViewUserInfo";
import ModalDeleteUser from "./ModalDeleteUser";
import TablePaginate from "./TablePanigane";

const ManagerUser = () => {
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT_RECORD = 3;

  useEffect(() => {
    getUserWithPaginate(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserWithPaginate = async (page) => {
    const res = await getUserPaginate(page, LIMIT_RECORD);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
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
          <TablePaginate
            listUser={listUser}
            handleClickUpdateButton={handleClickUpdateButton}
            handleClickViewButton={handleClickViewButton}
            handleClickDeleteButton={handleClickDeleteButton}
            pageCount={pageCount}
            getUserWithPaginate={getUserWithPaginate}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
        <CreateUser
          show={show}
          setShow={setShow}
          setCurrentPage={setCurrentPage}
          getlistUsers={getUserWithPaginate}
        />
        <UpdateUser
          show={showUpdate}
          setShow={setShowUpdate}
          dataUpdate={dataUpdate}
          getlistUsers={getUserWithPaginate}
          resetDataUpdate={resetDataUpdate}
          currentPage={currentPage}
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
          getlistUsers={getUserWithPaginate}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ManagerUser;
