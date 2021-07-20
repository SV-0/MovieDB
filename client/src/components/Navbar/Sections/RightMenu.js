import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Menu, MenuItem, ListItem, ListItemIcon, ListItemText, Button, IconButton, Popper, Paper, Grow, ClickAwayListener } from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import { USER_SERVER } from "../../Config";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

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
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        setAnchorEl(null);
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
      </div>
    );
  } else if (user.userData && user.userData.isAuth) {
    return (
      <>
        <IconButton aria-controls="customized-menu" aria-haspopup="true" variant="contained" onClick={handleClick}>
          <AccountCircleIcon fontSize="medium" />
        </IconButton>
        <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            {user.userData.name && user.userData.name && <ListItemText primary={`${user.userData.name} ${user.userData.lastname}`} />}
          </MenuItem>
          <StyledMenuItem button component={Link} to="/favorite" onClose={handleClose}>
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="favorites" />
          </StyledMenuItem>
          <StyledMenuItem button onClick={logout}>
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="logout" />
          </StyledMenuItem>
        </StyledMenu>
      </>
    );
  } else {
    return <></>;
  }
}

export default withRouter(RightMenu);
