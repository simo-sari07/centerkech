import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SiteHeader from "./components/header/site-header"
import SiteFooter from "./components/footer/site-footer"
import JoinUs from "./pages/JoinUs" // Updated import path
import HomePage from "./pages/HomePage"
import React from "react"
import ContactUs from "./pages/ContactUs"
function App() {
  return (
    <Router>
      
      <div className="min-h-screen bg-white flex flex-col">
        
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<JoinUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <SiteFooter />
      </div>
    </Router>
  )
}

export default App

