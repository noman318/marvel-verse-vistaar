import React, { useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { useCreateFilmMutation } from "../slices/filmApiSlice";
import { toast } from "react-toastify";

const CustomModal = ({ show, setShow, fetch }) => {
  const [viewImage, setViewImage] = useState(null);
  const [createMovie, { isLoading: loading, isError: error }] =
    useCreateFilmMutation();
  // console.log("data", data);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    genre: "",
    releaseYear: "",
    image: null,
  });
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
    const newMovieData = new FormData();
    newMovieData.append("name", formData.name);
    newMovieData.append("description", formData.description);
    newMovieData.append("genre", formData.genre);
    newMovieData.append("releaseYear", formData.releaseYear);
    if (formData.image && formData.image instanceof File) {
      newMovieData.append("image", formData.image);
    } //
    // console.log("formDataInsideFunction", formData);

    try {
      await createMovie(newMovieData).unwrap();
      toast.success("Movie Created");
      setShow(false);
      fetch();
    } catch (error) {
      console.log("error", error);
      toast.error(error?.message ?? error?.data?.error);
    }
  };
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Create Movie
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              as="textarea"
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
            {viewImage && (
              <Image src={viewImage} height={200} width={200} className="m-4" />
            )}
          </Form.Group>
          {error && (
            <>
              <p>Error while creating Movie</p>
            </>
          )}
          <Button
            variant="primary"
            type="submit"
            className="mt-2 ml-4"
            disabled={loading}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
