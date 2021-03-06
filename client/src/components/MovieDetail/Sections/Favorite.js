import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Badge } from "@material-ui/core";
import { useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

function Favorite(props) {
  const user = useSelector((state) => state.user);

  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  const variables = {
    movieId: movieId,
    userFrom: userFrom,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime,
  };

  const onClickFavorite = () => {
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in first");
    }

    if (Favorited) {
      axios.post("/api/favorite/removeFromFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert("Failed to Remove From Favorite");
        }
      });
    } else {
      axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Failed to Add To Favorite");
        }
      });
    }
  };

  useEffect(() => {
    axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.subscribeNumber);
      } else {
        alert("Failed to get Favorite Number");
      }
    });

    axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.subcribed);
      } else {
        alert("Failed to get Favorite Information");
      }
    });
  }, []);

  return (
    <>
      <Button onClick={onClickFavorite}>
        <Badge badgeContent={FavoriteNumber}>{!Favorited ? <FavoriteBorderIcon fontSize="medium" color="secondary" /> : <FavoriteIcon fontSize="medium" color="secondary" />}</Badge>
      </Button>
    </>
  );
}

export default Favorite;
