import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import Login from '@/pages/Auth/Login';
import StudentDashboard from '@/pages/Student/Dashboard';
import FacultyDashboard from '@/pages/Faculty/Dashboard';
import TPODashboard from '@/pages/TPO/Dashboard';
import AdminDashboard from '@/pages/Admin/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/tpo/dashboard" element={<TPODashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
