import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom"

function Navbar() {
  const [open, setOpen] = useState(false);

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
    <li><Link to={'/'}> Home</Link></li>
    <li><Link to={'/appointments'}> Turnos</Link></li>
    <li><Link to={'/register'}> Register</Link></li>
    <li><Link to={'/login'}> Login</Link></li>
  </ul>
</nav>

  );
}

export default Navbar;
