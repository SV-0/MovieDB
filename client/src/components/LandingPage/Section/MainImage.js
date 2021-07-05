import React from "react";
import { Typography } from "@material-ui/core";

function MainImage(props) {
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
            url('${props.image}'), #1c1c1c`,
        height: "500px",
        backgroundSize: "100%, cover",
        backgroundPosition: "center, center",
        width: "100%",
        position: "relative",
      }}
    >
      <div>
        <div style={{ position: "absolute", maxWidth: "500px", bottom: "2rem", marginLeft: "2rem" }}>
          <Typography style={{ color: "white" }} variant="h3">
            {" "}
            {props.title}{" "}
          </Typography>
          <Typography style={{ color: "white", fontSize: "1rem" }} variant="h5">
            {props.text}{" "}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
