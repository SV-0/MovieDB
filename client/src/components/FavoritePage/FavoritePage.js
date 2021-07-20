import React, { useEffect, useState } from "react";
import { Typography, Table, IconButton, TableCell, TableRow, TableContainer, TableBody, TableHead, Paper, Button, Popover, Card, CardMedia } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IMAGE_BASE_URL, POSTER_SIZE } from "./../Config";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

function FavoritePage() {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let variable = { userFrom: localStorage.getItem("userId") };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    axios.post("/api/favorite/getFavoredMovie", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.favorites);
        setFavorites(response.data.favorites);
        setLoading(false);
      } else {
        alert("Failed to get movies");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
    };

    axios.post("/api/favorite/removeFromFavorite", variables).then((response) => {
      if (response.data.success) {
        fetchFavoredMovie();
      } else {
        alert("Failed to Remove From Favorite");
      }
    });
  };
  const openMovie = (movieId) => {
    history.push(`/movie/${movieId}`);
  };
  const renderCards = Favorites.map((favorite, index) => {
    return (
      <TableRow key={index}>
        <TableCell align="center" style={{ borderBottom: "none" }}>
          <Button style={{ textTransform: "none" }} onClick={() => openMovie(favorite.movieId)}>
            <Typography variant="subtitle1" component="h6" style={{ fontSize: "2vmin" }}>
              {favorite.movieTitle}
            </Typography>
          </Button>
        </TableCell>
        <TableCell align="center" style={{ borderBottom: "none" }}>
          <Typography variant="subtitle1" component="h6" style={{ fontSize: "2vmin" }}>
            {favorite.movieRunTime} mins
          </Typography>
        </TableCell>
        <TableCell align="center" style={{ borderBottom: "none" }}>
          <IconButton color="secondary" onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Typography variant="h4" component="h6" style={{ fontSize: "4vmin" }}>
        Favorite Movies
      </Typography>
      {!Loading && (
        <TableContainer component={Paper} style={{ boxShadow: "0 0 0 1px #000000", marginTop: "10px" }} elevation={0}>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6" component="h6" style={{ fontSize: "2.5vmin" }}>
                    Movies
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <Typography variant="h6" component="h6" style={{ fontSize: "2.5vmin" }}>
                    Run Time&nbsp;(mins)
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <Typography variant="h6" component="h6" style={{ fontSize: "2.5vmin" }}>
                    Remove
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderCards}</TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default FavoritePage;
