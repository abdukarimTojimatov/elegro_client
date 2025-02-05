import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ExpensePage from "./pages/ExpensePage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import OrdersPage from "./pages/OrdersPage";
import OrderEditPage from "./pages/OrderEditPage";
import Header from "./components/ui/Header";
import Navbar from "./components/Navbar";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";
import SharingPage from "./pages/SharingPage";
import SharingEditPage from "./pages/SharingEditPage";

function App() {
  const { loading, data } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return null;

  return (
    <>
      {data?.authUser && (
        <>
          <Header />
          <Navbar />
        </>
      )}
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!data?.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/expenses/:id"
          element={data?.authUser ? <ExpensePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/sharings"
          element={data?.authUser ? <SharingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/sharings/:id"
          element={
            data?.authUser ? <SharingEditPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/orders"
          element={data?.authUser ? <OrdersPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders/create"
          element={
            data?.authUser ? <CreateOrderPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/orders/:id"
          element={
            data?.authUser ? <OrderEditPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
