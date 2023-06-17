import React, { useState } from "react";
import { toast } from "react-toastify";
import { setCurrentUser } from "../../Redux/User/userAction";
import { connect } from "react-redux";
import axios from "./../../Utils/axiosConfig";

axios.defaults.withCredentials = true;
const PasswordChange = ({ setCurrentUser }) => {
  const [inputData, setInputData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `/api/v1/users/updateMyPassword`,
        inputData,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.status);
      setCurrentUser(res.data);
      setInputData({ currentPassword: "", password: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={inputData.currentPassword}
        name="currentPassword"
        onChange={handleChange}
        placeholder="Current Password"
      />
      <input
        type="password"
        value={inputData.password}
        name="password"
        onChange={handleChange}
        placeholder="New Password"
      />
      <input
        type="password"
        value={inputData.confirmPassword}
        name="confirmPassword"
        onChange={handleChange}
        placeholder="Confirm new Password"
      />
      <button>Change Password</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(PasswordChange);
