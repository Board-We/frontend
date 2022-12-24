import axios from "axios";

const BASE_URL = "http://192.168.156.145:16383";

export const request = ({ method, url, data }) => {
  return axios({
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    method,
    url: BASE_URL + url,
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};
