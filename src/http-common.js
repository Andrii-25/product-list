import axios from "axios";

const API = "http://3.137.136.18:8000";

export default axios.create({
  baseURL: API,
  headers: {
    "Content-type": "application/json",
  },
});
