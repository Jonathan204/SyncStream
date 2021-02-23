import React from "react";
import { Button, Spinner } from "react-bootstrap";

const LoaderButton = ({ loading, className = "", ...props }) => {
  return (
    <Button className={className} disabled={loading} {...props}>
      {loading && <Spinner animation="border" size="sm" />}
      {props.children}
    </Button>
  );
};

export default LoaderButton;
