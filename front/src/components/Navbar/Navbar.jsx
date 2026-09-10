import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
  setOpen(false);
  localStorage.removeItem("user");
  navigate("/login");
};

  const handleNavClick = () => {
  setOpen(false);
};

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/nuevoBanca.png" alt="Logo Banca" className={styles.logoImage} />
      </div>

      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`${styles.navLinks} ${open ? styles.active : ""}`}>
        <li><Link to="/" onClick={handleNavClick}>Home</Link></li>
        {user && (
    <>

        <li><Link to="/appointments/new" onClick={handleNavClick}>Solicitar turno</Link></li>
        <li><Link to="/appointments" onClick={handleNavClick}>Mis turnos</Link></li>  
         </>
  )}
        {!user && (
          <>
            <li><Link to="/register" onClick={handleNavClick}>Register</Link></li>
            <li><Link to="/login" onClick={handleNavClick}>Login</Link></li>
          </>
        )}

        {user && (
          <li>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Cerrar sesión
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
