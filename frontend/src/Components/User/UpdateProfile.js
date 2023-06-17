import React, { useState } from "react";

const UpdateProfile = ({ currentUser }) => {
  const [profile, setProfile] = useState(currentUser?.photo);

  return (
    <form action="">
      <img
        crossOrigin="anonymous"
        src={`http://localhost:8000/img/users/${profile}`}
        alt=""
        className="user-profile"
      />
      <input type="text" placeholder={currentUser?.name} />
      <input type="email" placeholder={currentUser?.email} />
      <input type="file" name="" id="" />
      <button>save settings</button>
    </form>
  );
};

export default UpdateProfile;
