import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MdAddCircleOutline } from "react-icons/md";
import CustomModal from "../components/CustomModal";
import Loader from "../components/Loader";
import Message from "../components/Message";
import MovieCard from "../components/MovieCard";
import { useGetAllFilmsQuery } from "../slices/filmApiSlice";
const HomeScreen = () => {
  const { data, isLoading, isError, refetch } = useGetAllFilmsQuery();
  // console.log("data", data);
  const [show, setShow] = useState(false);

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
          <Button
            className="d-flex align-items-center gap-2 mb-4"
            style={{ float: "right" }}
            onClick={() => setShow(true)}
          >
            <MdAddCircleOutline />
            Add Movies
          </Button>

          <CustomModal show={show} setShow={setShow} fetch={refetch} />
          <Row className="mt-8" style={{ marginTop: "4.5rem" }}>
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
