import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Toolbar,
  AppBar,
  CssBaseline,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    //display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  search: {
    width: "50%",
  },
  input: {
    //color: "black"
  },
  textfield: {
    borderRadius: "5px",
    margin: "2px",
    background: "white",
  },
  inputRoot: {
    color: "inherit",
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

interface Props {}

const MyAppBar: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container justify="center" alignItems="center">
                <Grid item>{/* <DrawerButton /> */}</Grid>
                <Grid item>
                  <Typography
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/")}
                    variant="h5"
                  >
                    XERO
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{ cursor: "pointer", marginLeft: 15 }}
                    onClick={() => history.push("/")}
                    variant="body1"
                  >
                    Product
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{ cursor: "pointer", marginLeft: 15 }}
                    onClick={() => history.push("/product/create")}
                    variant="body1"
                  >
                    Create
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{ cursor: "pointer", marginLeft: 15 }}
                    onClick={() => history.push("/product/search")}
                    variant="body1"
                  >
                    Search
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MyAppBar;
