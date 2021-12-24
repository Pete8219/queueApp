import React from "react";

export const Employees = ({ props }) => {
  const { employees, addToSelectedEmp } = props;

  function sortByName(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Сотрудники</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0
            ? employees.sort(sortByName("name")).map((employee) => {
                return (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>
                      <button
                        className="btn btn-flat"
                        style={{ backgroundColor: "transparent" }}
                        onClick={() => addToSelectedEmp(employee._id)}
                      >
                        <i
                          className="material-icons"
                          style={{ color: "#129fcb" }}
                        >
                          forward
                        </i>
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </>
  );
};
