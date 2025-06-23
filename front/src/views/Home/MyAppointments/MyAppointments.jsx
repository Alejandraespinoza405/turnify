import { useState } from "react";
import styles from "./MyAppointments.module.css";
import { appointmentsData } from "../../../helpers/MyAppointment"
import AppointmentCard from "../../../components/Navbar/AppointmentCard/AppointmentCard";

function MyAppointments() {
    const [appointments, setAppointments] = useState(appointmentsData);
   
  return (
    <main className={styles.wrapper}>
      <h2 className={styles.title}>Turnos asignados</h2>
      <div className={styles.appointmentContainer}>
        {appointments.map((appoint) => (
          <AppointmentCard key={appoint.id} appointment={appoint} />
        ))}
      </div>
    </main>
  );
}

export default MyAppointments;