import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/:id' element={<App />} />
        <Route
          path='/'
          element={
            <>
              <App />
              <Navigate to={`${Date.now().toString(16)}`} replace />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
