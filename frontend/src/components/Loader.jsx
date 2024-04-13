import { Spinner } from "react-bootstrap";
import React from "react";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="grow" />
    </div>
  );
};

export default Loader;
