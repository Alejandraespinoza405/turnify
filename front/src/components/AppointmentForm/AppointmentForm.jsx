import { useState } from "react";
import axios from "axios";
import { validateAppointment } from "../../helpers/validateAppointment";
import styles from "./AppointmentForm.module.css";

function AppointmentForm({ onCreate }) {
  const [form, setForm] = useState({ date: "", time: "", reason: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    const validationErrors = validateAppointment(updatedForm);
    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAppointment(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Debes iniciar sesión para crear un turno.");

    try {
      const response = await axios.post("http://localhost:3000/appointments", {
        ...form,
        userId: user.id,
      });

      setMessage("Turno creado exitosamente.");
      setForm({ date: "", time: "", reason: "" });
      setErrors({});

      if (onCreate) onCreate(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Hubo un error al crear el turno.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Solicitar turno</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.label}>Fecha:</label>
          <input
            className={styles.input}
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && <p className={styles.error}>{errors.date}</p>}
        </div>
        <div>
          <label className={styles.label}>Hora:</label>
          <input
            className={styles.input}
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            min="09:00"
            max="15:00"
          />
          {errors.time && <p className={styles.error}>{errors.time}</p>}
        </div>
        <div>
          <label className={styles.label}>Motivo:</label>
          <input
            className={styles.input}
            type="text"
            name="reason"
            value={form.reason}
            onChange={handleChange}
          />
          {errors.reason && <p className={styles.error}>{errors.reason}</p>}
        </div>
        <button className={styles.submitButton} type="submit">
          Crear turno
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default AppointmentForm;
