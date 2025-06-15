import { ICreateAppointmentDTO } from "../dtos/IAppointmentDTO";
import IAppointment, { AppointmentStatus } from "../interfaces/IAppointment";

const appointmentsDB: IAppointment[] = [
   {
    id: 1,
    date: new Date("2025-06-15"),
    time: "09:00",
    userId: 1,
    status: AppointmentStatus.ACTIVE,
  },
  {
    id: 2,
    date: new Date("2025-06-16"),
    time: "11:30",
    userId: 2,
    status: AppointmentStatus.ACTIVE,
  },
  {
    id: 3,
    date: new Date("2025-06-17"),
    time: "14:00",
    userId: 1,
    status: AppointmentStatus.CANCELLED,
  }
];
let appointmentId = 4;

export const getAllAppointmentsService = async (): Promise<IAppointment[]> => {
    return appointmentsDB;
};
export const getAppointmentByIdService = async (id: number): Promise<IAppointment> => { 
   const foundAppointment: IAppointment | undefined = appointmentsDB.find((appointment) => appointment.id == id);
    if (!foundAppointment) throw new Error("Appointment Not Found");
    return foundAppointment;
};

export const createAppointmentService = async (appointmentDTO: ICreateAppointmentDTO): Promise<IAppointment> => {
   const newAppointment: IAppointment = {
    id: appointmentId,
    date: appointmentDTO.date,
    status: AppointmentStatus.ACTIVE,
    time: appointmentDTO.time,
    userId: appointmentDTO.userId,
   };
   appointmentId++;
   appointmentsDB.push(newAppointment)
   return newAppointment;
};

export const cancelAppointmentService = async (id: number): Promise<number> => {
   const foundAppointment = await getAppointmentByIdService(id);

   if (foundAppointment.status == AppointmentStatus.CANCELLED) throw new Error("El turno estaba cancelado");

   foundAppointment.status = AppointmentStatus.CANCELLED;

   return foundAppointment.id;
};