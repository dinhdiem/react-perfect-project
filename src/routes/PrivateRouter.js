import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { isAuthenticate } = useSelector((state) => state.user.account);

  if (!isAuthenticate) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRouter;
