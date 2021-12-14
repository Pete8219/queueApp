import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, roleReducer } from "../../store/roleReducer";
import { Icon } from "../../UI/accountIcon/Icon";
import { UserAccount } from "../Account/UserAccount";

export const UserMenu = () => {
  const dispatch = useDispatch(roleReducer);
  const {
    userId,
    user: { name },
  } = useSelector((state) => state.userRole);
  const { users } = useSelector((state) => state.users);
  // const currentUser = users.filter((user) => user._id === userId);

  const [open, setOpen] = useState(false);

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
      title: "Профиль",
      path: "/profile",
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
            {name ? (
              <a onClick={() => setOpen((prev) => !prev)}>
                <Icon props={name} />
              </a>
            ) : null}
          </li>
        </ul>
      </div>
      <div>
        <UserAccount isOpen={open} isClose={() => setOpen(false)} />
      </div>
    </nav>
  );
};
