import { FindManyOptions } from "typeorm";
import { appointmentRepository } from "../config/data-source";
import { ICreateAppointmentDTO } from "../dtos/IAppointmentDTO";
import { Appointment } from "../entities/Appointment";
import { AppointmentStatus } from "../interfaces/IAppointment";
import { getUserByIdService } from "./userService";

export const getAllAppointmentsService = async (userId: number): Promise<Appointment[]> => {
  const options: FindManyOptions<Appointment> = {
    relations: ["user"],
  };

      if (userId) {
        options.where = {
          user: {
            id: userId,
          }
        }
      }

    const appointments: Appointment[] = await appointmentRepository.find(options);  

    return appointments;
};
export const getAppointmentByIdService = async (id: number): Promise<Appointment> => { 
   const foundAppointment: Appointment | null = await appointmentRepository.findOne({
     where: {
       id,
     },
   });
    if (!foundAppointment) throw new Error("Appointment Not Found");
    return foundAppointment;
};

export const createAppointmentService = async (appointmentDTO: ICreateAppointmentDTO): Promise<Appointment> => {
   const foundUser = await getUserByIdService(appointmentDTO.userId);
  
  const newAppointment: Appointment = appointmentRepository.create({
    date: appointmentDTO.date,
    status: AppointmentStatus.ACTIVE,
    time: appointmentDTO.time,
    user: foundUser,
   });
   
   const results: Appointment = await appointmentRepository.save(newAppointment);

   return results;
};

export const cancelAppointmentService = async (id: number): Promise<number> => {
   const foundAppointment = await getAppointmentByIdService(id);

   if (foundAppointment.status == AppointmentStatus.CANCELLED) throw new Error("El turno estaba cancelado");

   foundAppointment.status = AppointmentStatus.CANCELLED;
   const results = await appointmentRepository.save(foundAppointment);

   return results.id;
};