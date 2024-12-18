import React, { useState, useEffect } from "react";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent from "@/components/common/CommonContent";
import { View, FlatList, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import InputField from "@/components/InputField";
import moment from "moment";
import axios from "axios";
import CommonButton from "@/components/common/CommonButton";
import CommonText from "@/components/common/CommonText";
import donateStyles from "@/app/styles/DonateStyle";
import { useDonationForm } from "@/hooks/useDonationForm";
import { getNextDonationDetails } from "@/utils/donationUtils";
import { generateDisabledDates } from "@/utils/calendarUtils";
import calendarStyles from "@/app/styles/CalendarStyle";
import commonStyles from "@/app/styles/CommonStyles";
import { cityLocations, DonationLocation } from "@/constants/DonateData";
import CustomInput from "@/components/InputField";
import CalendarContent from "@/components/CalendarComponent";
import CommonContentSwitch from "@/components/common/CommonContentSwitch";
import { IconNames } from "@/components/common/CommonIcons";

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
    const [locations, setLocations] = useState<DonationLocation[]>([]); 
    const [inputValue, setInputValue] = useState(""); 
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleToggle = () => {
        setIsToggled((prevState) => !prevState);
    };

    const { nextDonationAvailable, nextDonationText } = getNextDonationDetails();
    const disabledDates = generateDisabledDates(nextDonationAvailable);

    const isCityAndRadiusFilled = selectedCity.trim() && selectedRadius.trim();
    const isTimeSelected = selectedTime !== "";

    const handleTextChange = (text: string) => {
        setInputValue(text);

        const filteredSuggestions = Object.keys(cityLocations).filter((city) =>
            city.toLowerCase().includes(text.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionSelect = (city: string) => {
        setInputValue(city);
        setSuggestions([]);
        setSelectedCity(city);
        setLocations(cityLocations[city].locations);
    };

    useEffect(() => {
        if (selectedCity.trim()) {
            const cityData = cityLocations[selectedCity];
            setLocations(cityData ? cityData.locations : []);
        }
    }, [selectedCity]);

    const handleSetAppointment = (hospitalName: string) => {
        setSelectedHospital(hospitalName);
    };

    const handleCancelAppointment = () => {
        setActiveAppointment(null);
        resetFields();
    };

    const handleRequestAppointment = async () => {
        if (selectedHospital && selectedDate && selectedTime) {
            const appointmentDateTime = `${selectedDate}T${selectedTime}:00.000Z`; 
            const userId = 0; // current user
            const location = locations.find((loc) => loc.name === selectedHospital);
            const locationId = 0; // database
    
            const appointmentData = {
                amount: 1, //toggle check
                user_id: userId,
                location_id: locationId,
                type: "blood", //user data check
                appointment: appointmentDateTime,
                status: "pending",
            };
    
            try {
                if (selectedHospital && selectedDate && selectedTime) {
                    setActiveAppointment({
                        hospital: selectedHospital,
                        date: selectedDate,
                        time: selectedTime,
                    });
                }
                // const response = await axios.post(
                //     "https://sanquin-api.onrender.com/donations/",
                //     appointmentData
                // );
                setSelectedCity("");
                setInputValue(""); 
                setSelectedRadius(""); 
                setSelectedDate(""); 
                setSelectedTime("");
            } catch (error) {
                console.error("Error posting appointment:", error);
            }
        }
    };

    const timeUntilNextDonation = activeAppointment
        ? moment(`${activeAppointment.date} ${activeAppointment.time}`, "YYYY-MM-DD HH:mm").fromNow()
        : "";

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
                                    titleText={"Next Donation Available in"}
                                    contentText={nextDonationText}
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
                                            placeholder="Enter search radius"
                                            value={selectedRadius}
                                            onChangeText={setSelectedRadius}
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
                                                        ...disabledDates,
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
                                                                    {location.hours}
                                                                </CommonText>
                                                                <CommonButton
                                                                    size="small"
                                                                    onPress={() =>
                                                                        handleSetAppointment(location.name)
                                                                    }
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
                                                                                {loc.hours}
                                                                            </CommonText>
                                                                            <View
                                                                                style={donateStyles.rowStart}
                                                                            >
                                                                                {loc.availableTimes.map(
                                                                                    (time: string) => (
                                                                                        <CommonButton
                                                                                            key={time}
                                                                                            size="small"
                                                                                            onPress={() =>
                                                                                                setSelectedTime(time)
                                                                                            }
                                                                                            style={[
                                                                                                selectedTime === time
                                                                                                    ? donateStyles.selectedTime
                                                                                                    : {},
                                                                                                donateStyles.timeButton,
                                                                                            ]}
                                                                                        >
                                                                                            {time}
                                                                                        </CommonButton>
                                                                                    )
                                                                                )}
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
