import axios from "axios";

const API = "18.189.2.245:8000";

export default axios.create({
  baseURL: API,
  headers: {
    "Content-type": "application/json",
  },
});
