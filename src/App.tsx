import "./styles/global.css";
import Sidebar from "@/components/Sidebar/Sidebar"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UserDetailsPage from "./pages/userDetailsPage";
import PrivateRoute from "./components/Private-Route/PrivateRoute";
import UsersPage from "./pages/UserPage";
import { ThemeProvider } from "@/components/theme-provider"


export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router>
      <Routes>
        {/* Página de Login sem Sidebar */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas protegidas com Sidebar */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6">
                  <HomePage />
                </div>
              </div>
            }
          />
          <Route
            path="/users"
            element={
              <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6">
                  <UsersPage />
                </div>
              </div>
            }
          />
          <Route
            path="/user/:id"
            element={
              <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6">
                  <UserDetailsPage />
                </div>
              </div>
            }
          />
        </Route>
      </Routes>
      <Toaster />
    </Router>
    </ThemeProvider>
  );
}
