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
import { getTypesFromApi } from "./store/actions/serviceTypes";
import { getAllSettingsFromApi } from "./store/actions/settings";
import { getAllStatusesFromApi } from "./store/actions/statuses";
import { getServicesFromApi } from "./store/actions/services";

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
      return dispatch(logout());
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

  //Наверное здесь нужно сделать обращение к одному единственному редюсеру в store, который будет загружать все данные через api  (i.e. AppDataFromAPI)
  // а дальше будет последовательно вызывать через .then dispatch в каждом редюсере и устанавливать необходимые значения

  //загружаем все сервисы
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    setLoading(true);
    dispatch(getServicesFromApi());
    /* const getService = async () => {
      try {
        const response = await api("/services"); //переделать этот кусок , убрать все в redux
        dispatch(getServices(response.data));
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      } */
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
        const response = await api("/users"); // переделать этот кусок , убрать все в redux

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

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    dispatch(getTypesFromApi());
    dispatch(getAllSettingsFromApi());
    dispatch(getAllStatusesFromApi());
  }, [isAuthenticated, dispatch]);

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
