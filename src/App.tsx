import React from "react"
import { Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Client  from "./pages/Client";
import "./scss/app.scss";



const App: React.FC = () => {
  
  return <Routes>
    <Route path="" element={<Auth/>} />
    <Route path="" element={<Client/>} />
    <Route path="*" element={<div>Страница не найдена!</div>} />
  </Routes>;
}

export default App;
