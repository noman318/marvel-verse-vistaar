import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { MdAddCircleOutline } from "react-icons/md";
import CustomModal from "../components/CustomModal";
import Loader from "../components/Loader";
import Message from "../components/Message";
import MovieCard from "../components/MovieCard";
import {
  useGetAllFilmsQuery,
  useGetAllGenresQuery,
  useSearchDetailsQuery,
} from "../slices/filmApiSlice";
const HomeScreen = () => {
  const { data, isLoading, isError, refetch } = useGetAllFilmsQuery();
  const { data: allGenres } = useGetAllGenresQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchString, setDebouncedSearchString] = useState("");

  const [genreString, setGenreString] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchString(searchTerm);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);
  const [show, setShow] = useState(false);
  const { data: searchResults, isLoading: searchLoading } =
    useSearchDetailsQuery({
      keyword: debouncedSearchString,
      genre: genreString,
    });
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
          <div className="d-flex mb-4 gap-3">
            <Form.Control
              type="text"
              placeholder="Search"
              name="name"
              className="w-60"
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "60%" }}
            />

            <Form.Select
              aria-label="Filter"
              style={{ width: "20%" }}
              onChange={(e) => setGenreString(e.target.value)}
            >
              <option>Filter Movies</option>
              <option value={""}>{"All"}</option>
              {allGenres?.map((item, index) => (
                <React.Fragment key={index}>
                  <option value={item}>{item}</option>
                </React.Fragment>
              ))}
            </Form.Select>
          </div>
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
            {/* {data?.map((item) => (
              <Col key={item?._id} sm={12} md={6} lg={4} xl={3}>
                <MovieCard movie={item} />
              </Col>
            ))} */}
            {searchResults && searchResults.length > 0 && !searchLoading
              ? searchResults.map((item) => (
                  <Col key={item?._id} sm={12} md={6} lg={4} xl={3}>
                    <MovieCard movie={item} />
                  </Col>
                ))
              : // Render all cards if search results are not available
                data?.map((item) => (
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
