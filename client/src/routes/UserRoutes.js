import { Route, Switch, Redirect } from "react-router-dom";

import { Record } from "../components/Tickets/newRecord/Record";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { HomePage } from "../pages/visitor/HomePage";

export const UserRoutes = () => {
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
