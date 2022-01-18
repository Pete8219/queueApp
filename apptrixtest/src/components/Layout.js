import React from "react";
import { Link, Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <div className="brand-logo">AppTrixTest</div>
          <ul className="right">
            <li>
              <Link to="/users">Пользователи</Link>
            </li>
            <li>
              <Link to="/tasks">Задачи</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
