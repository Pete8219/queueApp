import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksFromApi } from "../store/actions/tasks";
import { FilterProjects } from "./FilterProjects";
import { Loader } from "./Loader";

export const Tasks = () => {
  const dispatch = useDispatch();
  const { filtered, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasksFromApi());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <h3>Tasks</h3>
      <div className="row">
        <div className="row col s12 m6 l5 xl6"></div>
        <div className="row col s12 m6 l5 xl6">
          <FilterProjects />
        </div>
      </div>
      <div className="row">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>SUMMARY</th>
              <th>PROJECT NAME</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.summary}</td>
                  <td>{item.project.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
