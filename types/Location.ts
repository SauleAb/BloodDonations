import { TimeSlot } from "./TimeSlot";

export type Location = {
    name: string;
    opening_hours: string;
    latitude: number;
    longitude: number;
    address: string;
    timeslots: TimeSlot[];
    id: string;
};