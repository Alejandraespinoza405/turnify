import { Request, Response } from "express";
import { cancelAppointmentService, createAppointmentService, getAllAppointmentsService, getAppointmentByIdService } from "../services/appointmentService";
import { Appointment } from "../entities/Appointment";
import { AuthRequest } from "../interfaces/IAuthRequest";

export const getAllAppointments = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const user = req.user!;

    console.log(user);

    const appointments =
  user.role === "admin"
    ? await getAllAppointmentsService()
    : await getAllAppointmentsService(user.id);
    res.status(200).json(appointments);

  } catch (error: unknown) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Unknown Error",
    });
  }
};


export const getAppointmentById = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { id } = req.params;
    const appointment: Appointment = await getAppointmentByIdService(Number(id));
    res.status(200).json(appointment);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Appointment Not Found") {
      res.status(404).json({
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};


export const scheduleAppointment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
     const user = req.user!;

      const appointment: Appointment = await createAppointmentService({
      ...req.body,
      userId: user.id,
    });

     res.status(201).json(appointment);
    } catch (error: unknown) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown Error',
      });
    }
};

export const cancelAppointment = async (req: AuthRequest, res: Response): Promise<void> => {
   try {
      const { id } = req.params;
      const user = req.user!;
      const appointmentId: number = await cancelAppointmentService(
  Number(id),
  user.id,
  user.role
);
      res.status(200).json(appointmentId);

   } catch (error: unknown) {
  if (error instanceof Error && error.message === "Appointment Not Found") {
    res.status(404).json({
      message: error.message,
    });
    return;
  }

if (
  error instanceof Error &&
  error.message === "No autorizado para cancelar este turno"
) {
  res.status(403).json({
    message: error.message,
  });
  return;
}

res.status(500).json({
  message: error instanceof Error ? error.message : "Unknown Error",
});
};
};