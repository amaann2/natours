import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const ForgotPassword = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/users/forgotPassword`, inputValue);
      toast.success(res.data.status);
      setLoading(false);
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
            value={inputValue.email}
            onChange={handleChange}
            placeholder="EMAIL"
          />
          <button>Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
