import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage";
import HomePage from "./Pages/HomePage";
import ProtectedRoute from "./protectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
