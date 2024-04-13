import express from "express";
import { configDotenv } from "dotenv";
import connectToDb from "./config/db.js";
import { ErrorHandler, NotFound } from "./middleware/ErrorHandler.js";
import movieRoutes from "./routes/film.route.js";
import path from "path";

configDotenv();

const app = express();
const PORT = process.env.PORT || 4000;
connectToDb();
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
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
