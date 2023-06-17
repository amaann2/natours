import React from "react";
import { useSelector } from "react-redux";

const UserRoute = ({ children }) => {
  const { role, isAuthenticated } = useSelector((state) => state.user);

  if (role && role === "user") {
    return <>{children}</>;
  } else {
    return <div>UserRoute admin can not access this route</div>;
  }
};

export default UserRoute;
