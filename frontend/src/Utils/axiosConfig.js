import axios from "axios";

// const baseURL = process.env.REACT_APP_URL_LOCAL;
const deployUrl = process.env.REACT_APP_URL_DEPLOY;

const instance = axios.create({
  baseURL: deployUrl,
});
export default instance;
