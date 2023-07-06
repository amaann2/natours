import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { setCurrentUser } from "../../Redux/User/userAction";
import { connect } from "react-redux";
const UpdateProfile = ({ currentUser, setCurrentUser }) => {
  const [profile] = useState(currentUser?.photo);
  const [name, setName] = useState(currentUser?.name);
  const [email, setEmail] = useState(currentUser?.email);
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (selectedFile) {
      formData.append("photo", selectedFile);
    }

    try {
      const res = await axios.patch("/api/v1/users/updateMe", formData, {
        withCredentials: true,
      });
      window.location.reload();
      toast.success(res.data.status);
      setCurrentUser(res.data.data.user);
      setEmail("");
      setName("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <img
        crossOrigin="anonymous"
        src={`/img/users/${profile}`}
        alt="profile"
        className="user-profile"
      />
      <input
        type="text"
        value={name}
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        value={email}
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="file"
        name=""
        id=""
        placeholder="Upload photo"
        onChange={onFileChange}
      />
      <button>save settings</button>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(UpdateProfile);
