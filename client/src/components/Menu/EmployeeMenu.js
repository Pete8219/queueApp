import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, roleReducer } from "../../store/roleReducer";

export const EmployeeMenu = () => {
  const dispatch = useDispatch(roleReducer);

  const logoutHandler = () => {
    localStorage.removeItem("access_token");
    dispatch(logout());
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
        <span className="brand-logo">Электронная очередь</span>

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
