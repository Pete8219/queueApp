import React, { useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Record } from "../components/Tickets/newRecord/Record";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { NewRequest } from "../components/VisitorRequest/NewRequest";
import { HomePage } from "../pages/visitor/HomePage";

export const UserRoutes = () => {
  //получаем информацию о текущем URL, если он присутствует в localStorage

  const { pathname: pathname = "/" } =
    JSON.parse(localStorage.getItem("url")) || "";
  const history = useHistory();

  useEffect(() => {
    history.push(pathname);
  }, [history, pathname]);

  const routes = [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/record/new",
      component: Record,
    },
    {
      path: "/profile",
      component: UserProfile,
    },
    {
      path: "/request/new",
      component: NewRequest,
    },
  ];
  return (
    <Switch>
      {routes.map((route, i) => {
        return (
          <Route key={i} path={route.path} component={route.component} exact />
        );
      })}
      <Redirect to="/" />
    </Switch>
  );
};
