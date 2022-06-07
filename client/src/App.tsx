import React, { useEffect } from "react";
import "./App.css";
import { ColorsBoard } from "./components/ColorsBoard/ColorsBoard";
import { socketController } from "./api/SocketsController";


function App() {
  useEffect(() => {
    socketController.connect();
    return ()=>{
      socketController.disconnect()
    }
  },[])
  return (
    <>
      <h3>Favourite Colors</h3>
      <ColorsBoard />
    </>
  );
}

export default App;
