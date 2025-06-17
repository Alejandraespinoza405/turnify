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
exports.cancelAppointment = exports.scheduleAppointment = exports.getAppointmentById = exports.getAllAppointments = void 0;
const appointmentService_1 = require("../services/appointmentService");
const getAllAppointments = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentService_1.getAllAppointmentsService)();
        res.status(200).json({
            data: appointments,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Unknown Error',
        });
    }
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointment = yield (0, appointmentService_1.getAppointmentByIdService)(Number(id));
        res.status(200).json({
            data: appointment,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Unknown Error',
        });
    }
});
exports.getAppointmentById = getAppointmentById;
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield (0, appointmentService_1.createAppointmentService)(req.body);
        res.status(200).json({
            data: appointment,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Unknown Error',
        });
    }
});
exports.scheduleAppointment = scheduleAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointmentId = yield (0, appointmentService_1.cancelAppointmentService)(Number(id));
        res.status(200).json({
            data: appointmentId,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Unknown Error',
        });
    }
});
exports.cancelAppointment = cancelAppointment;
