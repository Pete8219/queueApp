import React from "react";
import { CategoriesList } from "../../../components/Category/CategoriesList";
import { useSelector } from "react-redux";

export const Categories = () => {
  const { loading } = useSelector((state) => state.categories);

  return <>{!loading && <CategoriesList />}</>;
};
