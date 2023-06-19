import React from "react";
import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, auth }) => {
  // const { currentUser, isAuthenticated, role } = useSelector(
  //   (state) => state.user
  // );
  console.log(auth);
  if (!auth) {
    return <Navigate to={"/login"} replace />;
  }
  // const userHasRequiredRole = role && roles.includes(role) ? true : false;
  // if (isAuthenticated === true && userHasRequiredRole === false) {
  //   return <div>not access</div>; // build your won access denied page (sth like 404)
  // }
  return children;
};

export default ProtectedRoute;
