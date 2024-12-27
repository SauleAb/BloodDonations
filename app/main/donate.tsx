import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, FlatList, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import InputField from "@/components/common/CommonInputField";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent from "@/components/common/CommonContent";
import CommonButton from "@/components/common/CommonButton";
import CommonText from "@/components/common/CommonText";
import donateStyles from "@/app/styles/DonateStyle";
import { useDonationForm } from "@/hooks/useDonationForm";
import { getNextDonationDetails } from "@/utils/donationUtils";
import { generateDisabledDates } from "@/utils/calendarUtils";
import calendarStyles from "@/app/styles/CalendarStyle";
import commonStyles from "@/app/styles/CommonStyles";
import { getDistance } from "geolib";
import moment from "moment";
import CustomInput from "@/components/common/CommonInputField";
import CommonContentSwitch from "@/components/common/CommonContentSwitch";
import CalendarContent from "@/components/CalendarComponent";
import { IconNames } from "@/components/common/CommonIcons";
import { useUser } from '@/components/UserContext';

export default function Donate() {
    const {
        selectedDate,
        selectedCity,
        selectedRadius,
        selectedTime,
        selectedHospital,
        setSelectedDate,
        setSelectedCity,
        setSelectedRadius,
        setSelectedTime,
        setSelectedHospital,
        resetFields,
    } = useDonationForm();


    type ActiveAppointment = {
        hospital: string;
        date: string;
        time: string;
    } | null;

    const [isToggled, setIsToggled] = useState(false);
    const [activeAppointment, setActiveAppointment] = useState<ActiveAppointment>(null);
    const [locations, setLocations] = useState<Location[]>([]); // Filtered locations
    const [allLocations, setAllLocations] = useState<Location[]>([]); // All locations
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const { user, loading } = useUser();

    const { nextDonationAvailable, nextDonationText } = getNextDonationDetails();
    const disabledDates = generateDisabledDates(nextDonationAvailable);
    const handleToggle = () => {
        setIsToggled((prevState) => !prevState);
    };

    const fetchUserByEmail = async () => {
          const response = await axios.get(
            `https://sanquin-api.onrender.com/users/email/${user.email}?password=${user.password}`
          );
          if (response.status === 200 && response.data) {
            const userEntity = response.data; 
            setUserId(userEntity.id); 
            console.log("User entity:", userEntity); 
          } else {
            console.error("Error fetching user:", response.statusText);
          }
      };

      useEffect(() => {
        fetchUserByEmail();
      }, []); 
    type TimeSlot = {
        start_time: string; 
        end_time: string; 
        total_capacity: number;
        remaining_capacity: number;
    };

    type Location = {
        name: string;
        opening_hours: string;
        latitude: number;
        longitude: number;
        address: string;
        timeslots: TimeSlot[];
        id: string;
    };

    const isCityAndRadiusFilled = selectedCity.trim() && selectedRadius.trim();
    const isTimeSelected = selectedTime !== "";

    useEffect(() => {
        const fetchAllLocations = async () => {
                const response = await axios.get("https://sanquin-api.onrender.com/donations/location/all");
                if (response.status === 200) {
                    setAllLocations(response.data.data);
                }
        };

        fetchAllLocations();
    }, []);

    useEffect(() => {
        const fetchCityLocations = async () => {
            if (selectedCity) {
                    const response = await axios.get(`https://sanquin-api.onrender.com/donations/location/${selectedCity}`);
                    if (response.status === 200) {
                        const cityLocations = response.data.data;
                        filterLocationsWithinRadius(cityLocations);
                    }
            }
        };

        if (selectedCity && selectedRadius) {
            fetchCityLocations();
        }
    }, [selectedCity, selectedRadius]);

    const filterLocationsWithinRadius = (cityLocations: Location[]) => {
        const radiusInMeters = parseInt(selectedRadius) * 1000;
        const selectedCityCoordinates = cityLocations.length
            ? { latitude: cityLocations[0].latitude, longitude: cityLocations[0].longitude }
            : null;
    
        if (!selectedCityCoordinates) return;
    
        const withinRadius = allLocations.filter((location) => {
            const locationCoordinates = { latitude: location.latitude, longitude: location.longitude };
            const distance = getDistance(selectedCityCoordinates, locationCoordinates);
            return distance <= radiusInMeters;
        });
    
        const uniqueLocations = [...new Map([...cityLocations, ...withinRadius].map((loc) => [loc.id, loc])).values()];
    
        setLocations(uniqueLocations);
    };

    const handleTextChange = (text: string) => {
        setInputValue(text);

        const filteredSuggestions = allLocations
            .map((location) => location.address.split(",")[1]?.trim())
            .filter((city, index, self) => city && self.indexOf(city) === index && city.toLowerCase().includes(text.toLowerCase()));

        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionSelect = (city: string) => {
        setInputValue(city);
        setSuggestions([]);
        setSelectedCity(city);
    };

    const handleSetAppointment = (hospitalName: string) => {
        setSelectedHospital(hospitalName);
    };

    const handleCancelAppointment = () => {
        setActiveAppointment(null);
        resetFields();
    };

    const getAvailableTimesForSelectedDay = () => {
        const selectedLocation = locations.find((loc) => loc.name === selectedHospital);
        if (!selectedLocation) return [];
    
        const timeslots = selectedLocation.timeslots || [];
        return timeslots.filter(
            (slot) => moment(slot.start_time).format("YYYY-MM-DD") === selectedDate
        );
    };

    const handleRequestAppointment = async () => {
        if (selectedHospital && selectedDate && selectedTime) {
            const appointmentDateTime = `${selectedDate}T${selectedTime}:00.000Z`;
            const location = locations.find((loc) => loc.name === selectedHospital);
    
            if (!location) {
                console.error("Location not found for the selected hospital.");
                return;
            }
    
            const appointmentData = {
                amount: 0,
                user_id: userId,
                location_id: location.id,
                type: "blood",
                appointment: appointmentDateTime,
                status: "pending",
            };
    
                // const response = await axios.post(
                //     "https://sanquin-api.onrender.com/donations/",
                //     appointmentData
                // );
                setActiveAppointment({
                    hospital: selectedHospital,
                    date: selectedDate,
                    time: selectedTime,
                });
                setSelectedCity("");
                setInputValue("");
                setSelectedRadius("");
                setSelectedDate("");
                setSelectedTime("");
        }
    };

    const daysUntilDonation = nextDonationAvailable ? moment(nextDonationAvailable).diff(moment(), 'days') : null;

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
                                <CommonContent
                                    titleText={"Next Donation"}
                                    contentText={`Scheduled at ${activeAppointment.hospital} on ${activeAppointment.date} at ${activeAppointment.time}.`}
                                    icon={IconNames.BloodDonated}
                                />
                            ) : (
                                <CommonContent
                                    titleText={"You are eligible to donate again!"}
                                    showContent={false}
                                    icon={IconNames.BloodDonated}
                                />
                            )}

                            {!activeAppointment && (
                                <>
                                    <CustomInput
                                        placeholder="Search for a city"
                                        value={inputValue}
                                        onChangeText={handleTextChange}
                                        suggestions={suggestions}
                                        onSuggestionSelect={handleSuggestionSelect}
                                    />

                                    {selectedCity.trim() && (
                                        <InputField
                                            placeholder="Enter search radius (km)"
                                            value={selectedRadius}
                                            onChangeText={setSelectedRadius}
                                            keyboardType="numeric"
                                        />
                                    )}

                                    {isCityAndRadiusFilled && (
                                        <CalendarContent titleText="Select a Donation Date">
                                            <View style={donateStyles.calendarWrapper}>
                                                <Calendar
                                                    onDayPress={(day: { dateString: string }) =>
                                                        setSelectedDate(day.dateString)
                                                    }
                                                    markedDates={{
                                                        [selectedDate]: {
                                                            selected: true,
                                                            marked: true,
                                                            selectedColor: "#00BFFF",
                                                        },
                                                    }}
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
                                                                        handleSetAppointment(location.name)
                                                                    }
                                                                    disabled={selectedHospital === location.name}
                                                                >
                                                                    Set{"\n"}Appointment
                                                                </CommonButton>
                                                            </View>
                                                        ))}
                                                        <View style={donateStyles.row}>
                                                            <CommonText>Let others join you</CommonText>
                                                            <CommonContentSwitch initialValue={false} onToggle={handleToggle} />
                                                        </View>

                                                        {selectedHospital && (
                                                            <View>
                                                                <CommonText bold style={donateStyles.title}>
                                                                    {selectedHospital}
                                                                </CommonText>
                                                                {locations
                                                                    .filter(
                                                                        (loc) =>
                                                                            loc.name === selectedHospital
                                                                    )
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
                        {getAvailableTimesForSelectedDay().map((slot, index) => {
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
                                                                            {isTimeSelected && (
                                                                                <CommonButton
                                                                                    style={donateStyles.center}
                                                                                    size="small"
                                                                                    onPress={handleRequestAppointment}
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

                            {activeAppointment && (
                                <CommonButton
                                    size="small"
                                    onPress={handleCancelAppointment}
                                    style={donateStyles.center}
                                >
                                    Cancel Appointment
                                </CommonButton>
                            )}
                        </View>
                    }
                />
            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
    },
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
    suggestionList: {
        maxHeight: 200,  
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        position: "absolute",
        top: 45,  
        zIndex: 1000,
    },
});
