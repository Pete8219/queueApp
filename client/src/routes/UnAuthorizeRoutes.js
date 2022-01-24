import React from "react";
import { AuthPage } from "../pages/admin/AuthPage";
import { Register } from "../pages/Register";
import { SuccessRegistration } from "../components/SuccessRegistration/SuccessRegistration";
import { NotFound } from "../components/404/NotFound";
import { Confirm } from "../pages/Confirm";
import { App } from "../App";

import { Routes, Route } from "react-router-dom";

export const UnAuthorizeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route index element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="success_registration" element={<SuccessRegistration />} />
      <Route path="/confirm/:code" element={<Confirm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
