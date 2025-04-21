import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ServiceDetails from "./pages/ServiceDetails";
import CategoriesPage from "./pages/CategoriesPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/service/:id"
            element={
              <ProtectedRoute>
                <ServiceDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/service-categories"
            element={
              // <ProtectedRoute>
                <CategoriesPage />
              // </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
