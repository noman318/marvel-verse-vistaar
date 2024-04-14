import express from "express";
import {
  createMovies,
  deleteMovie,
  getAllMovies,
  getMoviesById,
  updateMovie,
  getSearchResults,
  getAllGenre,
  getAllCharts,
} from "../controllers/filmController.js";
import upload from "../middleware/Upload.js";

const router = express.Router();

router.route("/").get(getAllMovies).post(upload.single("image"), createMovies);
router.route("/filter").get(getSearchResults);
router.route("/genre").get(getAllGenre);
router.route("/chart").get(getAllCharts);
router
  .route("/:id")
  .get(getMoviesById)
  .put(upload.single("image"), updateMovie)
  .delete(deleteMovie);
export default router;
