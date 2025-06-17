"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const IAppointment_1 = require("../interfaces/IAppointment");
const appointmentsDB = [
    {
        id: 1,
        date: new Date("2025-06-15"),
        time: "09:00",
        userId: 1,
        status: IAppointment_1.AppointmentStatus.ACTIVE,
    },
    {
        id: 2,
        date: new Date("2025-06-16"),
        time: "11:30",
        userId: 2,
        status: IAppointment_1.AppointmentStatus.ACTIVE,
    },
    {
        id: 3,
        date: new Date("2025-06-17"),
        time: "14:00",
        userId: 1,
        status: IAppointment_1.AppointmentStatus.CANCELLED,
    }
];
let appointmentId = 4;
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return appointmentsDB;
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAppointment = appointmentsDB.find((appointment) => appointment.id == id);
    if (!foundAppointment)
        throw new Error("Appointment Not Found");
    return foundAppointment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const createAppointmentService = (appointmentDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = {
        id: appointmentId,
        date: appointmentDTO.date,
        status: IAppointment_1.AppointmentStatus.ACTIVE,
        time: appointmentDTO.time,
        userId: appointmentDTO.userId,
    };
    appointmentId++;
    appointmentsDB.push(newAppointment);
    return newAppointment;
});
exports.createAppointmentService = createAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAppointment = yield (0, exports.getAppointmentByIdService)(id);
    if (foundAppointment.status == IAppointment_1.AppointmentStatus.CANCELLED)
        throw new Error("El turno estaba cancelado");
    foundAppointment.status = IAppointment_1.AppointmentStatus.CANCELLED;
    return foundAppointment.id;
});
exports.cancelAppointmentService = cancelAppointmentService;
