import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  useGetSingleFilmQuery,
  useUpdateFilmMutation,
} from "../slices/filmApiSlice";

const EditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //   console.log("params", id);
  const {
    data,
    isLoading,
    isError: error,
    refetch,
  } = useGetSingleFilmQuery(id);
  const [updateFilm, { isLoading: loading, isError }] = useUpdateFilmMutation();
  const [viewImage, setViewImage] = useState(null);
  // console.log("data", data);
  const [formData, setFormData] = useState({
    name: data?.name ?? "",
    description: data?.description ?? "",
    genre: data?.genre ?? "",
    releaseYear: data?.releaseYear ?? "",
    image: data?.image ?? null,
  });
  // console.log("viewImage", viewImage);
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        description: data.description || "",
        genre: data.genre || "",
        releaseYear: data.releaseYear || "",
        image: data.image || null,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files[0];
    // console.log("file", file);
    const imageUrl = URL.createObjectURL(file);
    // console.log("imageUrl", imageUrl);
    setViewImage(imageUrl);
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMovieData = new FormData();
    updatedMovieData.append("name", formData.name);
    updatedMovieData.append("description", formData.description);
    updatedMovieData.append("genre", formData.genre);
    updatedMovieData.append("releaseYear", formData.releaseYear);
    // updatedMovieData.append("image", formData.image);
    // // console.log("formDataInsideFunction", formData);
    // try {
    //   await updateFilm({
    //     id,
    //     data: formData,
    //   }).unwrap();
    //   refetch();
    //   alert("Updated");
    // } catch (error) {
    //   console.log("error", error);
    //   alert(error);
    // }
    if (formData.image && formData.image instanceof File) {
      updatedMovieData.append("image", formData.image);
    }
    // console.log("formDataInsideFunction", formData);
    try {
      await updateFilm({
        id,
        data: updatedMovieData,
      }).unwrap();
      refetch();
      toast.success("Updated");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.message ?? error?.data?.message);
    }
  };

  if (isLoading ?? loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error ?? isError)
    return (
      <div>
        <Message variant={"danger"}>{error?.message}</Message>
      </div>
    );
  return (
    <Container style={{ width: "60%" }}>
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
          {viewImage ? (
            <Image src={viewImage} height={200} width={200} className="m-4" />
          ) : (
            <Image src={data?.image} width={200} height={200} className="m-4" />
          )}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="mt-4"
          disabled={isLoading}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default EditScreen;
