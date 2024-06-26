import Film from "../models/film.model.js";

const getAllMovies = async (req, res, next) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 4;
  try {
    const count = await Film.countDocuments();
    const movies = await Film.find({})
      .select("-__v")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    if (movies.length === 0) {
      return res.status(404).send("No Movies Found");
    } else {
      return res.json({ movies, page, pages: Math.ceil(count / pageSize) });
    }
  } catch (error) {
    console.log("error while getting all movies", error);
    next(error);
  }
};

const getAllGenre = async (req, res, next) => {
  try {
    const movies = await Film.distinct("genre");
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

const getSearchResults = async (req, res, next) => {
  try {
    const { genre, releaseYear, keyword } = req.query;
    let { page } = req.query;
    const pageSize = 4;
    page = Number(page) || 1;
    const filter = {};

    if (!genre && !releaseYear && !keyword) {
      return res.status(200).send([]);
    }
    if (genre) {
      filter.genre = genre;
    }
    if (releaseYear) {
      filter.releaseYear = releaseYear;
    }
    if (keyword) {
      filter.$or = [
        { name: { $regex: `^${keyword}`, $options: "i" } },
        { description: { $regex: `^${keyword}`, $options: "i" } },
      ];
    }

    const count = await Film.countDocuments(filter);

    const movies = await Film.find(filter)
      .select("-__v")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    if (movies.length === 0) {
      return res.status(404).send("No Movies Found");
    } else {
      return res.json({ movies, page, pages: Math.ceil(count / pageSize) });
    }
  } catch (error) {
    console.log("error while getting all movies", error);
    next(error);
  }
};

// const getAllCharts = async (req, res, next) => {
//   try {
//     const movieData = await Film.aggregate([
//       {
//         $group: {
//           _id: { year: "$releaseYear", genre: "$genre" },
//           count: { $sum: 1 },
//         },
//       },
//     ]);
//     console.log("movieData", movieData);
//     res.json(movieData);
//   } catch (error) {
//     console.log("error while getting all movies", error);
//     next(error);
//   }
// };

const getAllCharts = async (req, res, next) => {
  try {
    const movies = await Film.find({}).select("-__v");
    if (movies.length === 0) {
      return res.status(404).send("No Movies Found");
    } else {
      return res.json(movies);
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

  // Check if req.file is undefined or any of its properties are undefined
  if (!req.file || !req.file.destination || !req.file.filename) {
    return res.status(400).json({ error: "File information is missing" });
  }

  const filePath = `/${req.file.destination}${req.file.filename}`;
  // console.log("filePath", filePath);

  try {
    const movie = new Film({
      name,
      image: filePath,
      description,
      genre,
      releaseYear,
    });

    const newMovie = await movie.save();
    res.status(201).send(newMovie);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { name, description, genre, releaseYear } = req.body;

    const updateObject = {};
    if (name) updateObject.name = name;
    if (description) updateObject.description = description;
    if (genre) updateObject.genre = genre;
    if (releaseYear) updateObject.releaseYear = releaseYear;
    if (req.file)
      updateObject.image = `/${req.file.destination}${req.file.filename}`;

    const updatedMovie = await Film.findByIdAndUpdate(id, updateObject, {
      new: true,
    });

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

export {
  getAllMovies,
  getMoviesById,
  createMovies,
  updateMovie,
  deleteMovie,
  getSearchResults,
  getAllGenre,
  getAllCharts,
};
