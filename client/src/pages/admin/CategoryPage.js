import React, { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { CategoriesList } from "../../components/Category/CategoriesList";
import { Create } from "../../components/Category/Create";
import { Detail } from "../../components/Category/Detail";
import { useMessage } from "../../hooks/message.hook";
import { useHistory } from "react-router-dom";

import api from "../../http";

export const CategoryPage = () => {
  const history = useHistory();

  const [active, setActive] = useState("List");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const { loading } = useHttp();
  const message = useMessage();

  const saveCategoryHandler = async () => {
    try {
      const response = await api.post("/categories", { title });
      message(response.data.message);
      history.push("/categories");
    } catch (e) {}
  };

  const updateCategoryHandler = async (id) => {
    try {
      const response = await api.patch(
        `/categories/${id}`,

        { title }
      );

      message(response.data.message);
      setActive("List");
    } catch (e) {}
  };

  const cancelHandler = () => {
    setActive("List");
  };

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <CategoriesList />
      {active === "Create" && (
        <Create
          save={saveCategoryHandler}
          cancel={cancelHandler}
          changeTitle={changeTitle}
        />
      )}
      {!loading && category && active === "Detail" && (
        <Detail
          category={category}
          title={title}
          cancel={cancelHandler}
          changeTitle={changeTitle}
          update={updateCategoryHandler}
        />
      )}
    </>
  );
};
