import React from "react";
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import Home from "./pages/home";
import AuthPage from "./pages/Authpage";
import DealerLayout from "./pages/DealerLayout";
import DealerDashboard from "./pages/DealerDashboard";
import Requests from "./pages/Request";
import Products from "./pages/Product";
import Profile from "./pages/Profile";
import DealerPublicProfile from "./pages/DealerPublicProfile";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
         <Route path="/DealerHome" element={<Navigate to="/dealer/dashboard" />} />

        <Route path="/dealer" element={<DealerLayout />}>
          <Route path="dashboard" element={<DealerDashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="products" element={<Products />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/dealer/:dealerId" element={<DealerPublicProfile />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
