import React, { useState } from "react";
import "./Login.css";
import { setCurrentUser } from "./../../Redux/User/userAction";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const Login = ({ setCurrentUser }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/users/login`, inputValue);
      setCurrentUser(res.data);
      setLoading(false);
      toast.success(res.data.status);
      window.location.reload();
      navigate("/");
    } catch (error) {
      setLoading(false);
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
      {loading ? (
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            required
            value={inputValue.email}
            onChange={handleChange}
            placeholder="USERNAME"
          />
          <input
            type="password"
            name="password"
            required
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
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(Login);
