import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon } from "../../UI/accountIcon/Icon";
import { UserAccount } from "../Account/UserAccount";

export const EmployeeMenu = () => {
  const { user } = useSelector((state) => state.userRole);

  const [open, setOpen] = useState(false);

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
            {user?.name ? (
              <button
                style={{
                  border: "0",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => setOpen((prev) => !prev)}
              >
                <Icon props={user.name} />
              </button>
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
