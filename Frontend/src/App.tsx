
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import StockOverview from './pages/StockOverview';
import StockDetail from './pages/StockDetail';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { ThemeProvider } from './context/ThemeContext';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [auth, setAuth] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/auth/verify', { withCredentials: true })
      .then(() => setAuth('authenticated'))
      .catch(() => setAuth('unauthenticated'));
  }, []);

  if (auth === 'loading') return <div className="text-center mt-10">Checking login...</div>;
  if (auth === 'unauthenticated') return <Navigate to="/login" />;

  return children;
};

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={<PrivateRoute><StockOverview /></PrivateRoute>}
        />
        <Route
          path="/stock/:id"
          element={<PrivateRoute><StockDetail /></PrivateRoute>}
        />
        <Route
          path="/portfolio"
          element={<PrivateRoute><Portfolio /></PrivateRoute>}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
