import styles from "./AppointmentCard.module.css";

function AppointmentCard({ appointment }) {
  const { date, time, status } = appointment;

  return (
    <div className={styles.card}>
      <p>
        <strong>Date:</strong> {date}
      </p>
      <p>
        <strong>Time:</strong> {time}
      </p>
      <span className={`${styles[status]} ${styles.status}`}>{status}</span>
    </div>
  );
}

export default AppointmentCard;
