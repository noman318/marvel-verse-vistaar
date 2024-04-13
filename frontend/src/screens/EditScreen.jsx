import React, { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetSingleFilmQuery } from "../slices/filmApiSlice";

const EditScreen = () => {
  const { id } = useParams();
  //   console.log("params", id);
  const { data, isLoading, isError: error } = useGetSingleFilmQuery(id);

  const [formData, setFormData] = useState({
    name: data?.name ?? "",
    description: data?.description ?? "",
    genre: data?.genre ?? "",
    releaseYear: data?.releaseYear ?? "",
    image: data?.image ?? null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e?.target?.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMovieData = new FormData();
    updatedMovieData.append("name", formData.name);
    updatedMovieData.append("description", formData.description);
    updatedMovieData.append("genre", formData.genre);
    updatedMovieData.append("releaseYear", formData.releaseYear);
    updatedMovieData.append("image", formData.image);

    // Make API call to update movie data
    // Example:
    // updateMovie(id, updatedMovieData)
    //   .then((response) => {
    //     // Handle success
    //   })
    //   .catch((error) => {
    //     // Handle error
    //   });
  };
  console.log("data", data);
  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error)
    return (
      <div>
        <Message variant={"danger"}>{error?.message}</Message>
      </div>
    );
  return (
    <div>
      <h1>Edit Movie: {data?.name}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData?.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formGenre">
          <Form.Label>Genre:</Form.Label>
          <Form.Control
            type="text"
            name="genre"
            value={formData?.genre}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formReleaseYear">
          <Form.Label>Release Year:</Form.Label>
          <Form.Control
            type="text"
            name="releaseYear"
            value={formData?.releaseYear}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Image:</Form.Label>
          <Form.Control
            type="file"
            accept=".png, .jpg, .jpeg, .webp"
            onChange={handleFileChange}
          />
          <Image src={data?.image} width={200} height={200} className="m-2" />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditScreen;
