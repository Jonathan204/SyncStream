import React, { useState, useEffect } from "react";
import { AppBar, Grow, Grid } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css"; //This is required for react bootstrap CSS styling
import { useDispatch } from "react-redux"; //this allows us to dispatch an action
import { getPosts } from "./actions/posts";
import Map from "./components/Map/Map";
import useStyles from "./styles";
import NavigationBar from "./components/NavigationBar/NavigationBar";

const App = () => {
  const [currentId] = useState(0);
  const dispatch = useDispatch(); //this is the hook
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts()); //dispatches the getpost action
  }, [currentId, dispatch]);

  return (
    <div>
      <AppBar
        className={classes.appBar}
        position="static"
        color="inherit"
      ></AppBar>
      <NavigationBar />
      <Grow in>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Map />
        </Grid>
      </Grow>
    </div>
  );
};

export default App;
