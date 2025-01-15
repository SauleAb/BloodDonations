import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import InputField from "@/components/common/CommonInputField";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent from "@/components/common/CommonContent";
import CommonButton from "@/components/common/CommonButton";
import CommonText from "@/components/common/CommonText";
import donateStyles from "@/app/styles/DonateStyle";
import { useDonationForm } from "@/hooks/useDonationForm";
import calendarStyles from "@/app/styles/CalendarStyle";
import commonStyles from "@/app/styles/CommonStyles";
import { IconNames } from "@/components/common/CommonIcons";
import { useUser } from "@/components/UserContext";
import { Location } from "@/types/Location";
import {
    fetchAllLocations,
    fetchCityLocations,
    filterLocationsWithinRadius,
    getAvailableTimesForSelectedDay,
    handleRequestAppointment,
    handleTextChange,
    cancelDonation,
    initializeActiveAppointment,
    fetchFriendsAppointments,
    findDonationByDate,
    fetchUserDetails,
    formatFriendDonationInfo,
    joinFriendAppointment,
} from "@/utils/donationUtils";
import moment from "moment";
import { Appointment } from "@/types/Appointment";
import CustomInput from "@/components/common/CommonInputField";
import CalendarContent from "@/components/CalendarComponent";
import CommonContentSwitch from "@/components/common/CommonContentSwitch";
import { TimeSlot } from "@/types/TimeSlot";
import CancelButton from "@/components/common/CommonCancelButton";
import axios from "axios";
import { FriendDonation } from "@/types/FriendDonation";

