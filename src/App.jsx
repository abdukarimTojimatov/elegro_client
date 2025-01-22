import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ExpencesPage from "./pages/ExpencePage";
import NotFoundPage from "./pages/NotFoundPage";

import IncomesPage from "./pages/IncomesPage";
import OrdersPage from "./pages/OrdersPage";
import OneOrderPage from "./pages/OneOrderPage";

import Header from "./components/ui/Header";
import Navbar from "./components/Navbar";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

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
          element={data?.authUser ? <ExpencesPage /> : <Navigate to="/login" />}
        />
        {/* <Route
          path="/expenses"
          element={data?.authUser ? <ExpensesPage /> : <Navigate to="/login" />}
        /> */}
        {/* <Route
          path="/incomes"
          element={data?.authUser ? <IncomesPage /> : <Navigate to="/login" />}
        /> */}
        <Route
          path="/orders"
          element={data?.authUser ? <OrdersPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders/:id"
          element={data?.authUser ? <OneOrderPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
