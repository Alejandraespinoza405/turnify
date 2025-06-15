import { Request, Response } from "express";
import { cancelAppointmentService, createAppointmentService, getAllAppointmentsService, getAppointmentByIdService } from "../services/appointmentService";
import IAppointment from "../interfaces/IAppointment";

export const getAllAppointments = async (_req: Request, res: Response) => {
  try {
     const appointments: IAppointment[] = await getAllAppointmentsService();
     res.status(200).json({
       data: appointments,
     });
   } catch (error: unknown) {
     res.status(500).json({
       message: error instanceof Error ? error.message : 'Unknown Error',
     });
   }
};

export const getAppointmentById = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const appointment: IAppointment = await getAppointmentByIdService(Number(id));
      res.status(200).json({
        data: appointment,
      });
    } catch (error: unknown) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown Error',
      });
    }
};

export const scheduleAppointment = async (req: Request, res: Response) => {
  try {
      const appointment: IAppointment = await createAppointmentService(req.body);
      res.status(200).json({
        data: appointment,
      });
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
      res.status(200).json({
        data: appointmentId,
      });
    } catch (error: unknown) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown Error',
      });
    }
};