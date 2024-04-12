import express from "express";
import {
  createMovies,
  deleteMovie,
  getAllMovies,
  getMoviesById,
  updateMovie,
} from "../controllers/filmController.js";
import upload from "../middleware/Upload.js";

const router = express.Router();

router.route("/").get(getAllMovies).post(upload.single("image"), createMovies);
router
  .route("/:id")
  .get(getMoviesById)
  .put(upload.single("image"), updateMovie)
  .delete(deleteMovie);
export default router;
