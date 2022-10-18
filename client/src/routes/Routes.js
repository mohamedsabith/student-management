import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UnAuthRoute from "../utils/UnAuthRoute";
import PrivateRoute from "../utils/PrivateRoute";

import SignUpPage from "../pages/SignUpPage";
import SigninPage from "../pages/SignInPage";
import ForgotPassword from "../components/ForgotPassword/forgotPassword";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import HomePage from "../pages/HomePage";
import StudentAddFormPage from "../pages/StudentAddForm";
import NotFound from "../components/NotFound/NotFound";

const routes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<UnAuthRoute />}>
            <Route path="/" element={<SigninPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/reset-password" element={<ResetPassword/>}/>
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/add-student" element={<StudentAddFormPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default routes;
