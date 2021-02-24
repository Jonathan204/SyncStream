import React from "react";
import { Container } from "react-bootstrap";
import React from "react";
import { AppBar, Grow, Grid } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css"; //This is required for react bootstrap CSS styling
import Map from "./components/Map/Map";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Profile from "./components/Profile/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Account from "./components/Account/Account";
const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Container>
              <Account />
            </Container>
          </Route>
          <Route path="/home">
            <NavigationBar />
            <Map />
          </Route>
          <Route path="/profile">
            <NavigationBar />
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
