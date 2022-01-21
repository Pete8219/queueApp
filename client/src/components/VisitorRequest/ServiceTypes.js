import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTypeToRequest } from "../../store/actions/request";
import { getCurrentType } from "../../store/actions/serviceTypes";

export const ServiceTypes = () => {
  const dispatch = useDispatch();
  const { types } = useSelector((state) => state.types);

  const [selectedType, setSelectedType] = useState(null);

  const changeHandler = (id) => {
    setSelectedType(id);
    dispatch(getCurrentType(id));
    dispatch(addTypeToRequest(id));
  };

  return (
    <div className="row">
      <div className="col s12 m6 l6 xl6">
        <form action="#">
          {types.length
            ? types.map((type) => {
                return (
                  <p key={type._id}>
                    <label>
                      <input
                        name="types"
                        type="radio"
                        className="with-gap"
                        onChange={() => changeHandler(type._id)}
                      />
                      <span>{type.title}</span>
                    </label>
                  </p>
                );
              })
            : null}
        </form>
      </div>
    </div>
  );
};
