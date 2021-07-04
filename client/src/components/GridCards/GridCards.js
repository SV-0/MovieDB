import React from "react";
import { Card, Grid, Typography, CardContent, CardMedia, ButtonBase } from "@material-ui/core";
import { IMAGE_BASE_URL } from "../Config";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";

function GridCards(props) {
  const history = useHistory();
  const classes = useStyles();
  let { actor, key, image, movieId, movieName, characterName } = props;
  const POSTER_SIZE = "w154";

  const openMovie = (e) => {
    history.push(`/movie/${movieId}`);
  };

  if (actor) {
    // return (
    //   <Col key={key} lg={6} md={8} xs={24}>
    //     <div style={{ position: "relative" }}>
    //       <img style={{ width: "100%", height: "1rem" }} alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
    //     </div>
    //   </Col>
    // );
  } else {
    return (
      <>
        <Card className={classes.card} raised elevation={6}>
          <ButtonBase component="span" name="test" className={classes.cardAction} onClick={openMovie}>
            <CardMedia className={classes.media} image={image} title={movieName} />
            <CardContent>
              <Typography className={classes.title} color="textSecondary" variant="h5" component="h2">
                {movieName}
              </Typography>
            </CardContent>
          </ButtonBase>
        </Card>
      </>
    );
  }
}

export default GridCards;
