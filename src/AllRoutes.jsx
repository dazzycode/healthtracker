// src/AllRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import HealthForm from "./pages/HealthForm";
import Dashboard from "./pages/Dasboard";

const AllRoutes = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<HealthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </>
  );
};

export default AllRoutes;
