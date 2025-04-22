import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AdminDashboard } from "./pages/dashboard";
import { SidebarProvider } from "./components/ui/sidebar";
import CategoriesPage from "./pages/CategoriesPage";
// import ServiceDetails from "./pages/ServiceDetails";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/services/:id"
            element={
              <ProtectedRoute>
                <ServiceDetails />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <AdminDashboard />
                </SidebarProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

// import Home from "./pages/Home";

// import type { Service } from "./lib/types";
// import { useNavigate } from "react-router-dom";
