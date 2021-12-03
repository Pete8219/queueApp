/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./category.module.css";

export const CategoryDropdown = ({
  categories,
  category,
  handler,
  deleteHandler,
}) => {
  const list = categories.map((item) => {
    return (
      <li
        key={item._id}
        value={item.title}
        onClick={() => handler(item._id)}
        style={{ cursor: "pointer" }}
      >
        {item.title}
      </li>
    );
  });

  return (
    <div
      className="col s12"
      style={{ paddingLeft: "0px !important", paddingRight: "0px !important" }}
    >
      <div className="col s6" style={{ marginBottom: "40px" }}>
        <b>Категории услуг</b>
        <ul className="unselectedCats">{list}</ul>{" "}
        {/* список всех невыбранных услуг в левой части формы */}
      </div>
      <div className="col s6">
        <b>Выбранные категории</b>
        <ul>
          {category.length > 0 ? (
            category.map((item) => (
              <div key={item._id}>
                <li
                  key={item._id}
                  className={["col s11 ", styles.categoryList].join(" ")}
                  value={item.title}
                >
                  {item.title}
                </li>
                <a
                  style={{ color: "#000" }}
                  onClick={() => deleteHandler(item._id)}
                >
                  <i className="material-icons col s1 selectedCats">close</i>
                </a>
              </div>
            ))
          ) : (
            <li></li>
          )}
        </ul>
      </div>
    </div>
  );
};
