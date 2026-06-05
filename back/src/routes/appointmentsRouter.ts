import { Router } from "express";
import { cancelAppointment, getAllAppointments, getAppointmentById, scheduleAppointment } from "../controllers/appointmentsControllers";
import { authMiddleware } from "../middlewares/authMiddleware";




const appointmentRouter = Router();


appointmentRouter.get("/", authMiddleware, getAllAppointments);



appointmentRouter.get("/:id", getAppointmentById);


appointmentRouter.post("/", scheduleAppointment);


appointmentRouter.post("/cancel/:id", cancelAppointment);



export default appointmentRouter;
