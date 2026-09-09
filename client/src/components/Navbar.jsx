import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">
          <span>ReWear</span>
        </Link>
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/marketplace">Browse Clothes</Link>
        </li>

        <li>
          <Link to="/swap-requests">Swap Requests</Link>
        </li>

        <li>
          <Link to="/chat">Chat</Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

      </ul>


      <div className="nav-buttons">

        {localStorage.getItem("token") ? (

          <button 
            className="login-btn" 
            onClick={handleLogout}
          >
            Logout
          </button>

        ) : (

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

        )}

      </div>


    </nav>
  );
}

export default Navbar;