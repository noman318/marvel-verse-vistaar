import Film from "../models/film.model.js";

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Film.find({}).select("-__v");
    if (movies.length === 0) {
      return res.status(404).send("No Movies Found");
    } else {
      return res.send(movies);
    }
  } catch (error) {
    console.log("error while getting all movies", error);
    next(error);
  }
};

const getMoviesById = async (req, res, next) => {
  const { id } = req.params;
  // console.log("id", id);
  try {
    const movie = await Film.findById(id).select("-__v");

    if (!movie) {
      throw new Error("No Movie Found with tihis ID");
    }
    res.json(movie);
  } catch (error) {
    console.log("error while getting single movies", error);
    next(error);
  }
};

const createMovies = async (req, res, next) => {
  const { name, description, genre, releaseYear } = req.body;
  //   console.log("req.file.path", req.file.path);
  try {
    const movie = new Film({
      name,
      image: req.file.path,
      description,
      genre,
      releaseYear,
    });

    const newMovie = await movie.save();
    // console.log("newMovie", newMovie);
    res.status(201).send(newMovie);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, genre, releaseYear } = req.body;

  try {
    const updatedMovie = await Film.findByIdAndUpdate(
      id,
      {
        name,
        description,
        genre,
        releaseYear,
        image: req.file.path,
      },
      { new: true }
    );

    if (updatedMovie) {
      res.status(200).send(updatedMovie);
    } else {
      res.status(404).json({ error: "No Movie Found with this ID" });
    }
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  const { id } = req.params;
  try {
    const movieToDelete = await Film.findByIdAndDelete(id);
    if (movieToDelete) {
      res.status(200).json({ message: "Movie deleted successfully" });
    } else {
      res
        .status(404)
        .json({ error: "No Movie Found with this ID to be deleted" });
    }
  } catch (error) {
    next(error);
  }
};

export { getAllMovies, getMoviesById, createMovies, updateMovie, deleteMovie };
