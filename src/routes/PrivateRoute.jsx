import React from "react";
import { Route, Link, useLocation } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = true; // Replace with your authentication logic
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? (
          <Component />
        ) : (
          <Link to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
