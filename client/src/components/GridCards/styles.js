import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    maxWidth: "100%",
    postion: "absolute",
    paddingTop: "150%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  media1: {
    width: 125,
  },
  content: {
    padding: "16px 16px",
    flex: "1 0 auto",
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
  card1: {
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
  root: {
    display: "flex",
    height: 150,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "black",
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
