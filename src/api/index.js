import axios from "axios";

// const BASE_URL = "http://192.168.156.23:16383";
// const BASE_URL = "http://localhost:16383"; // docker
const BASE_URL = "http://ec2-3-36-78-155.ap-northeast-2.compute.amazonaws.com:16383" //live server

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
