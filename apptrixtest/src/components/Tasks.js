import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksFromApi } from "../store/actions/tasks";
import { Loader } from "./Loader";

export const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.tasks);

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
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>SUMMARY</th>
              <th>PROJECT NAME</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item) => {
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
