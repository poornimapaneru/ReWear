import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Marketplace from "../pages/Marketplace";
import ItemDetails from "../pages/ItemDetails";
import SwapRequests from "../pages/SwapRequests";
import Chat from "../pages/Chat";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import NotFound from "../pages/NotFound";
import AddClothing from "../pages/AddClothing";
import EditClothing from "../pages/EditClothing";
import Profile from "../pages/Profile";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/marketplace" element={<Marketplace />} />

        <Route
          path="/item/:id"
          element={<ItemDetails />}
        />

        <Route
          path="/swap-requests"
          element={
            <ProtectedRoute>
              <SwapRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:swapRequestId"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-clothing"
          element={
            <ProtectedRoute>
              <AddClothing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-clothing/:id"
          element={
            <ProtectedRoute>
              <EditClothing />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={<AdminRoute><AdminDashboard /></AdminRoute>}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;