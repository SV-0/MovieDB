import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    maxWidth: "100%",
    maxHeight: "100px",
    postion: "absolute",
    paddingTop: "150%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "5px",
    height: "100%",
    position: "relative",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  title: {
    textAlign: "center",
    color: "black",
    justifyContent: "center",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
    color: "inherit",
  },
});
