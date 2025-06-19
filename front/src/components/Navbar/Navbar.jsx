import styles from "./Navbar.module.css"

function Navbar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>BANCA</h2>
      <nav>
        <ul className={styles.navLinks}>
          <li><a href="#">🏠 Home</a></li>
          <li><a href="#">📅 Turnos</a></li>
          <li><a href="#">📝 Register</a></li>
          <li><a href="#">🔐 Login</a></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Navbar;