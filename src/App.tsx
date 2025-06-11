import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import LeaveDetails from './pages/LeaveDetails';
import ApprovalPage from './pages/ApprovalPage';
import ApprovalStatus from './pages/ApprovalStatus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/employee/leave" replace />} />
        <Route path="/employee" element={<Navigate to="/employee/leave" replace />} />
        <Route path="/employee/leave" element={<EmployeeDashboard />} />
        <Route path="/employee/search" element={<EmployeeDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/manager/request/:id" element={<LeaveDetails />} />
        <Route path="/manager/approve/:id" element={<ApprovalPage />} />
        <Route path="/manager/status" element={<ApprovalStatus />} />
      </Routes>
    </Router>
  );
}

export default App;