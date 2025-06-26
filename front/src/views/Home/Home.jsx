import styles from './Home.module.css';

import tarjetaDigital from '../../assets/imagen-myCard.webp';

function Home() {
  return (
    <div
      
  className={styles.homeContainer}
  style={{
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
<div className={styles.presentacion}>
  <div className={styles.textoPresentacion}>
    <h2>Bienvenido!</h2>
    <h3>Gestioná tu dinero de forma segura y fácil con <br /> nuestra banca digital</h3>
  </div>
   <img src={tarjetaDigital} alt="Presentación" className={styles.imagenPresentacion} />
</div>
    </div>
  );
}

export default Home;

