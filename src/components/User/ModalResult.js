import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = ({ show, setShow, dataModalResult }) => {
  const handleClose = () => {
    setShow(false);
  };

  const handleShowQuestion = () => {
    console.log(dataModalResult);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Kết quả bài Quiz: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Tổng số câu hỏi: <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            Tổng số câu trả lời đúng: <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleShowQuestion}>
            Hiển thị câu trả lời
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalResult;
