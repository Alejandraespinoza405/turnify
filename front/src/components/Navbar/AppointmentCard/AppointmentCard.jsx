import styles from "./AppointmentCard.module.css";
import axios from "axios";

function AppointmentCard({ appointment, onCancel }) {
  const { id, date, time, status } = appointment;

  const handleCancel = async () => {
  try {
    const [year, month, day] = date.split("-").map(Number);
    const appointmentDate = new Date(year, month - 1, day);

    const currentDate = new Date();   

    appointmentDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (appointmentDate <= currentDate) {
      alert("El turno solo se puede cancelar hasta el día anterior.");
      return;
    }

    const token = localStorage.getItem("token");

await axios.post(
  `http://localhost:3000/appointments/cancel/${id}`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
alert("Turno cancelado correctamente.");

onCancel();
  } catch (error) {
    console.error("Error al cancelar turno:", error);
  }
};

  return (
    <div className={styles.card}>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time:</strong> {time}</p>
      <span
        className={`${styles.status} ${
          status === "active" ? styles.active : styles.cancelled
        }`}
      >
        {status}
      </span>

      {status === "active" && (
        <button className={styles.cancelButton} onClick={handleCancel}>
          Cancelar turno
        </button>
      )}
    </div>
  );
}

export default AppointmentCard;
