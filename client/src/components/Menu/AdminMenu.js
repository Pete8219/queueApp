import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon } from "../../UI/accountIcon/Icon";
import { UserAccount } from "../Account/UserAccount";
import M from "materialize-css";

export const AdminMenu = () => {
  useEffect(() => {
    M.AutoInit();
  });

  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const links = [
    {
      title: "Пользователи",
      path: "/users",
    },
    {
      title: "Услуги",
      path: "/services",
    },
    {
      title: "Категории услуг",
      path: "/categories",
    },
    {
      title: "Записи",
      path: "/tickets",
    },
    {
      title: "Настройки",
      path: "/settings",
    },
  ];

  document.addEventListener("DOMContentLoaded", function () {
    let elem = document.querySelector(".sidenav");
    let inctance = M.Sidenav.init(elem);
  });

  return (
    <>
      <nav>
        <div className="nav-wrapper blue darken-2">
          <span className="brand-logo" style={{ fontSize: "2em" }}>
            Электронная очередь
          </span>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>

          <ul className="right hide-on-med-and-down">
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
      <ul className="sidenav" id="mobile-demo">
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
    </>
  );
};
