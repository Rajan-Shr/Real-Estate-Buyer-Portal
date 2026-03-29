import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "@/pages/Auth/Login.jsx"
import Register from "@/pages/Auth/Register.jsx"
import Dashboard from "@/pages/Dashboard.jsx"
import { Toaster } from "sonner";

function App() {
  return (
    <>
    <Toaster position="top-right"
        expand={true}   // 🔥 THIS FIXES STACKING UI
        richColors
         />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
