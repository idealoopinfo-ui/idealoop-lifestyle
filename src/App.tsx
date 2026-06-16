import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
