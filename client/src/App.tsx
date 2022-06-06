import React from "react";
import { getColors } from "./api/requests";
import "./App.css";
import { ColorsBoard } from "./components/ColorsBoard/ColorsBoard";

function App() {
  return (
    <>
      <h3>Favourite Colors</h3>
      <ColorsBoard />
    </>
  );
}

export default App;
