import React, { useState } from "react";

const UpdateProfile = ({ currentUser }) => {
  const [profile] = useState(currentUser?.photo);

  return (
    <form action="">
      <img
        crossOrigin="anonymous"
        src={`/img/users/${profile}`}
        alt="profile"
        className="user-profile"
      />
      <input type="text" placeholder={currentUser?.name} />
      <input type="email" placeholder={currentUser?.email} />
      <input type="file" name="" id="" placeholder="Upload photo" />
      <button>save settings</button>
    </form>
  );
};

export default UpdateProfile;
