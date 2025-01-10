import moment from 'moment';
import axios from "axios";
import { getDistance } from "geolib";
import { TimeSlot } from '@/types/TimeSlot';
import { Location } from '@/types/Location'
import { Appointment } from '@/types/Appointment';

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

const fetchWithRetry = async (url: string, options = {}, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.get(url, options);
            return response.data;
        } catch (error) {
            if (i === retries - 1) throw error; // Throw error if all retries fail
            console.warn(`Retrying... (${i + 1}/${retries})`);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retrying
        }
    }
};

let donationFetchTimeout: string | number | NodeJS.Timeout | undefined;
export const fetchDonationsThrottled = async (userId: string, callback: (arg0: Appointment[]) => void) => {
    clearTimeout(donationFetchTimeout);
    donationFetchTimeout = setTimeout(async () => {
        const donations = await fetchUserDonations(userId);
        if (callback) {
            callback(donations); 
        }
    }, 500); 
};

export const fetchUserDonations = async (userId: string): Promise<Appointment[]> => {
    try {
        if (!userId) {
            console.error("User ID is not defined. Skipping donation fetch.");
            return [];
        }
        const response = await fetchWithRetry(
            `https://sanquin-api.onrender.com/donations/user/${userId}`
        );
        if (response.status === 200 && Array.isArray(response.data)) {
            return response.data.map((donation: any) => ({
                id: donation.id,
                hospital: `Hospital ID: ${donation.location_id}`, 
                date: moment(donation.appointment).format("YYYY-MM-DD"),
                time: moment(donation.appointment).format("HH:mm"),
            }));
        } else if (response.status === 200 && Array.isArray(response.data.data)) {
            return response.data.data.map((donation: any) => ({
                id: donation.id,
                hospital: `Hospital ID: ${donation.location_id}`, 
                date: moment(donation.appointment).format("YYYY-MM-DD"),
                time: moment(donation.appointment).format("HH:mm"),
            }));
        } else {
            console.warn("Unexpected response format:", JSON.stringify(response));
            return []; 
        }
    } catch (error) {
        console.error("Error fetching user donations:", error);
        return []; 
    }
};



export const cancelDonation = async (donationId: number): Promise<boolean> => {
    try {
        const response = await axios.delete(`https://sanquin-api.onrender.com/donations/${donationId}`);
        if (response.status === 200) {
            console.log("Donation canceled successfully");
            return true;
        }
        throw new Error("Error canceling donation");
    } catch (error) {
        console.error("Error canceling donation:", error);
        return false;
    }
};

export const handleRequestAppointment = async (
    userId: string,
    locations: Location[],
    selectedHospital: string,
    selectedDate: string,
    selectedTime: string,
    enableJoining: boolean
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
            enable_joining: enableJoining
        };

        const response = await axios.post("https://sanquin-api.onrender.com/donations/", appointmentData);

        if (response.status === 200) { 
            const responseData = Object.fromEntries(response.data.data); 
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
