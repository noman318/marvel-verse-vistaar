import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteMovieMutation,
  useGetSingleFilmQuery,
} from "../slices/filmApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const MovieScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //   console.log("params", id);
  const { data, isLoading, isError: error } = useGetSingleFilmQuery(id);
  //   console.log("data", data);
  const [deleteMovie, { isLoading: loading }] = useDeleteMovieMutation();
  const handleDeleteMovie = async () => {
    // console.log("clicked");
    try {
      await deleteMovie(id).unwrap();
      toast.success("Deleted");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <React.Fragment>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message ?? error?.error}
        </Message>
      ) : (
        <Row>
          <Col md={7}>
            <Image
              src={data?.image}
              alt={data?.name}
              fluid
              className="rounded shadow"
            />
          </Col>
          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{data?.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>Description: {data?.description}</h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>Genre: {data?.genre}</h6>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup
              variant="flush"
              className="d-flex flex-row justify-content-center align-items-center gap-2"
            >
              <Button
                variant="secondary"
                onClick={() => navigate(`/edit/${id}`)}
              >
                <FaEdit className="mx-3" />
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteMovie}
                disabled={loading}
              >
                <FaTrash color="white" className="mx-3" />
              </Button>
            </ListGroup>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

export default MovieScreen;
