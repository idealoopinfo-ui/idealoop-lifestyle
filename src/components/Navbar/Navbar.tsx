import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  return (
    <header className="nav">
      <div className="logo">Idealoop</div>

      <nav className="links">
        <Link to="/">Home</Link>
        <Link to="/home">Home & Living</Link>
        <Link to="/clothing">Clothing</Link>
        <Link to="/beauty">Beauty</Link>
      </nav>

      <div className="actions">
        <input placeholder="Search products..." />
      </div>
    </header>
  );
}
