import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SiteHeader from "./components/header/site-header"
import SiteFooter from "./components/footer/site-footer"
import Join from "./pages/Join"
import HomePage from "./pages/HomePage"
import ContactUs from "./pages/ContactUs"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminSubmissions from "./pages/admin/AdminDashboard"
import AdminSubmissionDetail from "./pages/admin/AdminSubmissionDetail"
import AdminLocations from "./pages/admin/AdminLocations"
import AdminContent from "./pages/admin/AdminContent"
import AdminUsers from "./pages/admin/AdminUsers"
import Whatsapp from "./components/Whatsapp/Whatsapp"
import React from "react"

function App() {
  return (
    <Router>
      <Whatsapp/>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Conditionally render header and footer except for admin routes */}
        <Routes>
          <Route path="/sariadmin/*" element={null} />
          <Route path="*" element={<SiteHeader />} />
        </Routes>

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<Join />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Admin routes */}
          <Route path="/sariadmin/login" element={<AdminLogin />} />
          <Route path="/sariadmin/dashboard" element={<AdminDashboard />} />
          <Route path="/sariadmin/submissions" element={<AdminSubmissions />} />
          <Route path="/sariadmin/submissions/:id" element={<AdminSubmissionDetail />} />
          <Route path="/sariadmin/locations" element={<AdminLocations />} />
          <Route path="/sariadmin/content" element={<AdminContent />} />
          <Route path="/sariadmin/users" element={<AdminUsers />} />
        </Routes>

        <Routes>
          <Route path="/sariadmin/*" element={null} />
          <Route path="*" element={<SiteFooter />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
