import moment from 'moment';
import axios from "axios";
import { getDistance } from "geolib";
import { TimeSlot } from '@/types/TimeSlot';
import { Location } from '@/types/Location'

export const getNextDonationDetails = () => {
    const nextDonationAvailable = moment().add(7, "days").startOf("day");
    const nextDonationText = `${moment.duration(nextDonationAvailable.diff(moment())).humanize()} away`;
    return { nextDonationAvailable, nextDonationText };
};

// Fetch user details by email
export const fetchUserByEmail = async (email: string, password: string) => {
    const response = await axios.get(`https://sanquin-api.onrender.com/users/email/${email}?password=${password}`);
    if (response.status === 200 && response.data) {
        return response.data;
    }
    throw new Error("Error fetching user");
};

// Fetch all locations
export const fetchAllLocations = async () => {
    const response = await axios.get("https://sanquin-api.onrender.com/donations/location/all");
    if (response.status === 200) {
        return response.data.data;
    }
    throw new Error("Error fetching all locations");
};

// Fetch locations by city
export const fetchCityLocations = async (city: string) => {
    const response = await axios.get(`https://sanquin-api.onrender.com/donations/location/${city}`);
    if (response.status === 200) {
        return response.data.data;
    }
    throw new Error("Error fetching city locations");
};

// Filter locations within radius
export const filterLocationsWithinRadius = (cityLocations: any[], allLocations: any[], radius: string) => {
    const radiusInMeters = parseInt(radius) * 1000;
    const selectedCityCoordinates = cityLocations.length
        ? { latitude: cityLocations[0].latitude, longitude: cityLocations[0].longitude }
        : null;

    if (!selectedCityCoordinates) return [];

    const withinRadius = allLocations.filter((location) => {
        const locationCoordinates = { latitude: location.latitude, longitude: location.longitude };
        const distance = getDistance(selectedCityCoordinates, locationCoordinates);
        return distance <= radiusInMeters;
    });

    return [...new Map([...cityLocations, ...withinRadius].map((loc) => [loc.id, loc])).values()];
};

export const getAvailableTimesForSelectedDay = (
    locations: any[],
    selectedHospital: string,
    selectedDate: string
) => {
    const selectedLocation = locations.find((loc) => loc.name === selectedHospital);
    if (!selectedLocation) return [];

    const timeslots = selectedLocation.timeslots || [];
    return timeslots.filter((slot: TimeSlot) =>
        moment(slot.start_time).format("YYYY-MM-DD") === selectedDate
    );
};

export const handleRequestAppointment = async (
    userId: string,
    locations: Location[],
    selectedHospital: string,
    selectedDate: string,
    selectedTime: string
) => {
    try {
        const appointmentDateTime = `${selectedDate}T${selectedTime}:00.000Z`;
        const location = locations.find((loc) => loc.name === selectedHospital);

        if (!location) {
            console.error("Location not found for the selected hospital.");
            return null;
        }

        const appointmentData = {
            amount: 0,
            user_id: userId,
            location_id: location.id,
            donation_type: "blood",
            appointment: appointmentDateTime,
            status: "pending",
            enable_joining: true
        };

        console.log("Sending appointment data:", appointmentData);

        const response = await axios.post("https://sanquin-api.onrender.com/donations/", appointmentData);

        console.log("API Response:", response.data);

        if (response.status === 200) { 
            const responseData = Object.fromEntries(response.data.data); 
            console.log("Parsed response data:", responseData);
        
            return {
                id: responseData.id,
                hospital: selectedHospital,
                date: selectedDate,
                time: selectedTime,
            };
        } else {
            console.error("Unexpected response from API:", response.status, response.data);
            return null;
        }
    } catch (error) {
        console.error("Error requesting appointment:", error);
        return null;
    }
};


export const handleTextChange = (text: string, allLocations: Location[]) => {
    return allLocations
        .map((location) => location.address.split(",")[1]?.trim())
        .filter((city, index, self) => city && self.indexOf(city) === index && city.toLowerCase().includes(text.toLowerCase()));
};
