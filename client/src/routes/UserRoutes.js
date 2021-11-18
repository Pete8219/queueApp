import { Route, Switch, Redirect } from "react-router-dom";
import { AuthPage } from "../pages/admin/AuthPage";
import { Register } from "../pages/Register";
import { Calendar } from "../pages/visitors/Calendar";
import { Contact } from "../pages/visitors/Contact";
import { Services } from "../pages/visitors/Services";
import { Categories } from "../pages/visitors/Categories";
import { Staff } from "../pages/visitors/Staff";
import { Ticket } from "../pages/visitors/Ticket";
import { Time } from "../pages/visitors/Time";
import { Record } from "../pages/admin/newRecord/Record";

export const UserRoutes = () => {
  const routes = [
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/service",
      component: Services,
    },
    {
      path: "/calendar",
      component: Calendar,
    },
    {
      path: "/time",
      component: Time,
    },
    {
      path: "/contact",
      component: Contact,
    },
    {
      path: "/staff",
      component: Staff,
    },
    {
      path: "/ticket",
      component: Ticket,
    },
    {
      path: "/record/new",
      component: Record,
    },
    {
      path: "/categories",
      component: Categories,
    },
  ];
  return (
    <Switch>
      {routes.map((route, i) => {
        console.log(route);
        return (
          <Route key={i} path={route.path} component={route.component} exact />
        );
      })}
      <Redirect to="/categories" />
    </Switch>
  );
};
