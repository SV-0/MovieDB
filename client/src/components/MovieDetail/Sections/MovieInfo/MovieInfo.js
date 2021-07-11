import React from "react";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import useStyles from "./styles";

function MovieInfo(props) {
  const { movie } = props;
  const classes = useStyles();

  return (
    <Paper style={{ padding: "20px", borderRadius: "10px" }} elevation={6}>
      <div className={classes.section}>
        <Typography style={{ textAlign: "center", color: "black", justifyContent: "center" }} variant="h4" component="h4">
          {movie.title}
        </Typography>
        <Divider style={{ margin: "0px 20px" }} />
        <div className={classes.root}>
          <Grid container item xs={12} spacing={0}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "right", fontWeight: "bold" }} variant="h6" component="h6">
                  Release Date
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "left" }} variant="h6" component="h6">
                  {movie.release_date}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "right", fontWeight: "bold" }} variant="h6" component="h6">
                  Revenue
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "left" }} variant="h6" component="h6">
                  {movie.revenue}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "right", fontWeight: "bold" }} variant="h6" component="h6">
                  Runtime
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "left" }} variant="h6" component="h6">
                  {movie.runtime}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "right", fontWeight: "bold" }} variant="h6" component="h6">
                  Rating
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "left" }} variant="h6" component="h6">
                  {movie.vote_average}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "right", fontWeight: "bold" }} variant="h6" component="h6">
                  Popularity
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "left" }} variant="h6" component="h6">
                  {movie.popularity}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "right", fontWeight: "bold" }} variant="h6" component="h6">
                  Status
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "left" }} variant="h6" component="h6">
                  {movie.status}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "right", fontWeight: "bold" }} variant="h6" component="h6">
                  Vote Count
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} style={{ textAlign: "left" }} variant="h6" component="h6">
                  {movie.vote_count}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </Paper>
  );
}

export default MovieInfo;
