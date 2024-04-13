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
            style={{ height: "300px", objectFit: "cover" }}
          />
          <Card.Body style={{ color: "black" }}>
            <Card.Title as={"div"} className="product_title">
              Movie Name: {movie?.name}
            </Card.Title>
            <Card.Text>Description: {movie?.description}</Card.Text>
            <Card.Text>Year: {movie?.releaseYear}</Card.Text>
            <Card.Text>Genre: {movie?.genre}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default MovieCard;
