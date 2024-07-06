import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";
const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateUser } = props;
  const [name, setname] = useState("");
  const [job, setJob] = useState("");
  const handleSaveUser = async () => {
    let response = await postCreateUser(name, job);
    if (response && response.id) {
      //success
      handleClose();
      setname("");
      setJob("");
      toast.success("A user is created success");
      handleUpdateUser({ first_name: name, id: response.id });
    } else {
      //error
      toast.error("An error");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-new-user">
            <div className="form-group">
              <label className="form-laber">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={name}
                onChange={(event) => setname(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-laber">Job</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Job"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
