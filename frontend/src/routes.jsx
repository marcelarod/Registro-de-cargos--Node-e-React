import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./pages/home";

import Register from "./pages/register";
import Positions from "./pages/positions";
import Employee from "./pages/employees";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/register" exact element={<Register/>} />
                <Route path="/positions" exact element={<Positions/>} />
                <Route path="/employee" exact element={<Employee/>} />

            </Routes>
        </BrowserRouter>
    );
}