import React from "react";
import { AppBar, Grow, Grid } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css"; //This is required for react bootstrap CSS styling
import Map from "./components/Map/Map";
import useStyles from "./styles";
import NavigationBar from "./components/NavigationBar/NavigationBar";

const App = () => {
  const classes = useStyles();

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
