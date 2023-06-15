import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { setCurrentUser } from "./../../Redux/User/userAction";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        inputValue
      );
      setCurrentUser(res.data);
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
          type="email"
          name="email"
          value={inputValue.email}
          onChange={handleChange}
          placeholder="USERNAME"
        />
        <input
          type="password"
          name="password"
          value={inputValue.password}
          onChange={handleChange}
          placeholder="PASSWORD"
        />

        <button>LOGIN</button>
        <p>
          Forgot Password ? <Link to="/forgotPassword">reset password</Link>
        </p>
        <p>
          Don't have an account ? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(Login);
