// Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequestRiderPage from '../pages/RequestRiderPage';



const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/request-rider" element={<RequestRiderPage />} />
        

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
