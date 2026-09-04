import { useState } from "react";
import axios from "axios";
import { validateAppointment } from "../../helpers/validateAppointment";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";

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
const token = localStorage.getItem("token");

if (!user) return alert("Debes iniciar sesión para crear un turno.");

try {
  const response = await axios.post(
    "http://localhost:3000/appointments",
    {
      ...form,
      userId: user.id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

      setMessage("Turno creado exitosamente.");
      setTimeout(() => {
  setMessage("");
}, 3000);
      setForm({ date: "", time: "", reason: "" });
      setErrors({});

      if (onCreate) onCreate(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Hubo un error al crear el turno.");
    }
  };

  return (
    <Box
  sx={{
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "30px 40px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto 40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  }}
>
<Typography
  variant="h5"
  component="h2"
  align="center"
  fontWeight="bold"
  sx={{
    color: "#333",
  }}
>
  Solicitar turno
</Typography>
      <form onSubmit={handleSubmit}>
        <div>
<TextField
  label="Fecha"
  type="date"
  name="date"
  value={form.date}
  onChange={handleChange}
  error={Boolean(errors.date)}
  helperText={errors.date || ""}
  fullWidth
  slotProps={{
    inputLabel: {
      shrink: true,
    },
  }}
/>
        </div>
        <div>
<TextField
  label="Hora"
  type="time"
  name="time"
  value={form.time}
  onChange={handleChange}
  error={Boolean(errors.time)}
  helperText={errors.time || ""}
  fullWidth
  slotProps={{
    inputLabel: {
      shrink: true,
    },
    htmlInput: {
      min: "09:00",
      max: "15:00",
    },
  }}
/>
        </div>
        <div>
          <TextField
  label="Motivo"
  type="text"
  name="reason"
  value={form.reason}
  onChange={handleChange}
  error={Boolean(errors.reason)}
  helperText={errors.reason || ""}
  fullWidth
/>
        </div>
<Button
  type="submit"
  variant="contained"
  size="large"
>
  Crear turno
</Button>
      </form>
      {message && (
  <Alert severity={message.includes("exitosamente") ? "success" : "error"}>
    {message}
  </Alert>
)}
    </Box>
  );
}

export default AppointmentForm;
