import React, { useState } from 'react';
import axios from 'axios';
import { setCurrentUser } from './../../Redux/User/userAction';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Register = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/users/signup',
        inputValue
      );
      setCurrentUser(res.data.data);
      toast.success(res.data.status);
      setInputValue({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/');
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
          type="text"
          name="name"
          value={inputValue.name}
          onChange={handleChange}
          placeholder="NAME"
        />
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
        <input
          type="password"
          name="confirmPassword"
          value={inputValue.confirmPassword}
          onChange={handleChange}
          placeholder="CONFIRM PASSWORD"
        />
 
        <button>create an account</button>
        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(Register);
