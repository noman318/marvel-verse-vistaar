import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import connectToDb from "./config/db.js";
import { ErrorHandler, NotFound } from "./middleware/ErrorHandler.js";
import movieRoutes from "./routes/film.route.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 4000;
connectToDb();
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,PATCH",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.send("test completed");
});

app.use("/movie", movieRoutes);

app.use(NotFound);
app.use(ErrorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
