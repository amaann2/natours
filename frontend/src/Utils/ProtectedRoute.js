import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
const ProtectedRoute = ({ children, roles }) => {
  const { currentUser, isAuthenticated, role } = useSelector(
    (state) => state.user
  );
  const location = useLocation();

  const userHasRequiredRole = role && roles.includes(role) ? true : false;

  console.log("both are equal", userHasRequiredRole);
  console.log("roles", roles);
  console.log("role", role);
  console.log("user is loggedin isauthenticated", isAuthenticated);

  if (isAuthenticated === false) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }
  if (isAuthenticated === true && userHasRequiredRole === false) {
    return <div>not access</div>; // build your won access denied page (sth like 404)
  }
  return children;
};

export default ProtectedRoute;
