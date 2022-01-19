import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import { filterByProject } from "../store/actions/tasks";

export const FilterProjects = () => {
  const dispatch = useDispatch();
  const { tasks, task, isLoading } = useSelector((state) => state.tasks);

  const [value, setValue] = useState("All Projects");

  let projects = new Set();
  tasks.map((item) => projects.add(item.project.name));
  let filter = [];
  for (let project of projects) {
    filter.push(project);
  }

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
  }, []);

  const changeHandler = (e) => {
    setValue(e.target.value);
    dispatch(filterByProject(e.target.value));
  };

  return (
    <div className="input-field col s12">
      <select value={value} onChange={changeHandler}>
        <option defaultValue={value}>All Projects</option>
        {filter.length > 0
          ? filter.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })
          : null}
      </select>
    </div>
  );
};
