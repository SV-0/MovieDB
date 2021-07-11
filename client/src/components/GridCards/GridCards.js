import React from "react";
import { Card, Typography, CardContent, CardMedia, ButtonBase } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";

function GridCards(props) {
  const history = useHistory();
  const classes = useStyles();
  let { actor, image, movieId, movieName, name, characterName } = props;
  const openMovie = (e) => {
    history.push(`/movie/${movieId}`);
  };

  if (actor) {
    return (
      <Card className={classes.card} raised elevation={6}>
        <CardMedia className={classes.media} style={{ paddingTop: "110%" }} title={name} image={image} />
        <CardContent>
          <Typography className={classes.title} color="textSecondary" variant="h6">
            {name}
          </Typography>
          <Typography className={classes.title} color="textSecondary" variant="h6">
            as
          </Typography>
          <Typography className={classes.title} color="textSecondary" variant="h6">
            {characterName}
          </Typography>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <>
        <Card className={classes.card} raised elevation={6}>
          <ButtonBase component="span" name="test" className={classes.cardAction} onClick={openMovie}>
            <CardMedia className={classes.media} image={image} title={movieName} />
            <CardContent>
              <Typography className={classes.title} color="textSecondary" variant="h5">
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
