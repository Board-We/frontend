import axios from "axios";

const BASE_URL = "http://localhost:16383";

export const request = ({ method, url, data }) => {
  return axios({
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    method,
    url: BASE_URL + url,
    data,
  })
    .then((res) => res)
    .catch((err) => err);
};
