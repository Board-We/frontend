import axios from "axios";

// const BASE_URL = "http://192.168.156.23:16383";
// const BASE_URL = "http://localhost:16383"; // docker
const BASE_URL =
  "http://ec2-15-165-124-136.ap-northeast-2.compute.amazonaws.com";

export const request = ({ method, url, data }) => {
  return axios({
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Referrer-Policy": "unsafe_url",
    },
    method,
    url: BASE_URL + url,
    data,
  })
    .then((res) => res)
    .catch((err) => err);
};
