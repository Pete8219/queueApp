import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const Pagination = ({ props }) => {
  const { paginationHandler } = props;
  const { users } = useSelector((state) => state.users);
  // реализуем пагинацию
  const pageLimit = 10;
  const totalPages = Math.ceil(users.length / pageLimit);

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const [pageCount, setPageCount] = useState(pages || []);
  const [currentPage, setCurrentPage] = useState("1");

  const setActivePage = (e) => {
    if (e) {
      setCurrentPage(e.target.innerText);
    }
  };
  const decrementCurrentPage = () => {
    if (currentPage == 1) {
      setCurrentPage(1);
      return;
    }

    setCurrentPage(currentPage - 1);
  };

  const incrementCurrentPage = () => {
    if (currentPage == totalPages) {
      setCurrentPage(totalPages);
      return;
    }

    setCurrentPage(+currentPage + 1);
  };

  useEffect(() => {
    paginationHandler(currentPage, pageLimit);
  }, [currentPage]);

  return (
    <div>
      <ul className="pagination">
        <li
          className={currentPage == 1 ? "disabled" : ""}
          onClick={decrementCurrentPage}
        >
          <a href="#!">
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
        {pageCount.length > 0
          ? pageCount.map((value, index) => {
              return (
                <li
                  className={currentPage == index + 1 ? "active" : ""}
                  key={index}
                  onClick={setActivePage}
                >
                  <a href="#!">{value}</a>
                </li>
              );
            })
          : null}
        <li
          className={currentPage == totalPages ? "disabled" : ""}
          onClick={incrementCurrentPage}
        >
          <a href="#!" onClick={incrementCurrentPage}>
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
  );
};
