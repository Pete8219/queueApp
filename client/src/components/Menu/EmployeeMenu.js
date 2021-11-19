import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import DispatchContext from "../../context/DispatchContext";

export const EmployeeMenu = () => {
  const { logout } = useContext(AuthContext);
  const appDispatch = useContext(DispatchContext);

  const logoutHandler = () => {
    appDispatch({ type: " logout " });
    localStorage.removeItem("userData");
  };

  const links = [
    {
      title: "Создать запись",
      path: "/record/new",
    },
    {
      title: "Список записей",
      path: "/",
    },
  ];

  return (
    <nav>
      <div className="nav-wrapper blue darken-2">
        <a href="/">
          <span className="brand-logo">Электронная очередь</span>
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {links.map((link, i) => {
            return (
              <li key={i}>
                <NavLink to={link.path}>{link.title}</NavLink>
              </li>
            );
          })}
          <li>
            <a href="/logout" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
