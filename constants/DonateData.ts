export interface Location {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    opening_hours: string;
    timeslots: TimeSlot[];
  }
  
  export interface TimeSlot {
    start_time: string;
    end_time: string;
  }