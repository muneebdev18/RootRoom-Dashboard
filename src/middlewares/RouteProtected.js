import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element, isAuthenticated, redirectPath = "/login" }) => {
    return isAuthenticated ? element : <Navigate to={redirectPath} />;
};

export const PublicRoute = ({ element, isAuthenticated, redirectPath = "/home" }) => {
    return isAuthenticated ? <Navigate to={redirectPath} /> : element;
};
