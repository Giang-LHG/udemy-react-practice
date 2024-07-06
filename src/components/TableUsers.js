import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";

const TableUsers = (props) => {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isShowModalAddNew, setisShowModalAddNew] = useState(false);

  const handleUpdateUser = (user) => {
    setListUser([user, ...listUser]);
  };
  const handleClose = () => {
    setisShowModalAddNew(false);
  };
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUser(res.data);
      setTotalUsers(res.total);
      setTotalPage(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    getUser(+event.selected + 1); // thêm dấu cộng vào event để convert từ String -> number
  };

  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List User:</b>
        </span>
        <button
          className="btn btn-success"
          onClick={() => setisShowModalAddNew(true)}
        >
          Add new user
        </button>
      </div>{" "}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user, index) => (
              <tr key={`users-${index}`}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>@{user.last_name}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateUser={handleUpdateUser}
      />
    </>
  );
};
export default TableUsers;
