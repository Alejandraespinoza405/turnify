import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyAppointments.module.css";
import AppointmentCard from "../../../components/Navbar/AppointmentCard/AppointmentCard";
import axios from "axios";
import { Grid } from "@mui/material";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const getAppointments = async () => {
      setLoading(true);
      try {
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const response = await axios.get(
  `http://localhost:3000/appointments?userId=${user.id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
        setAppointments(response.data);
        
        const updatedUser = { ...user, appointments: response.data };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (error) {
        console.error(error);
        setError("Ocurrió un error al solicitar tus turnos");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/home");
      return;
    }
   if (user.appointments && user.appointments.length > 0) {
    setAppointments(user.appointments);
  }
    getAppointments();
  }, [navigate]);

  return (
    <div className="pageLayout">
      <main className={styles.wrapper}>
        <h2 className={styles.title}>Mis turnos</h2>

        <div className={styles.appointmentContainer}>
         {loading ? (
  <h3>Cargando...</h3>
) : error ? (
  <h3>{error}</h3>
) : appointments.length === 0 ? (
  <p>Aún no tenés turnos agendados.</p>
) : (
  <Grid container spacing={2}>
    {appointments.map((appoint) => (
      <Grid
        key={appoint.id}
        size={{ xs: 12, sm: 6, md: 4 }}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AppointmentCard
          appointment={appoint}
          onCancel={getAppointments}
        />
      </Grid>
    ))}
  </Grid>
)}
        </div>
      </main>
    </div>
  );
}

export default MyAppointments;
