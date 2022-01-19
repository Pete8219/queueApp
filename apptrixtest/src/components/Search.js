import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProjectsList,
  getProjectsFromApi,
  filterByProject,
} from "../store/actions/tasks";
import M from "materialize-css";

export const Search = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.tasks);

  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState([]);

  const data = new Set();

  projects.map((item) => data.add(item.project.name));
  let filterProjects = [];
  for (let d of data) {
    filterProjects.push(d);
  }

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
  });

  useEffect(() => {
    if (value.length < 3) {
      dispatch(clearProjectsList());
      setIsOpen(false);
    }
    if (value.length === Number(3)) {
      dispatch(getProjectsFromApi(value));
      setIsOpen(true);
    }
  }, [value]);

  const clickHandler = (e) => {
    setValue(e.target.innerText);
    dispatch(filterByProject(e.target.innerText));
    setIsOpen(false);
  };

  return (
    <>
      <form className="col s12">
        <div className="input-field col s12">
          <label htmlFor="project">Search</label>
          <input
            placeholder="Enter a Project Name"
            id="project"
            type="text"
            value={value}
            className="search__input"
            onChange={(e) => setValue(e.target.value)}
          />

          {isOpen && filterProjects.length ? (
            <ul className="search_list z-depth-1">
              {filterProjects.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="search_list__item"
                    onClick={clickHandler}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </form>
    </>
  );
};
