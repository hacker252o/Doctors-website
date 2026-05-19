import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  Toaster,
} from "sonner";

import HomePage from "./pages/HomePage";

import AdminLoginPage from "./pages/AdminLoginPage";

import AdminDashboardPage from "./pages/AdminDashboardPage";

import "./index.css";

/* ---------- Protected Route ---------- */

function ProtectedRoute({
  children,
}) {

  const token =
    localStorage.getItem(
      "admin_token"
    );

  if (!token) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
}

/* ---------- App ---------- */

function App() {

  return (
    <BrowserRouter>

      {/* ---------- Toast ---------- */}

      <Toaster
        position="bottom-center"

        richColors

        toastOptions={{
          classNames: {
            toast: `
              rounded-2xl
              border
              border-ink-100
              bg-white
              text-ink-900
              shadow-soft
              font-sans
            `,

            description:
              "text-ink-500",

            success:
              "!bg-white",

            error:
              "!bg-white",
          },
        }}
      />

      {/* ---------- Routes ---------- */}

      <Routes>

        {/* ---------- Public ---------- */}

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/admin/login"
          element={
            <AdminLoginPage />
          }
        />

        {/* ---------- Protected ---------- */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ---------- Fallback ---------- */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;