import React, { useEffect, useState, useRef } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import dotenv from "dotenv";

import { API_URL, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from "../Config";
import MainImage from "./Section/MainImage";
import GridCard from "../GridCards/GridCards";
import useStyles from "./styles";

dotenv.config();
function LandingPage() {
  const buttonRef = useRef(null);
  const classes = useStyles();

  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovies([...Movies, ...result.results]);
        setMainMovieImage(MainMovieImage || result.results[0]);
        setCurrentPage(result.page);
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  const loadMoreItems = () => {
    let endpoint = "";
    setLoading(true);
    console.log("CurrentPage", CurrentPage);
    endpoint = `${API_URL}movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${CurrentPage + 1}`;
    fetchMovies(endpoint);
  };

  const handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      // loadMoreItems()
      console.log("clicked");
    }
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {MainMovieImage && <MainImage image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`} title={MainMovieImage.title} text={MainMovieImage.overview} />}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Typography style={{ color: "black", textAlign: "center" }} variant="h3" component="h2">
          {" "}
          Latest Movies{" "}
        </Typography>
        <hr />
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {Movies &&
            Movies.map((movie, index) => (
              <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
                <GridCard image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : null} movieId={movie.id} movieName={movie.title} />
              </Grid>
            ))}
        </Grid>

        {Loading && <div>Loading...</div>}

        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button>
            <div ref={buttonRef} className="loadMore" onClick={loadMoreItems}>
              Load More
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
