import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/users/forgotPassword',
        inputValue
      );
      toast.success(res.data.status);
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
          placeholder="EMAIL"
        />
        <button>Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
