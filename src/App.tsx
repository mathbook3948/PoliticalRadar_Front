import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Analysis_Report from "./pages/Analysis_Report";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminOnly from "./pages/admin/AdminOnly";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/analysis" element={<Analysis_Report/>}/>
                    <Route path="/admin/login" element={<AdminLogin/>}/>
                    <Route path="/admin/dashboard" element={
                        <AdminOnly>
                            <AdminDashboard/>
                        </AdminOnly>
                    }/>
                </Routes>
                <Analytics/>
                <SpeedInsights/>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;