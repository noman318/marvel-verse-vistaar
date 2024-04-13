import React from "react";
import { useGetAllFilmsQuery } from "../slices/filmApiSlice";
import Loader from "../components/Loader";
import { Button, Card } from "react-bootstrap";

const HomeScreen = () => {
  const { data, isLoading, isError } = useGetAllFilmsQuery();
  console.log("data", data);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <h1>Hero-Verse</h1>

          <h2>All movies here</h2>
          {data?.map((item) => (
            <div key={item?._id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item?.image} />
                <Card.Body>
                  <Card.Title>{item?.name}</Card.Title>
                  <Card.Text>{item?.description}</Card.Text>
                  <Card.Text>{item?.releaseYear}</Card.Text>

                  <Button variant="outline">{item?.genre}</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default HomeScreen;
