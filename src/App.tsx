import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Analysis_Report from "./pages/Analysis_Report";
import NotReady from "./pages/error/NotReady";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/analysis" element={<NotReady/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
