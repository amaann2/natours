import React, { useState } from "react";
import axios from "./../../Utils/axiosConfig";

import { setCurrentUser } from "./../../Redux/User/userAction";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = ({ setCurrentUser }) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `/api/v1/users/resetPassword/${token}`,
        inputValue
      );
      setCurrentUser(res.data.data.user);
      toast.success(res.data.status);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  return (
    <div className="form-page">
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          value={inputValue.password}
          onChange={handleChange}
          placeholder="PASSWORD"
        />
        <input
          type="password"
          name="confirmPassword"
          value={inputValue.confirmPassword}
          onChange={handleChange}
          placeholder="CONFIRM PASSWORD"
        />
        <button>Reset Password</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(ResetPassword);
