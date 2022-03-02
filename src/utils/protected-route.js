import React from "react";
// import { Navigate, Route } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom"

function ProtectedRoute({ auth, children }) {
  console.log('auth:', auth)
  return auth.current ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;