import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      navigate("/home");
    }, 5000);

    return () => clearInterval(countdownInterval);
  }, [navigate]);

  return (
    <div className={styles.errorWrapper}>
      <img
        src="/404.jpeg"
        alt="Página no encontrada"
        className={styles.errorImage}
      />
      <h2 className={styles.errorTitle}>Página no encontrada</h2>
      <p className={styles.errorText}>Redirigiendo a Home en {countdown} segundos...</p>
    </div>
  );
}

export default PageNotFound;
