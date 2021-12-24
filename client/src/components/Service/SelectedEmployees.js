import React from "react";

export const SelectedEmployees = ({ props }) => {
  const { removeFromSelectedEmp, selectedEmp } = props;

  function sortByName(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Услуга закреплена за сотрудниками</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {selectedEmp.length
            ? selectedEmp.sort(sortByName("name")).map((emp) => {
                return (
                  <tr key={emp._id}>
                    <td>{emp.name}</td>
                    <td>
                      <button
                        className="btn btn-flat"
                        style={{ backgroundColor: "transparent" }}
                        onClick={() => removeFromSelectedEmp(emp._id)}
                      >
                        <i
                          className="material-icons"
                          style={{ color: "#129fcb" }}
                        >
                          cancel
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
