import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; //This is required for react bootstrap CSS styling
import { useDispatch } from "react-redux"; //this allows us to dispatch an action
import { getPosts } from "./actions/posts";
import Map from "./components/Map/Map";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Profile from "./components/Profile/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Account from "./components/Account/Account";
const App = () => {
  const [currentId] = useState(0);
  const dispatch = useDispatch(); //this is the hook

  useEffect(() => {
    dispatch(getPosts()); //dispatches the getpost action
  }, [currentId, dispatch]);

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
