import { useState } from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>BANCA</div>

      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`${styles.navLinks} ${open ? styles.active : ""}`}>
        <li><a href="#"> Home</a></li>
        <li><a href="#"> Turnos</a></li>
        <li><a href="#"> Register</a></li>
        <li><a href="#"> Login</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
