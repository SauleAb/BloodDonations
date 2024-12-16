export interface DonationLocation {
    name: string;
    address: string;
    hours: string;
    availableTimes: string[];
}
  
interface CityLocations {
    [city: string]: {
        locations: DonationLocation[];
    };
}
export const cityLocations: { [city: string]: { locations: DonationLocation[] } } = {
    "Amsterdam": {
        locations: [
            {
                name: "Medisch Centrum Amsterdam",
                address: "Address 1, Amsterdam",
                hours: "8:00-20:00",
                availableTimes: ["10:30", "11:30", "12:30", "13:30"]
            },
            {
                name: "Hospital XYZ",
                address: "Street 123, Amsterdam",
                hours: "9:00-18:00",
                availableTimes: ["14:30", "15:30", "16:30"]
            }
        ]
    },
    "Rotterdam": {
        locations: [
            {
                name: "Medisch Centrum Rotterdam",
                address: "Street 123, Rotterdam",
                hours: "8:00-17:00",
                availableTimes: ["11:00", "12:00", "13:00"]
            },
            {
                name: "Hospital ABC",
                address: "Main St, Rotterdam",
                hours: "9:00-18:00",
                availableTimes: ["14:30", "15:30", "16:30"]
            }
        ]
    },
};