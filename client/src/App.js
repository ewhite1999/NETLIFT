import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import {
  LoginPage,
  RegisterPage,
  Create,
  ProgramsPage,
  History,
  Err404,
  Settings,
  WorkoutPage,
  CreateProgram
} from "./pages";

import { NavBar } from "./components";

const App = () => {
  let location = useLocation();

  return (
    <div data-testid="test-app" className="bg-nl-darkblue min-h-screen">
      <Routes>
        <Route path="*" element={<Err404 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create/*" element={<Create />} />
        <Route path="/" element={<ProgramsPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="/workouts" element={<WorkoutPage />} />
        <Route path="/create/workout" element={<CreateProgram />} />
      </Routes>

      {location.pathname === "/create" ||
      location.pathname === "/" ||
      location.pathname === "/history" ||
      location.pathname == "/settings" ||
      location.pathname === "/workouts" ? (
        <NavBar />
      ) : null}
    </div>
  );
};

export default App;
