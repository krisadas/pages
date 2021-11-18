import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const loading = "";

// Pages
const Login = React.lazy(() => import("./view/pages/login/Login"));
const Register = React.lazy(() => import("./view/pages/register/Register"));
const Home = React.lazy(() => import("./view/pages/home/Home"));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/home"
              name="Home Page"
              render={(props) => <Home {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
