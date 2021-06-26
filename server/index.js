import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import commentRoutes from "./routes/comment.js";
import favoriteRoutes from "./routes/favorite.js";
import likeRoutes from "./routes/like.js";
import usersRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/users", usersRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/favorite", favoriteRoutes);

app.use("/uploads", express.static("uploads"));
// Set static folder
app.use(express.static("client/build"));

// index.html for all page routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const CONNECTION_URL = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.w3uy4.mongodb.net/Movies?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
