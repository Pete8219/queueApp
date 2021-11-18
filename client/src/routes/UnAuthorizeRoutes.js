import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthPage } from "../pages/admin/AuthPage";
import { Register } from "../pages/Register";
import { SuccessActivation } from "../components/SuccessActivation/SuccessActivation";
import { NotFound } from "../components/404/NotFound";

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
      path: "/success",
      component: SuccessActivation,
    },
    {
      path: "/not_found",
      component: NotFound,
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
