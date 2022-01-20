import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksFromApi } from "../store/actions/tasks";
import { FilterProjects } from "./FilterProjects";
import { Loader } from "./Loader";
import { Search } from "./Search";
import { Link } from "react-router-dom";

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
        <div className="row col s12 m6 l5 xl6">
          <Search />
        </div>
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
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.summary}</td>
                  <td>{item.project.name}</td>
                  <td>
                    <Link to={`/tasks/${item.id}`}>
                      <button className="btn btn-small blue lighten-1">
                        Timesheets
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
