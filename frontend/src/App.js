import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import EditScreen from "./screens/EditScreen";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/view/:id" element={<MovieScreen />} />
              <Route path="/edit/:id" element={<EditScreen />} />
            </Routes>
          </Container>
        </main>
      </div>
    </Router>
  );
}

export default App;
