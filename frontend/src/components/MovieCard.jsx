import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div>
      <Link
        to={`/view/${movie?._id}`}
        style={{ textDecoration: "none" }}
        className="movie-card-link"
      >
        <Card className="my-3 p-3 rounded" style={{ height: "100%" }}>
          <Card.Img
            variant="top"
            src={movie?.image}
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Card.Body
            style={{
              color: "black",
              height: "70px",
              overflow: "hidden",
            }}
            className="m-0 p-0"
          >
            <Card.Title
              as={"div"}
              className="product_title m-0 text-align-left"
            >
              <strong>{movie?.name}</strong>
            </Card.Title>

            <Card.Text className="text-secondary pl-3 m-0">
              <strong>{movie?.releaseYear}</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default MovieCard;
