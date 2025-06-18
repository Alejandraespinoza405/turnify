import { DataSource } from "typeorm"
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./envs";
import { Credential } from "../entities/Credential";
import { USer } from "../entities/User";
import { Appointment } from "../entities/Appointment";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    // dropSchema: true,
    logging: false,
    entities: [Credential, USer, Appointment],
    subscribers: [],
    migrations: [],
});

export const userRepository = AppDataSource.getRepository(USer);
export const appointmentRepository = AppDataSource.getRepository(Appointment);
export const credentialRepository = AppDataSource.getRepository(Credential);