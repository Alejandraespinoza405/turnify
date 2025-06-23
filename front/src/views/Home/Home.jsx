import tarjetaImg from '../../assets/tarjeta.jpg';
import historicoImg from '../../assets/imagen-transfer.avif';
import configImg from '../../assets/imagen-myCard.webp';
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Home.module.css";
import fondo from '../../assets/Imagen-ondas.png';
import MyAppointments from '../Home/MyAppointments/MyAppointments';

function Home() {
  return (
    <div className={styles.pageLayout}>
      <Navbar />
      <main
        className={styles.homeContainer}
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <h2 className={styles.titulo}>Bienvenido!</h2>
        <section className={styles.cards}>
  <div className={styles.card}>
    <img src={tarjetaImg} alt="Tarjeta" className={styles.cardImage} />
    <p>Tarjeta</p>
  </div>
  <div className={styles.card}>
    <img src={historicoImg} alt="Histórico" className={styles.cardImage} />
    <p>Histórico</p>
  </div>
  <div className={styles.card}>
    <img src={configImg} alt="Configuración" className={styles.cardImage} />
    <p>Configuración</p>
  </div>
</section>
<MyAppointments />
      </main>
       
    </div>
  );
}

export default Home;
