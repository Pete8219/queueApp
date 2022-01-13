import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthPage } from "../pages/admin/AuthPage";
import { Register } from "../pages/Register";
import { SuccessRegistration } from "../components/SuccessRegistration/SuccessRegistration";
import { NotFound } from "../components/404/NotFound";
import { Confirm } from "../pages/Confirm";

export const UnAuthorizeRoutes = () => {
  const routes = [
    {
      path: "/login",
      component: AuthPage,
    },
    {
      path: "/register",
      component: Register,
    },

    {
      path: "/success_registration",
      component: SuccessRegistration,
    },
    {
      path: "/not_found",
      component: NotFound,
    },
    {
      path: "/confirm/:code",
      component: Confirm,
    },
  ];
  return (
    <Switch>
      {routes.map((route, i) => {
        return (
          <Route key={i} path={route.path} component={route.component} exact />
        );
      })}
      <Redirect to="/login" />
    </Switch>
  );
};
