import moment from 'moment';
import axios from "axios";
import { getDistance } from "geolib";
import { TimeSlot } from '@/types/TimeSlot';
import { Location } from '@/types/Location'
import { Appointment } from '@/types/Appointment';
import { FriendDonation } from '@/types/FriendDonation';

export const getNextDonationDetails = () => {
    const nextDonationAvailable = moment().add(7, "days").startOf("day");
    const nextDonationText = `${moment.duration(nextDonationAvailable.diff(moment())).humanize()} away`;
    return { nextDonationAvailable, nextDonationText };
};

export const fetchUserByEmail = async (email: string, password: string) => {
    const response = await axios.get(`https://sanquin-api.onrender.com/users/email/${email}?password=${password}`);
    if (response.status === 200 && response.data) {
        return response.data;
    }
    throw new Error("Error fetching user");
};

export const fetchAllLocations = async () => {
    const response = await axios.get("https://sanquin-api.onrender.com/donations/location/all");
    if (response.status === 200) {
        return response.data.data;
    }
    throw new Error("Error fetching all locations");
};

export const fetchCityLocations = async (city: string) => {
    const response = await axios.get(`https://sanquin-api.onrender.com/donations/location/${city}`);
    if (response.status === 200) {
        return response.data.data;
    }
    throw new Error("Error fetching city locations");
};

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
            if (i === retries - 1) throw error; 
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
};

let donationFetchTimeout: string | number | NodeJS.Timeout | undefined;
export const fetchDonationsThrottled = async (userId: number, callback: (arg0: Appointment[]) => void) => {
    clearTimeout(donationFetchTimeout);
    donationFetchTimeout = setTimeout(async () => {
        const donations = await fetchUserDonations(userId);
        if (callback) {
            callback(donations); 
        }
    }, 500); 
};

export const fetchLocationName = async (locationId: number): Promise<string> => {
    try {
        const response = await axios.get(
            `https://sanquin-api.onrender.com/donations/location/${locationId}/name`
        );
        return response.data.data.name;
    } catch (error) {
        console.error(`Error fetching location name for location ID ${locationId}:`, error);
        return `Location ID: ${locationId}`;
    }
};

export const fetchUserDetails = async (userId: number): Promise<{ username: string }> => {
    try {
        const response = await axios.get(`https://sanquin-api.onrender.com/users/id/${userId}`);
        console.log("fetchUserDetails response:", response.data);
        const userArray = response.data?.data;
        if (Array.isArray(userArray)) {
            const usernameEntry = userArray.find((entry) => entry[0] === "username");
            if (usernameEntry) {
                return { username: usernameEntry[1] };
            }
        }
        return { username: "Unknown User" };
    } catch (error) {
        console.error(`Error fetching user details for user ID ${userId}:`, error);
        return { username: "Unknown User" };
    }
};

export const joinFriendAppointment = async (
    userId: string,
    friendDonation: FriendDonation,
    locations: Location[]
): Promise<Appointment | null> => {
    try {
        const location = locations.find((loc) => loc.id === friendDonation.location_id);

        if (!location) {
            console.error("Location not found for the friend's donation.");
            return null;
        }

        const appointmentData = {
            amount: friendDonation.amount,
            user_id: userId,
            location_id: friendDonation.location_id,
            donation_type: friendDonation.donation_type,
            appointment: friendDonation.appointment,
            status: "pending",
            enable_joining: friendDonation.enable_joining,
        };

        const response = await axios.post("https://sanquin-api.onrender.com/donations/", appointmentData);

        if (response.status === 200 && response.data?.data?.id) {
            return {
                id: response.data.data.id,
                hospital: location.name,
                date: moment(friendDonation.appointment).format("YYYY-MM-DD"),
                time: moment(friendDonation.appointment).format("HH:mm"),
            };
        } else {
            console.error("Unexpected response from API:", response.status, response.data);
            return null;
        }
    } catch (error) {
        console.error("Error joining friend's appointment:", error);
        return null;
    }
};



