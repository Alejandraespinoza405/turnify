import axios from "axios";
import { Box, Button, Chip, Typography } from "@mui/material";

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
  <Box
    sx={{
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "20px 25px",
      margin: "15px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      width: { xs: "calc(100% - 30px)", sm: "250px" },
      boxSizing: "border-box",
      transition: "transform 0.2s ease",
      "&:hover": {
        transform: "translateY(-5px)",
      },
    }}
  >
    <Typography sx={{ margin: "8px 0", fontSize: "16px", color: "#333" }}>
      <strong>Fecha:</strong> {date}
    </Typography>

    <Typography sx={{ margin: "8px 0", fontSize: "16px", color: "#333" }}>
      <strong>Hora:</strong> {time}
    </Typography>

    <Chip
      label={status}
      sx={{
        marginTop: "10px",
        fontWeight: "bold",
        backgroundColor:
          status === "active"
            ? "#d1fae5"
            : status === "cancelled"
            ? "#fee2e2"
            : "#dbeafe",
        color:
          status === "active"
            ? "#065f46"
            : status === "cancelled"
            ? "#991b1b"
            : "#1e3a8a",
      }}
    />

    {status === "active" && (
      <Button
        variant="contained"
        onClick={handleCancel}
        sx={{
          marginTop: "12px",
          width: { xs: "100%", sm: "auto" },
          backgroundColor: "#ff7a7a",
          "&:hover": {
            backgroundColor: "#e25b5b",
          },
        }}
      >
        Cancelar turno
      </Button>
    )}
  </Box>
);
}

export default AppointmentCard;
