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
      <Card className={classes.root} raised elevation={6}>
        <CardMedia className={classes.media1} title={name} image={image} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography className={classes.title} style={{ fontWeight: "bold" }} color="textSecondary" variant="h6">
              {name}
            </Typography>
            <Typography className={classes.title} color="textSecondary" variant="h6">
              {characterName}
            </Typography>
          </CardContent>
        </div>
      </Card>
    );
  } else {
    return (
      <>
        <Card className={classes.card} raised elevation={6}>
          <ButtonBase component="span" name="test" className={classes.cardAction} onClick={openMovie}>
            <CardMedia className={classes.media} image={image} title={movieName} />
            <CardContent>
              <Typography className={classes.title} style={{ textAlign: "center" }} color="textSecondary" variant="h5">
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
