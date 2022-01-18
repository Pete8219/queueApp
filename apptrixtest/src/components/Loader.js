import React from "react";

export const Loader = () => {
  return (
    <div className="container" style={{ display: "grid" }}>
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    </div>
  );
};
