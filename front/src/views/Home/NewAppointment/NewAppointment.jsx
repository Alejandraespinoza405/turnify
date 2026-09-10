import AppointmentForm from "../../../components/AppointmentForm/AppointmentForm";
import { Typography } from "@mui/material";

function NewAppointment() {
  return (
    <div className="pageLayout">
      <main>
       <Typography
          variant="h3"
          component="h1"
          align="center"
          fontWeight="bold"
          sx={{
            marginBottom: "40px",
            color: "#f7f2f2",
          }}
        >
          Solicitar turno
        </Typography>

        <AppointmentForm />
      </main>
    </div>
  );
}

export default NewAppointment;