export default function Donate() {
    const {
        selectedDate,
        selectedCity,
        selectedRadius,
        selectedTime,
        inputValue,
        selectedHospital,
        setSelectedDate,
        setSelectedCity,
        setSelectedRadius,
        setSelectedTime,
        setSelectedHospital,
        setInputValue,
        resetFields,
    } = useDonationForm();
    

    const [isToggled, setIsToggled] = useState(true);
    const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(null);
    const [activeAppointmentLocationName, setActiveAppointmentLocationName] = useState<string | null>(null);
    const [locations, setLocations] = useState<Location[]>([]);
    const [allLocations, setAllLocations] = useState<Location[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [markedDates, setMarkedDates] = useState({});
    const [friendsDonations, setFriendsDonations] = useState<FriendDonation[]>([]);
    const [selectedFriendInfo, setSelectedFriendInfo] = useState<string | null>(null);
    const [selectedFriendDonation, setSelectedFriendDonation] = useState<FriendDonation | null>(null);
    const { user } = useUser();

    const fetchLocationName = async (locationId: number): Promise<string> => {
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

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (user.id) {
                fetchFriendsAppointments(user.id, setFriendsDonations, setMarkedDates);
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [user]);

    useEffect(() => {
        if (user.id) {
            initializeActiveAppointment(
                user.id,
                setActiveAppointment,
                setActiveAppointmentLocationName,
                setAllLocations
            );
        }
    }, [user]);

    useEffect(() => {
        const initializeLocations = async () => {
            const allLocs = await fetchAllLocations();
            setAllLocations(allLocs);
        };
        initializeLocations();
    }, []);

    const completeDonation = async () => {
        if (!activeAppointment || !activeAppointment.id) {
            console.error("No active appointment to complete.");
            return;
        }
    
        const updatedDonationData = {
            amount: 500, 
            user_id: user.id, 
            location_id: activeAppointment.hospital_id,
            donation_type: "blood", 
            appointment: `${activeAppointment.date}T${activeAppointment.time}:00.000Z`,
            status: "completed",
            enable_joining: true, 
        };
    
        try {
            const response = await axios.put(
                `https://sanquin-api.onrender.com/donations/${activeAppointment.id}`,
                updatedDonationData
            );
    
            if (response.status === 200) {
                setActiveAppointment(null);
                resetFields();
            } else {
                console.error("Unexpected response from the API:", response);
            }
        } catch (error) {
            console.error("Error completing the donation:", error);
        }
    };

    useEffect(() => {
        const fetchLocations = async () => {
            if (selectedCity && selectedRadius) {
                const cityLocations = await fetchCityLocations(selectedCity);
                const filteredLocations = filterLocationsWithinRadius(cityLocations, allLocations, selectedRadius);
                setLocations(filteredLocations);
            }
        };
        fetchLocations();
    }, [selectedCity, selectedRadius, allLocations]);

    const onTextChange = (text: string) => {
        setInputValue(text);
        setSuggestions(handleTextChange(text, allLocations));
    };

    useEffect(() => {
        if (user.id) {
            fetchFriendsAppointments(user.id, setFriendsDonations, setMarkedDates);
        }
    }, [user]);
    
    const handleDateSelection = async (date: string) => {
        setSelectedDate(date);
    
        const donation = findDonationByDate(friendsDonations, date);
    
        if (donation) {
            try {
                const { username } = await fetchUserDetails(donation.user_id);
                const locationName = await fetchLocationName(donation.location_id);
    
                const info = formatFriendDonationInfo(username, locationName, donation.appointment);
                setSelectedFriendInfo(info);
                setSelectedFriendDonation(donation);
            } catch (error) {
                console.error("Error handling date selection:", error);
                setSelectedFriendInfo(null);
                setSelectedFriendDonation(null);
            }
        } else {
            setSelectedFriendInfo(null);
            setSelectedFriendDonation(null);
        }
    };
    
    
    const joinFriend = async () => {
        if (!user.id || !selectedFriendDonation || !locations.length) return;
        const appointment = await joinFriendAppointment(user.id, selectedFriendDonation, locations);
    
        if (appointment) {
            setActiveAppointment(appointment);
            setSelectedFriendInfo(null); 
            resetFields();
        } else {
            console.error("Failed to join friend's appointment.");
        }
    };

    const cancelDonationHandler = async () => {
        if (!activeAppointment || !activeAppointment.id) return;
    
        const success = await cancelDonation(activeAppointment.id);
        if (success) {
            resetFields();
            setActiveAppointment(null); 
        } else {
            console.error("Failed to cancel the donation");
        }
    };

    const requestAppointment = async () => {
        if (selectedHospital && selectedDate && selectedTime && user.id) {
            const appointment = await handleRequestAppointment(
                user.id,
                user.username,
                locations,
                selectedHospital,
                selectedDate,
                selectedTime,
                isToggled,
            );

            if (appointment) {
                setActiveAppointment(appointment);
                setActiveAppointmentLocationName(appointment.hospital);
                resetFields();
            } else {
                console.error("Failed to create appointment.");
            }
        } else {
            console.error("Missing required fields for appointment creation.");
        }
    };

    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <FlatList
                    data={[]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={() => null}
                    style={styles.fullWidthContainer}
                    ListHeaderComponent={
                        <View style={styles.fullWidthContent}>
                            {activeAppointment ? (
                                <>
                                    <CommonContent
                                        titleText="Next Donation"
                                        contentText={`Scheduled at ${
                                            activeAppointment.hospital
                                        } on ${activeAppointment.date} at ${activeAppointment.time}.`}
                                        icon={IconNames.BloodDonated}
                                    />
                                    <CancelButton
                                        onConfirm={cancelDonationHandler}
                                        onCancel={() => console.log("Cancellation aborted")}
                                    />
                                    <CommonButton
                                        style={donateStyles.completeDonationButton} 
                                        onPress={completeDonation}
                                    >
                                        Complete Donation
                                    </CommonButton>
                                </>
                            ) : (
                                <CommonContent
                                    titleText="You are eligible to donate again!"
                                    showContent={false}
                                    icon={IconNames.BloodDonated}
                                />
                            )}

                            {!activeAppointment && (
                                <>
                                    <CustomInput
                                        placeholder="Search for a city"
                                        value={inputValue}
                                        onChangeText={onTextChange}
                                        suggestions={suggestions}
                                        onSuggestionSelect={(city) => {
                                            setInputValue(city);
                                            setSelectedCity(city);
                                            setSuggestions([]);
                                        }}
                                    />

                                    {selectedCity && (
                                        <InputField
                                            placeholder="Enter search radius (km)"
                                            value={selectedRadius}
                                            onChangeText={setSelectedRadius}
                                            keyboardType="numeric"
                                        />
                                    )}

                                    {selectedCity && selectedRadius && (
                                        <CalendarContent titleText="Select a Donation Date">
                                            <View style={donateStyles.calendarWrapper}>
                                                <Calendar
                                                    onDayPress={(day: { dateString: string }) =>
                                                        handleDateSelection(day.dateString)
                                                    }
                                                    markedDates={{
                                                        ...markedDates,
                                                        [selectedDate]: {
                                                            selected: true,
                                                            marked: true,
                                                            selectedColor: "#00BFFF",
                                                        },
                                                    }}
                                                    markingType="multi-dot"
                                                    theme={calendarStyles.calendar}
                                                    minDate={moment().format("YYYY-MM-DD")}
                                                    disableAllTouchEventsForDisabledDays={true}
                                                    scrollEnabled={true}
                                                    enableSwipeMonths={true}
                                                />
                                                {selectedDate && (
                                                    <View>
                                                        <CommonText bold style={donateStyles.selectedDateText}>
                                                            {selectedDate}
                                                        </CommonText>
                                                        {selectedFriendInfo && (
                                                            <View style={donateStyles.friendDonationWrapper}>
                                                            <CommonText style={donateStyles.friendDonationInfo}>{selectedFriendInfo}</CommonText>
                                                            <CommonButton size="small" onPress={joinFriend}>
                                                                Join!
                                                            </CommonButton>
                                                        </View>
                                                        )}
                                                        <CommonText bold style={donateStyles.title}>
                                                            Available locations
                                                        </CommonText>

                                                        {locations.map((location, index) => (
                                                            <View style={donateStyles.row} key={index}>
                                                                <CommonText style={donateStyles.friend}>
                                                                    {location.name}
                                                                    {"\n"}
                                                                    {location.opening_hours}
                                                                </CommonText>
                                                                <CommonButton
                                                                    size="small"
                                                                    onPress={() =>
                                                                        setSelectedHospital(location.name)
                                                                    }
                                                                    disabled={selectedHospital === location.name}
                                                                >
                                                                    Set{"\n"}Appointment
                                                                </CommonButton>
                                                            </View>
                                                        ))}
                                                        <View style={donateStyles.row}>
                                                            <CommonText>Let others join you</CommonText>
                                                            <CommonContentSwitch
                                                                initialValue={true}
                                                                onToggle={(value) => {
                                                                    setIsToggled(value);
                                                                }}
                                                            />
                                                        </View>

                                                        {selectedHospital && (
                                                            <View>
                                                                <CommonText bold style={donateStyles.title}>
                                                                    {selectedHospital}
                                                                </CommonText>
                                                                {locations
                                                                    .filter((loc) => loc.name === selectedHospital)
                                                                    .map((loc, index) => (
                                                                        <View key={index}>
                                                                            <CommonText
                                                                                style={donateStyles.friend}
                                                                            >
                                                                                {loc.address}
                                                                                {"\n"}
                                                                                {loc.opening_hours}
                                                                            </CommonText>
                                                                            <View style={donateStyles.rowStart}>
                                                                                {getAvailableTimesForSelectedDay(
                                                                                    locations,
                                                                                    selectedHospital,
                                                                                    selectedDate
                                                                                ).map((slot: TimeSlot, index: number) => {
                                                                                    const time = moment(slot.start_time).format("HH:mm");
                                                                                    return (
                                                                                        <CommonButton
                                                                                            key={index}
                                                                                            size="small"
                                                                                            onPress={() => setSelectedTime(time)}
                                                                                            style={[
                                                                                                selectedTime === time ? donateStyles.selectedTime : {},
                                                                                                donateStyles.timeButton,
                                                                                            ]}
                                                                                        >
                                                                                            {time}
                                                                                        </CommonButton>
                                                                                    );
                                                                                })}
                                                                            </View>
                                                                            {selectedTime && (
                                                                                <CommonButton
                                                                                    style={donateStyles.center}
                                                                                    size="small"
                                                                                    onPress={requestAppointment}
                                                                                >
                                                                                    Request {"\n"}Appointment
                                                                                </CommonButton>
                                                                            )}
                                                                        </View>
                                                                    ))}
                                                            </View>
                                                        )}
                                                    </View>
                                                )}
                                            </View>
                                        </CalendarContent>
                                    )}
                                </>
                            )}
                        </View>
                    }
                />
            </CommonBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    fullWidthContainer: {
        flexGrow: 1,
        width: "100%",
    },
    fullWidthContent: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
});