import { Router } from "express";
import { cancelAppointment, getAllAppointments, getAppointmentById, scheduleAppointment } from "../controllers/appointmentsControllers";



const appointmentRouter = Router();


appointmentRouter.get("/", getAllAppointments);



appointmentRouter.get("/:id", getAppointmentById);


appointmentRouter.post("/", scheduleAppointment);


appointmentRouter.post("/cancel/:id", cancelAppointment);



export default appointmentRouter;
