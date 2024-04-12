import mongoose from "mongoose";

const filmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: String,
    required: true,
  },
});

const Film = mongoose.model("Film", filmSchema);

export default Film;
