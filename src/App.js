import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import "./App.css";

import routes from "./routes";
function App() {
  const { uid, emailVerified } = useSelector((state) => state.firebase.auth);
  const loggedIn = uid ? true : null;
  const userId = useSelector((state) => state.firebase.auth.uid);

  useFirestoreConnect([
    {
      collection: "products",
      doc: userId,
    },
  ]);
  if (loggedIn && emailVerified) {
    return (
      <Switch>
        {routes.LoggedIn.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={(props) => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              }}
            />
          );
        })}
        <Redirect to="/" />
      </Switch>
    );
  } else if (loggedIn && !emailVerified) {
    return (
      <Switch>
        {routes.NotVerified.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={(props) => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              }}
            />
          );
        })}
        <Redirect to="/verify-email" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        {routes.NotLoggedIn.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={(props) => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              }}
            />
          );
        })}
        <Redirect to="/sign-in" />
      </Switch>
    );
  }
}

export default App;
