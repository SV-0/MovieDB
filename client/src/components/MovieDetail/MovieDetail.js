import React, { useEffect, useState } from "react";
import { Grid, Button, Container } from "@material-ui/core";
import axios from "axios";
import dotenv from "dotenv";

import Comments from "./Sections/Comments";
import LikeDislikes from "./Sections/LikeDislikes";
import { API_URL, IMAGE_BASE_URL, IMAGE_SIZE } from "../Config";
import GridCards from "../GridCards/GridCards";
import MainImage from "../LandingPage/Section/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import Favorite from "./Sections/Favorite";
import useStyles from "./styles";

dotenv.config();
const POSTER_SIZE = "w154";
function MovieDetailPage(props) {
  const classes = useStyles();
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);
  const movieVariable = {
    movieId: movieId,
  };

  useEffect(() => {
    let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    fetchDetailInfo(endpointForMovieInfo);

    axios.post("/api/comment/getComments", movieVariable).then((response) => {
      console.log(response);
      if (response.data.success) {
        console.log("response.data.comments", response.data.comments);
        setCommentLists(response.data.comments);
      } else {
        alert("Failed to get comments Info");
      }
    });
  }, [movieId]);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  const fetchDetailInfo = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setMovie(result);
        setLoadingForMovie(false);

        let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
        fetch(endpointForCasts)
          .then((result) => result.json())
          .then((result) => {
            console.log(result);
            setCasts(result.cast);
          });

        setLoadingForCasts(false);
      })
      .catch((error) => console.error("Error:", error));
  };
  console.log(Casts);
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };
  return (
    <div>
      {/* Header */}
      {!LoadingForMovie ? <MainImage image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`} title={Movie.title} text={Movie.overview} /> : <div>loading...</div>}
      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem("userId")} />
        </div>

        {/* Movie Info */}
        {!LoadingForMovie ? <MovieInfo movie={Movie} /> : <div>loading...</div>}

        <br />
        {/* Actors Grid*/}

        <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
          <Button onClick={toggleActorView}>Toggle Actor View </Button>
        </div>

        {ActorToggle && (
          <Container fullwidth="xl">
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {!LoadingForCasts ? (
                Casts.map(
                  (cast, index) =>
                    cast.profile_path && (
                      <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
                        <GridCards actor image={`${IMAGE_BASE_URL}${POSTER_SIZE}${cast.profile_path}`} name={cast.name} characterName={cast.character} />
                      </Grid>
                    )
                )
              ) : (
                <div>loading...</div>
              )}
            </Grid>
          </Container>
        )}
        <br />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <LikeDislikes video videoId={movieId} userId={localStorage.getItem("userId")} />
        </div>

        {/* Comments */}
        <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />
      </div>
    </div>
  );
}

export default MovieDetailPage;