export const findDonationByDate = (donations: FriendDonation[], date: string): FriendDonation | undefined => {
    return donations.find((donation) =>
        moment(donation.appointment).isSame(moment(date), "day")
    );
};

export const formatFriendDonationInfo = (
    username: string,
    locationName: string,
    appointment: string
): string => {
    return `${username} is donating at ${locationName} on ${moment(appointment).format("HH:mm")}!`;
};

export const initializeActiveAppointment = async (
    userId: number,
    setActiveAppointment: (appointment: Appointment | null) => void,
    setActiveAppointmentLocationName: (name: string | null) => void,
    setAllLocations: (locations: Location[]) => void
) => {
    try {
        const donations = await fetchUserDonations(userId);
        const futureDonations = donations.filter((donation: Appointment) =>
            moment(`${donation.date}T${donation.time}`).isAfter(moment())
        );

        if (futureDonations.length > 0) {
            const firstAppointment = futureDonations[0];
            setActiveAppointment(firstAppointment);

            const locationName = await fetchLocationName(
                parseInt(firstAppointment.hospital.split(": ")[1])
            );
            setActiveAppointmentLocationName(locationName);
        }

        const allLocs = await fetchAllLocations();
        setAllLocations(allLocs);
    } catch (error) {
        console.error("Error initializing active appointment:", error);
    }
};

export const fetchFriendsAppointments = async (
    userId: string,
    setFriendsDonations: (donations: any[]) => void,
    setMarkedDates: (dates: Record<string, { dots: { color: string }[] }>) => void
) => {
    try {
        const response = await axios.get(
            `https://sanquin-api.onrender.com/donations/user/${userId}/friends`
        );
        const donations = response.data.data;

        const tempMarkedDates: Record<string, { dots: { color: string }[] }> = {};
        donations.forEach((donation: any) => {
            const appointmentDate = moment(donation.appointment).format("YYYY-MM-DD");
            if (!tempMarkedDates[appointmentDate]) {
                tempMarkedDates[appointmentDate] = { dots: [{ color: "#FFC0CB" }] };
            }
        });

        setMarkedDates(tempMarkedDates);
        setFriendsDonations(donations);
    } catch (error) {
        console.error("Error fetching friends' appointments:", error);
    }
};

export const fetchUserDonations = async (userId: number): Promise<Appointment[]> => {
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
            return []; 
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 500) {
                return [];
            }

            console.error(
                "Error fetching user donations:",
                error.response?.data || error.message
            );
        } else {
            console.error("An unknown error occurred:", error);
        }
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

const fetchUserFriends = async (userId: number): Promise<{ id: string; pushToken: string }[]> => {
    try {
        const response = await axios.get(`https://sanquin-api.onrender.com/users/${userId}/friends`);
        console.log("fetchUserFriends response:", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching user friends:", error);
        return [];
    }
};

export const handleRequestAppointment = async (
    userId: number,
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
            enable_joining: enableJoining,
        };

        const response = await axios.post("https://sanquin-api.onrender.com/donations/", appointmentData);

        if (response.status === 200) {
            const responseData = response.data.data;
            if (enableJoining) {
                const friends = await fetchUserFriends(userId);

                if (!friends.length) {
                    console.log("No friends found for the user.");
                }
                friends.forEach((friend) => {
                    createNotification(
                        Number(friend.id),
                        "Join a Donation!",
                        `Your friend has scheduled a donation at ${selectedHospital} on ${selectedDate} at ${selectedTime}. Join them!`
                    );
                });
            }

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

const createNotification = async (userId: number, title: string, content: string) => {
    try {
        await axios.post(`https://sanquin-api.onrender.com/users/${userId}/notifications`, {
            title,
            content,
            user_id: userId,
        });
        console.log(`Notification sent to user ID ${userId}`);
    } catch (error) {
        console.error(`Error sending notification to user ID ${userId}:`, error);
    }
};

