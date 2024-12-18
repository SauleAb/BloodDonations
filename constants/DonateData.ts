export interface DonationLocation {
    name: string;
    address: string;
    hours: string;
    availableTimes: string[];
}

interface CityLocations {
    [city: string]: {
        coordinates: {
            latitude: number;
            longitude: number;
        };
        locations: DonationLocation[];
    };
}

export const cityLocations: { [city: string]: { coordinates: { latitude: number; longitude: number }; locations: DonationLocation[] } } = {
    "Amsterdam": {
        coordinates: { latitude: 52.379189, longitude: 4.90091 }, // Coordinates for Amsterdam
        locations: [
            {
                name: "Medisch Centrum Amsterdam",
                address: "Address 1, Amsterdam",
                hours: "8:00-20:00",
                availableTimes: ["10:30", "11:30", "12:30", "13:30"]
            },
            {
                name: "Amsterdam Hospital XYZ",
                address: "Street 123, Amsterdam",
                hours: "9:00-18:00",
                availableTimes: ["14:30", "15:30", "16:30"]
            }
        ]
    },
    "Rotterdam": {
        coordinates: { latitude: 51.9225, longitude: 4.47917 }, // Coordinates for Rotterdam
        locations: [
            {
                name: "Medisch Centrum Rotterdam",
                address: "Street 123, Rotterdam",
                hours: "8:00-17:00",
                availableTimes: ["11:00", "12:00", "13:00"]
            },
            {
                name: "Rotterdam Hospital ABC",
                address: "Main St, Rotterdam",
                hours: "9:00-18:00",
                availableTimes: ["14:30", "15:30", "16:30"]
            }
        ]
    },
    "The Hague": {
        coordinates: { latitude: 52.0705, longitude: 4.3007 }, // Coordinates for The Hague
        locations: [
            {
                name: "Medisch Centrum Den Haag",
                address: "Address 45, The Hague",
                hours: "8:00-18:00",
                availableTimes: ["10:00", "11:00", "12:00", "13:00"]
            },
            {
                name: "The Hague Hospital 123",
                address: "Main Road, The Hague",
                hours: "9:00-17:00",
                availableTimes: ["14:00", "15:00", "16:00"]
            }
        ]
    },
    "Utrecht": {
        coordinates: { latitude: 52.0907, longitude: 5.1214 }, // Coordinates for Utrecht
        locations: [
            {
                name: "Utrecht Medical Center",
                address: "Utrechtlaan 15, Utrecht",
                hours: "8:30-19:30",
                availableTimes: ["9:00", "10:00", "11:00", "12:00"]
            },
            {
                name: "Utrecht Hospital PQR",
                address: "Parkweg 10, Utrecht",
                hours: "8:00-17:00",
                availableTimes: ["14:00", "15:00", "16:00"]
            }
        ]
    },
    "Eindhoven": {
        coordinates: { latitude: 51.4416, longitude: 5.4697 }, // Coordinates for Eindhoven
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
        coordinates: { latitude: 53.2194, longitude: 6.5665 }, // Coordinates for Groningen
        locations: [
            {
                name: "Groningen University Medical Center",
                address: "Groningerweg 10, Groningen",
                hours: "8:00-20:00",
                availableTimes: ["9:00", "10:00", "11:00"]
            },
            {
                name: "Groningen Hospital Delta",
                address: "Stadhuisplein 1, Groningen",
                hours: "8:30-17:30",
                availableTimes: ["14:00", "15:00", "16:00"]
            }
        ]
    },
    "Leiden": {
        coordinates: { latitude: 52.1583, longitude: 4.4932 }, // Coordinates for Leiden
        locations: [
            {
                name: "Leiden Medical Center",
                address: "Langebrug 15, Leiden",
                hours: "8:00-18:00",
                availableTimes: ["9:30", "10:30", "11:30"]
            },
            {
                name: "Leiden Hospital QRS",
                address: "Burgemeesterstraat 8, Leiden",
                hours: "9:00-18:00",
                availableTimes: ["12:00", "13:00", "14:00"]
            }
        ]
    },
    "Maastricht": {
        coordinates: { latitude: 50.8514, longitude: 5.6889 }, // Coordinates for Maastricht
        locations: [
            {
                name: "Maastricht University Medical Center",
                address: "Molenweg 45, Maastricht",
                hours: "8:00-17:30",
                availableTimes: ["9:00", "10:00", "11:00", "12:00"]
            },
            {
                name: "Maastricht Hospital JKL",
                address: "St. Pietersplein, Maastricht",
                hours: "9:00-18:00",
                availableTimes: ["13:00", "14:00", "15:00"]
            }
        ]
    }
};
