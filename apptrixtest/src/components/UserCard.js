import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getUserFromApi } from "../store/actions/users";
import { Loader } from "./Loader";

export const UserCard = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { user, isLoading } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getUserFromApi(params.userId));
  }, [params, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6 l10 xl12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Карточка пользователя</span>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>LOGIN</th>
                    <th>EMAIL</th>
                    <th>TYPE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.login}</td>
                    <td>{user.email}</td>
                    <td>{user.$type}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card-action">
              <Link to="/">Все пользователи</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
