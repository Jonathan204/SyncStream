import React, { useState, useEffect } from "react";
import { Container, AppBar, Grow, Grid } from "@material-ui/core";
import 'bootstrap/dist/css/bootstrap.min.css'; //This is required for react bootstrap CSS styling
import { useDispatch } from "react-redux"; //this allows us to dispatch an action
import { getPosts } from "./actions/posts";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import Account from "./components/Account/Account.js";
import Map from "./components/Map/Map";
import useStyles from "./styles";
import NavigationBar from "./components/NavigationBar/NavigationBar"
import { DisplayAccountContext } from "./components/Account/DisplayAccountContext";

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const [display, setDisplay] = useState(false);

  const dispatch = useDispatch(); //this is the hook
  const classes = useStyles();

  const displayWindow = () => { //display/hide the login window
    setDisplay((display) => !display);
  }

  const displayContextValue = {displayWindow};

  useEffect(() => {
    dispatch(getPosts()); //dispatches the getpost action
  }, [currentId, dispatch]);

  return (
    <DisplayAccountContext.Provider value={displayContextValue}>
    <Container maxwidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
      </AppBar>
      <NavigationBar />
      <Grow in>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            {display && <Account />}
          </Grid>
          <Map/>
        </Grid>
      </Grow>
    </Container>
    </DisplayAccountContext.Provider>
  );
};

export default App;
