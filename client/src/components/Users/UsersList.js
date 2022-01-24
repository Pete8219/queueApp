import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ButtonCreate } from "../../UI/Buttons/ButtonCreate";
import M from "materialize-css";
import { Loader } from "../Loader";
import { deleteUser, getUsersFromApi } from "../../store/actions/users";
import { Pagination } from "../../UI/Pagination";

export const UsersList = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
  });

  useEffect(() => {
    dispatch(getUsersFromApi());
  }, [dispatch]);

  const { users } = useSelector((state) => state.users);

  const [loading] = useState(false);
  const [userName, setUserName] = useState("");
  const [filterUsers, setFilterUsers] = useState(users || []);
  const [showPagination, setShowPagination] = useState(true);

  const userNameRef = useRef(null);

  useEffect(() => {
    setFilterUsers(users);
  }, [users]);

  const deleteHandler = (id) => {
    const undeletedUsers = filterUsers.filter((user) => user._id !== id);
    setFilterUsers(undeletedUsers);
    dispatch(deleteUser(id));
  };

  const pressHandler = (e) => {
    if (e.code === "Enter" && e.target.value !== "") {
      searchHandler(e);
    } else {
      setFilterUsers(users);
      setShowPagination(true);
    }
  };

  const searchHandler = () => {
    const searchValue = userNameRef.current.value;

    if (!searchValue) {
      setShowPagination(true);
      setFilterUsers(users);
      return;
    }
    const filteredUser = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.login.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilterUsers(filteredUser);
    setUserName("");
    setShowPagination(false);
  };

  //пагинацию нужно тоже сделать через redux store
  const paginationHandler = (cPage, pLimit) => {
    const visibleRecords = users.slice((cPage - 1) * pLimit, pLimit * cPage);

    setFilterUsers(visibleRecords);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="row">
      <div className="col s12 m12 l10 offset-l1 xl10 offset-xl1">
        <div className="row">
          <div className="col s12 m12 l12  xl12">
            <h4>Пользователи</h4>
          </div>
        </div>

        <div className="row col s12 m12 l12 x12">
          <div className="input-field col s10 m10 l10 xl6">
            <input
              placeholder="Введите фамилию или логин"
              type="text"
              id="user"
              name="user"
              value={userName}
              ref={userNameRef}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={pressHandler}
            />
            <label htmlFor="user">Поиск пользователя</label>
          </div>
          <div className="col s2 m2 l2 xl1">
            <button
              className="btn waves-effect blue lighten-1"
              onClick={searchHandler}
              style={{ marginTop: "1.5em" }}
            >
              <i className="material-icons">search</i>
            </button>
          </div>
        </div>
        <div className="row col s12 m12 l12 xl12">
          <div className="col s12 m10 l10 xl10 center">
            {showPagination ? (
              <Pagination props={{ paginationHandler }} />
            ) : null}
          </div>
          <div className="col s12 m2 l2 xl2">
            <Link to="/users/create">
              <ButtonCreate />
            </Link>
          </div>
        </div>

        {filterUsers.length > 0 ? (
          <div className="row">
            <div className="col s12 m12 l12 xl12">
              <table className="highlight">
                <thead>
                  <tr>
                    <th>Логин</th>
                    <th>Сотрудник</th>

                    <th>Права</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {filterUsers.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>
                          <Link to={`/users/detail/${item._id}`}>
                            {item.login}
                          </Link>
                        </td>
                        <td>{item.name}</td>

                        <td>{item.userType}</td>
                        <td>
                          {" "}
                          <button
                            className="btn blue lighten-1 right"
                            title="Удалить"
                            target="_blank"
                            style={{ float: "right" }}
                            onClick={() => deleteHandler(item._id)}
                          >
                            <i className="material-icons">delete_forever</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <h1>Пользователей не найдено</h1>
          </div>
        )}
      </div>
    </div>
  );
};
