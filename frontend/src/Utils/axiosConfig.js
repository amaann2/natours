import axios from "axios";

// const baseURL = process.env.REACT_APP_URL_LOCAL;
const deployUrl = "https://trexbackend.onrender.com";

const instance = axios.create({
  baseURL: deployUrl,
});
export default instance;
