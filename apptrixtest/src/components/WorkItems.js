import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getWorkItemsFromApi } from "../store/actions/tasks";

export const WorkItems = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { workItems, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getWorkItemsFromApi(params.issueId));
  }, [dispatch]);

  return (
    <div className="container">
      <h3>List of workItems</h3>
      <div className="row">
        <div className="col s12 m12 l12 xl12">
          <table>
            <thead>
              <tr>
                <th>UserName</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
