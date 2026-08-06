import { Router } from "express";
import { cancelAppointment, getAllAppointments, getAppointmentById, scheduleAppointment } from "../controllers/appointmentsControllers";
import { authMiddleware } from "../middlewares/authMiddleware";




const appointmentRouter = Router();


appointmentRouter.get("/", authMiddleware, getAllAppointments);



appointmentRouter.get("/:id", authMiddleware, getAppointmentById);


appointmentRouter.post("/", authMiddleware, scheduleAppointment);


appointmentRouter.post("/cancel/:id", authMiddleware, cancelAppointment);



export default appointmentRouter;
