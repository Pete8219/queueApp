import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import M from "materialize-css";
import { SelectService } from "./SelectService";
import { ServiceTypes } from "./ServiceTypes";
import { Router, Route, Switch } from "react-router-dom";

import { SelectDate } from "./SelectDate";

export const CreateRequest = () => {
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
  }, []);
  const { settings } = useSelector((state) => state.settings);
  const { types, current } = useSelector((state) => state.types);

  //const { user } = useSelector((state) => state.userRole);
  //const { shedule, serviceTypes, receptionDays } = [...settings];
  //const { users } = useSelector((state) => state.users);
  const { service } = useSelector((state) => state.services);

  return (
    <div className="row">
      <div className="col s12 m12 l10 offset-1 xl-10 offset-xl1">
        <div className="row">
          <h4>Запись на прием</h4>
        </div>
        <SelectService />
        {/*         <Router>
          <Switch>
            <Route path="/types" component={ServiceTypes} />
            <Route path="/date" component={SelectDate} />
          </Switch>
        </Router> */}
        {service !== null ? <ServiceTypes /> : null}
        {current.length > 0 ? <SelectDate /> : null}
      </div>
    </div>
  );
};
