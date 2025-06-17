import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { USer } from "./User";

export enum AppointmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled",
}

@Entity({
    name: "appointments",
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "date",
    })
    date: Date;

    @Column()
    time: string;

    @Column({
        type: "enum",
        enum: AppointmentStatus,
        default: AppointmentStatus.ACTIVE,
    })
    status: AppointmentStatus;

    @ManyToOne(() => USer, (user) => user.appointments)
    user: USer;

}