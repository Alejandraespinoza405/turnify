import { useState } from "react";
import styles from "./MyAppointments.module.css";
import AppointmentCard from "../../../components/Navbar/AppointmentCard/AppointmentCard";
import { useEffect } from "react";
import axios from "axios";

function MyAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/appointments");
      setAppointments(response.data);
      } catch (error) {
        console.error(error);
        setError("Ocurrió un error al solicitar sus turnos");
      } finally {
        setLoading(false);
       }
    };

    useEffect(() => {
      getAppointments();
    }, []);
   
  return (
    <div className="pageLayout">
    <main className={styles.wrapper}>
      <h2 className={styles.title}>Turnos asignados</h2>
      <div className={styles.appointmentContainer}>
        {loading ? ( 
          <h3>Cargando...</h3>
         ) : error ? ( 
          <h3>{error}</h3> 
          ) : (
          appointments.map((appoint) => <AppointmentCard key={appoint.id} appointment={appoint} /> )
          )}
      </div>
    </main>
    </div>
  );
}

export default MyAppointments;