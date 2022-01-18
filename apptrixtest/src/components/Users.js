import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { loadUsersFromApi } from "../store/actions/users";
import { Loader } from "./Loader";
import { UserCard } from "./UserCard";

export const Users = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(loadUsersFromApi());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>LOGIN</th>
              <th>EMAIL</th>
            </tr>
          </thead>
          <tbody>
            {users.length
              ? users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <Link
                        to={`/users/${user.id}`}
                        key={user.id}
                        element={<UserCard />}
                      >
                        {user.name}
                      </Link>
                    </td>
                    <td>{user.login}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
};
