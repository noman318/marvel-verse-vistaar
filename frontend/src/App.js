import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
      </div>
    </Router>
  );
}

export default App;
