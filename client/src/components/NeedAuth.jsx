import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const NeedAuth = (props) => {
  const auth = useSelector((state) => state.auth);
  return auth.isLogged ? (
    <>{props.children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default NeedAuth;
