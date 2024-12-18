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
    "The Hague": {
        locations: [
            {
                name: "Medisch Centrum Den Haag",
                address: "Address 45, The Hague",
                hours: "8:00-18:00",
                availableTimes: ["10:00", "11:00", "12:00", "13:00"]
            },
            {
                name: "Hospital 123",
                address: "Main Road, The Hague",
                hours: "9:00-17:00",
                availableTimes: ["14:00", "15:00", "16:00"]
            }
        ]
    },
    "Utrecht": {
        locations: [
            {
                name: "Utrecht Medical Center",
                address: "Utrechtlaan 15, Utrecht",
                hours: "8:30-19:30",
                availableTimes: ["9:00", "10:00", "11:00", "12:00"]
            },
            {
                name: "Hospital PQR",
                address: "Parkweg 10, Utrecht",
                hours: "8:00-17:00",
                availableTimes: ["14:00", "15:00", "16:00"]
            }
        ]
    },
    "Eindhoven": {
        locations: [
            {
                name: "Eindhoven University Medical Center",
                address: "Science Park 9, Eindhoven",
                hours: "8:00-19:00",
                availableTimes: ["10:00", "11:00", "12:00"]
            },
            {
                name: "General Hospital Eindhoven",
                address: "City Center, Eindhoven",
                hours: "9:00-18:00",
                availableTimes: ["13:00", "14:00", "15:00"]
            }
        ]
    },
    "Groningen": {
        locations: [
            {
                name: "Groningen University Medical Center",
                address: "Groningerweg 10, Groningen",
                hours: "8:00-20:00",
                availableTimes: ["9:00", "10:00", "11:00"]
            },
            {
                name: "Hospital Delta",
                address: "Stadhuisplein 1, Groningen",
                hours: "8:30-17:30",
                availableTimes: ["14:00", "15:00", "16:00"]
            }
        ]
    },
    "Leiden": {
        locations: [
            {
                name: "Leiden Medical Center",
                address: "Langebrug 15, Leiden",
                hours: "8:00-18:00",
                availableTimes: ["9:30", "10:30", "11:30"]
            },
            {
                name: "Hospital QRS",
                address: "Burgemeesterstraat 8, Leiden",
                hours: "9:00-18:00",
                availableTimes: ["12:00", "13:00", "14:00"]
            }
        ]
    },
    "Maastricht": {
        locations: [
            {
                name: "Maastricht University Medical Center",
                address: "Molenweg 45, Maastricht",
                hours: "8:00-17:30",
                availableTimes: ["9:00", "10:00", "11:00", "12:00"]
            },
            {
                name: "Hospital JKL",
                address: "St. Pietersplein, Maastricht",
                hours: "9:00-18:00",
                availableTimes: ["13:00", "14:00", "15:00"]
            }
        ]
    }
};