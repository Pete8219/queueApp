import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, roleReducer } from "../../store/roleReducer";
import { Icon } from "../../UI/accountIcon/Icon";

export const AdminMenu = () => {
  const dispatch = useDispatch(roleReducer);
  const { userId } = useSelector((state) => state.userRole);
  const { users } = useSelector((state) => state.users);
  const currentUser = users.filter((user) => user._id === userId);

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
      title: "Пользователи",
      path: "/users",
    },
    {
      title: "Услуги",
      path: "/allservices",
    },
    {
      title: "Категории услуг",
      path: "/categories",
    },
    {
      title: "Тикеты",
      path: "/tickets",
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
          <li>
            {currentUser.length ? (
              <Icon props={currentUser[0].name[0]} />
            ) : null}
          </li>
        </ul>
      </div>
    </nav>
  );
};
