import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard.js";
import Login from "./components/Login/Login.js";
import Signup from "./components/Login/Signup.js";
import { PrivateRoute } from "./middleware/PrivateRoute.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to TgvMaximator</h1>
        <div className="App-content">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route render={() => <Redirect to="/dashboard" />} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;