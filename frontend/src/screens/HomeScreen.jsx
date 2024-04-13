import React from "react";
import { useGetAllFilmsQuery } from "../slices/filmApiSlice";
import Loader from "../components/Loader";
import { Col, Row } from "react-bootstrap";
import Message from "../components/Message";
import MovieCard from "../components/MovieCard";
const HomeScreen = () => {
  const { data, isLoading, isError } = useGetAllFilmsQuery();
  // console.log("data", data);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <>
          <Message variant={"danger"}>
            {isError?.data?.message ?? isError?.error}
          </Message>
        </>
      ) : (
        <React.Fragment>
          <h2>All movies here</h2>
          <Row>
            {data?.map((item) => (
              <Col key={item?._id} sm={12} md={6} lg={4} xl={3}>
                <MovieCard movie={item} />
              </Col>
            ))}
          </Row>
        </React.Fragment>
      )}
    </div>
  );
};

export default HomeScreen;
