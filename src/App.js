import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'
import {
  Splash,
  Login,
  SignUp,
  ForgetPassword,
  VerificationCode,
  NewPassword,
  Success,
  Dashboard,
  Notification,
  UserManagement,
  UserDetails,
  AdminDetails,
  PlayerDetails,
  Language,
  ReportDetails,
  PaymentLogs,
  FeedbackManagement,
  FeedbackDetails,
  Profile,
  EditProfile,
  ChangePassword,
  Document,
  AdminManagement,
  Interest,
  GroupManagement,
} from "./screens";
import GroupDetails from "./screens/groupmanagement/GroupDetails";
import { ProtectedRoute, PublicRoute } from "./middlewares/RouteProtected";
import NotFound from "./screens/notFound";
import VerifyEmail from "./screens/verifyEmail";
function App() {
  // Local Stroage Admin Data
  const adminData = JSON.parse(localStorage.getItem("admin_user"));
  const isAuthenticated = !!adminData;
  
  return (
    <>
      <div>
        <div className="w-full overflow-hidden">
          <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/users/:id/verify/:token" element={<VerifyEmail/>}/>
            <Route path="/" element={<Splash />} />
            <Route
              path="/login"
              element={
                <PublicRoute
                  isAuthenticated={isAuthenticated}
                  element={<Login />}
                />
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/forgetpassword"
              element={
                <PublicRoute
                  isAuthenticated={isAuthenticated}
                  element={<ForgetPassword />}
                />
              }
            />
            <Route
              path="/verifycode"
              element={
                <PublicRoute
                  isAuthenticated={isAuthenticated}
                  element={<VerificationCode />}
                />
              }
            />
            <Route
              path="/newpassword"
              element={
                <PublicRoute
                  isAuthenticated={isAuthenticated}
                  element={<NewPassword />}
                />
              }
            />
            <Route
              path="/success"
              element={
                <PublicRoute
                  isAuthenticated={isAuthenticated}
                  element={<Success />}
                />
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<Dashboard />}
                />
              }
            />
            <Route
              path="/notif"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<Notification />}
                />
              }
            />
            {/* <Route
              path="/adminmanagement"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<AdminManagement />}
                />
              }
            />
            <Route
              path="/adminmanagement/admindetails"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<AdminDetails />}
                />
              }
            /> */}
            <Route
              path="/interest"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<Interest />}
                />
              }
            />
            <Route
              path="/playersmanagement/playerdetails"
              element={<PlayerDetails />}
            />
            <Route
              path="/language"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<Language />}
                />
              }
            />
            <Route
              path="/usermanagement"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<UserManagement />}
                />
              }
            />
            <Route
              path="/usermanagement/userdetails/:userId"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<UserDetails />}
                />
              }
            />
            <Route
              path="/groupmanagement"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<GroupManagement />}
                />
              }
            />
            <Route
              path="/groupmanagement/groupdetails/:id"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<GroupDetails />}
                />
              }
            />
            <Route path="/paymentlogs" element={<PaymentLogs />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<Profile />}
                />
              }
            />
            <Route
              path="/profile/editprofile"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<EditProfile />}
                />
              }
            />
            <Route
              path="/profile/changepassword"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<ChangePassword />}
                />
              }
            />
            <Route
              path="/documents"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<Document />}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
