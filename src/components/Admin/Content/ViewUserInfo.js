import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";

const ViewUserInfo = ({ show, setShow, dataUpdate, resetDataUpdate }) => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [img, setImg] = useState("");
  const [role, setRole] = useState("USER");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setName(dataUpdate.username);
      setRole(dataUpdate.role);
      if (dataUpdate.image) {
        setPreview(`data:/image/jpeg;base64,${dataUpdate.image}`);
      }
      setImg("");
    }
  }, [dataUpdate]);

  const handleClose = () => {
    setShow(false);
    resetDataUpdate();
  };

  const handleUploadImage = (e) => {
    if (e.target && e.target.files[0] && e.target.files) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    } else {
      setPreview("");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="create-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Info User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">UserName</label>
              <input
                disabled
                type="text"
                className="form-control"
                placeholder=""
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select
                disabled
                className="form-select"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option selected value="USER">
                  USER
                </option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus /> Upload file
              </label>
              <input
                disabled
                type="file"
                hidden
                id="labelUpload"
                onChange={(e) => handleUploadImage(e)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {preview ? (
                <img src={preview} alt="anh" />
              ) : (
                <span>Preview Upload</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewUserInfo;
