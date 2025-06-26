import { Request, Response } from "express";
import { cancelAppointmentService, createAppointmentService, getAllAppointmentsService, getAppointmentByIdService } from "../services/appointmentService";
import { Appointment } from "../entities/Appointment";

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    console.log("Recibido userId:", userId);
    const appointments: Appointment[] = await getAllAppointmentsService(Number(userId));
    res.status(200).json(appointments);
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown Error',
    });
  }
};


export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointment: Appointment = await getAppointmentByIdService(Number(id));
    res.status(200).json(appointment);
  } catch (error: unknown) {
    if (error instanceof Error && error.message == "Appointment Not Found") {
      res.status(404).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};


export const scheduleAppointment = async (req: Request, res: Response) => {
  try {
      const appointment: Appointment = await createAppointmentService(req.body);
      res.status(201).json(appointment);
    } catch (error: unknown) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown Error',
      });
    }
};

export const cancelAppointment = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const appointmentId: number = await cancelAppointmentService(Number(id));
      res.status(200).json(appointmentId);
   } catch (error: unknown) {
  if (error instanceof Error && error.message == "Appointment Not Found") {
    res.status(404).json({
      message: error.message,
    });
  }

  res.status(500).json({
    message: error instanceof Error ? error.message : "Unknown Error",
  });
};
};