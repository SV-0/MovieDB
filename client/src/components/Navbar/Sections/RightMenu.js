import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Menu, MenuItem, ListItem, ListItemIcon, ListItemText, Button } from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { USER_SERVER } from "../../Config";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function RightMenu(props) {
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  console.log(user);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
        localStorage.clear();
      } else {
        alert("Log Out Failed");
      }
    });
  };
  if (user.userData && !user.userData.isAuth) {
    return (
      <div>
        <Button variant="contained" color="primary" component={Link} to="/login">
          Sign in
        </Button>

        {/* <Button aria-controls="customized-menu" aria-haspopup="true" variant="contained" color="primary" onClick={handleClick}>
          Sign in/up
        </Button>
        <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <StyledMenuItem>
            <ListItem button component={Link} to="/login">
              <ListItemIcon><SendIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Sign in" />
            </ListItem>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItem button component={Link} to="/register">
              <ListItemIcon><SendIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Sign up" />
            </ListItem>
          </StyledMenuItem>
        </StyledMenu> */}
      </div>
    );
  } else if (user.userData && user.userData.isAuth) {
    return (
      <div>
        <Button aria-controls="customized-menu" aria-haspopup="true" variant="contained" color="secondary" onClick={handleClick}>
          Log out
        </Button>
        <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <StyledMenuItem>
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={`${user.userData.name}  ${user.userData.lastname}`}></ListItemText>
            </ListItem>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <InboxIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="logout" />
            </ListItem>
          </StyledMenuItem>
        </StyledMenu>
      </div>
    );
  } else {
    return <></>;
  }
}

export default withRouter(RightMenu);
