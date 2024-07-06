import axios from "./customize-axios";

const fetchAllUser = (page) => {
  // axios trả về 1 cái promise
  return axios.get(`api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
  return axios.post("api/users", { name, job });
};

export { fetchAllUser, postCreateUser };
