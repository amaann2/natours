import React, { useState } from "react";
import axios from "axios";
import { setCurrentUser } from "./../../Redux/User/userAction";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const ResetPassword = ({ setCurrentUser }) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.patch(
        `/api/v1/users/resetPassword/${token}`,
        inputValue
      );
      setCurrentUser(res.data.data.user);
      toast.success(res.data.status);
      navigate("/");
      setLoading(false);
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
            type="password"
            name="password"
            required
            value={inputValue.password}
            onChange={handleChange}
            placeholder="PASSWORD"
          />
          <input
            type="password"
            name="confirmPassword"
            required
            value={inputValue.confirmPassword}
            onChange={handleChange}
            placeholder="CONFIRM PASSWORD"
          />
          <button>Reset Password</button>
        </form>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(ResetPassword);
