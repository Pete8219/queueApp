import React, { useEffect } from "react";
import "materialize-css";
import { AppRoutes } from "./AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/actions/authenticate";
import { Loader } from "./components/Loader";
import { useNavigate } from "react-router-dom";
import { getUsersFromApi } from "./store/actions/users";
import { getCategoriesFromApi } from "./store/actions/categories";

export const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const token = JSON.parse(localStorage.getItem("access"));

  useEffect(() => {
    dispatch(checkAuth(token));
    navigate("/", { replace: true });
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AppRoutes />
    </>
  );
};
