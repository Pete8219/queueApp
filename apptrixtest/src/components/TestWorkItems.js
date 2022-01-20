import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestWorkItemsFromApi } from "../store/actions/tasks";
import { Loader } from "./Loader";

export const TestWorkItems = () => {
  const dispatch = useDispatch();
  const { workItems, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTestWorkItemsFromApi());
  }, [dispatch]);

  const timeConvert = (duration) => {
    let hours = Math.floor(duration / 60);

    let minutes = duration - hours * 60;

    return `${hours} hours ${minutes} minutes`;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <h3>List of workItems</h3>
      <div className="row">
        <div className="col s12 m12 l12 xl12">
          <table>
            <thead>
              <tr>
                <th>Text</th>
                <th>UserName</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {workItems.length
                ? workItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.text}</td>
                      <td>{item.creator.name}</td>
                      <td>{timeConvert(item.duration.minutes)}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
