import axios from "axios";

const API = "http://18.221.6.130:8000";

export default axios.create({
  baseURL: API,
  headers: {
    "Content-type": "application/json",
  },
});
