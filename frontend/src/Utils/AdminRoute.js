import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const AdminRoute = ({ children }) => {
  const { role } = useSelector((state) => state.user);

  if (role && role === "admin") {
    return <>{children}</>;
  } else {
    return <Navigate to="/*" />;
  }
};

export default AdminRoute;
