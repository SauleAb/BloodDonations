import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { StyleSheet } from 'react-native';
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
import { useUser } from '@/components/UserContext';
import { Location } from '@/types/Location';
import {
    fetchUserByEmail,
    fetchAllLocations,
    fetchCityLocations,
    filterLocationsWithinRadius,
    getAvailableTimesForSelectedDay,
    handleRequestAppointment,
    handleTextChange,
} from "@/utils/donationUtils";
import moment from "moment";
import { Appointment } from "@/types/Appointment";
import CustomInput from "@/components/common/CommonInputField";
import CalendarContent from "@/components/CalendarComponent";
import CommonContentSwitch from "@/components/common/CommonContentSwitch";
import { TimeSlot } from "@/types/TimeSlot";

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

    const [isToggled, setIsToggled] = useState(false);
    const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(null);
    const [locations, setLocations] = useState<Location[]>([]);
    const [allLocations, setAllLocations] = useState<Location[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const { user } = useUser();

    useEffect(() => {
        const initializeUser = async () => {
            const userEntity = await fetchUserByEmail(user.email, user.password);
            if (userEntity) setUserId(userEntity.id);
        };
        initializeUser();
    }, [user]);

    useEffect(() => {
        const initializeLocations = async () => {
            const allLocs = await fetchAllLocations();
            setAllLocations(allLocs);
        };
        initializeLocations();
    }, []);

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

    const requestAppointment = async () => {
        if (selectedHospital && selectedDate && selectedTime && userId) {
            const appointment = await handleRequestAppointment(userId, locations, selectedHospital, selectedDate, selectedTime);
            if (appointment) {
                setActiveAppointment(appointment);
                resetFields();
            }
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
                                <CommonContent
                                    titleText="Next Donation"
                                    contentText={`Scheduled at ${activeAppointment.hospital} on ${activeAppointment.date} at ${activeAppointment.time}.`}
                                    icon={IconNames.BloodDonated}
                                />
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
                                                            <CommonContentSwitch initialValue={false} onToggle={setIsToggled} />
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
})