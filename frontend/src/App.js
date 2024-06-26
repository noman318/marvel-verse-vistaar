import React from "react";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import EditScreen from "./screens/EditScreen";
import AnalyticsScreen from "./screens/AnalyticsScreen";

function App() {
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <Router>
        <div>
          <NavBar />
          <main>
            <Container>
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/view/:id" element={<MovieScreen />} />
                <Route path="/edit/:id" element={<EditScreen />} />
                <Route path="/create/" element={<EditScreen />} />
                <Route path="/analysis/" element={<AnalyticsScreen />} />
              </Routes>
            </Container>
          </main>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
