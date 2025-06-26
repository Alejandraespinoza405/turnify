export function validateAppointment(form) {
  const errors = {};

  if (!form.date) {
    errors.date = "La fecha es obligatoria.";
  } else {
    const today = new Date();
    const selectedDate = new Date(form.date);

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      errors.date = "No podés sacar turnos en fechas pasadas.";
    }
    const day = selectedDate.getDay();
    if (day === 0 || day === 6) {
      errors.date = "Solo se pueden sacar turnos de lunes a viernes.";
    }
  }

  if (!form.time) {
    errors.time = "La hora es obligatoria.";
  } else {
    const [hour] = form.time.split(":");
    const h = parseInt(hour, 10);
    if (h < 9 || h > 15) {
      errors.time = "El horario debe ser entre las 09:00 y las 15:00.";
    }
  }

  if (!form.reason || form.reason.trim() === "") {
    errors.reason = "El motivo es obligatorio.";
  }

  return errors;
}
