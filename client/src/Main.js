import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useRoutes } from "./routes";

import { Navbar } from "../src/components/navbar";
import { Loader } from "../src/components/Loader";
import "materialize-css";
import "react-datepicker/dist/react-datepicker.css";
import { logout } from "./store/roleReducer";
import { checkToken } from "./store/asyncActions";
import api from "./http";
import { getServices } from "./store/serviceReducer";
import { getUsers } from "./store/userReducer";
import { getCategoriesFromApi } from "./store/actions/categories";
import { getUserTicketsFromAPI } from "./store/actions/tickets";
import { getUserProfile } from "./store/actions/users";

export const Main = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, isFetching, userId } = useSelector(
    (state) => state.userRole
  );

  const [loading, setLoading] = useState(false);

  // обновляем информацию о токене
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("access_token"));

    if (!token) {
      return;
    }
    if (token === "undefined") {
      //если нет токена, удаляем все из хранилища и делаем Выход из системы
      localStorage.removeItem("access_token");
      return dispatch(logout());
    }
    dispatch(checkToken(token));
  }, [dispatch]);

  //Получаем профиль пользовтеля
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    dispatch(getUserProfile(userId));
  }, [isAuthenticated, dispatch, userId]);

  //загружаем все сервисы
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    setLoading(true);
    const getService = async () => {
      try {
        const response = await api("/services");
        dispatch(getServices(response.data));
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };
    getService();
  }, [isAuthenticated, dispatch]);

  //загружаем все категории услуг
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    dispatch(getCategoriesFromApi());
  }, [isAuthenticated, dispatch]);

  //получаем список пользователей
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await api("/users");

        dispatch(getUsers(response.data));
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [isAuthenticated, dispatch]);

  //получаем список тикетов созданных текущим залогиненным пользователем
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    dispatch(getUserTicketsFromAPI(userId));
  }, [isAuthenticated, userId, dispatch]);

  /*   useEffect(() => {
    history.push(`${pathname}`);
  }, [pathname, history]); */

  const routes = useRoutes();

  if (loading) {
    return <Loader />;
  }

  if (isFetching) {
    return <Loader />;
  }

  return (
    <Router>
      {isAuthenticated && <Navbar />}

      <div>{routes}</div>
    </Router>
  );
};
