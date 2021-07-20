import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import RightMenu from "./Sections/RightMenu";
import text from "./../../assets/text.png";
import useStyles from "./styles";
const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit" elevation={6} width="70%">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={text} alt="icon" height="45px" />
      </Link>
      <Toolbar className={classes.toolbar} variant="dense">
        <RightMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
