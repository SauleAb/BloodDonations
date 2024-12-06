import React, { useState } from "react";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent, { IconNames } from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import { View, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import InputField from "@/components/InputField";
import moment from "moment";
import CommonButton from "@/components/common/CommonButton";
import CommonText from "@/components/common/CommonText";

export default function Donate() {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedRadius, setSelectedRadius] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null); // Track selected hospital

    const nextDonationAvailable = moment().add(7, "days").startOf("day");
    const nextDonationText = `${moment.duration(nextDonationAvailable.diff(moment())).humanize()} away`;

    const resetFields = () => {
        setSelectedDate("");
        setSelectedCity("");
        setSelectedRadius("");
        setSelectedTime("");
        setSelectedHospital(null);
    };

    const generateDisabledDates = (): Record<string, { disabled: boolean }> => {
        const today = moment();
        const disabledDates: Record<string, { disabled: boolean }> = {};
        while (today.isBefore(nextDonationAvailable)) {
            disabledDates[today.format("YYYY-MM-DD")] = { disabled: true };
            today.add(1, "day");
        }
        return disabledDates;
    };

    const disabledDates = generateDisabledDates();

    const isCityAndRadiusFilled = selectedCity.trim() && selectedRadius.trim();
    const isTimeSelected = selectedTime !== "";

    // Array of available time slots
    const timeSlots = [
        "10:30", "11:30", "12:30", "13:30",
        "15:30", "16:30", "17:30", "18:30"
    ];

    // Hardcoded array of available locations
    const availableLocations = [
        { name: "Medisch Centrum Eindhoven", address: "Dijklaan 84A, Veldhoven", hours: "8:00-20:00" },
        { name: "Medisch Centrum Tilburg", address: "Bonk 84A, Tilburg", hours: "8:00-17:00" },
        { name: "Hospital XYZ", address: "Street 123, City", hours: "9:00-18:00" }
    ];

    const handleSetAppointment = (hospitalName: string) => {
        setSelectedHospital(hospitalName); 
    };

    return (
        <View style={styles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <CommonScrollElement>
                    <CommonContent
                        titleText={"Next Donation Available in"}
                        contentText={nextDonationText}
                        icon={IconNames.BloodDonated}
                    />

                    <InputField
                        placeholder="Enter donation location"
                        value={selectedCity}
                        onChangeText={setSelectedCity}
                    />

                    {selectedCity.trim() && (
                        <InputField
                            placeholder="Enter search radius"
                            value={selectedRadius}
                            onChangeText={setSelectedRadius}
                        />
                    )}

{isCityAndRadiusFilled && (
    <CommonContent titleText="Select a Donation Date">
        <View style={styles.calendarWrapper}>
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
                theme={{
                    backgroundColor: "#ffffff",
                    calendarBackground: "#ffffff",
                    textSectionTitleColor: "#b6c1cd",
                    selectedDayBackgroundColor: "#00BFFF",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "#00BFFF",
                    dayTextColor: "#2d4150",
                    arrowColor: "#00BFFF",
                    disabledArrowColor: "#d9e1e8",
                    textDisabledColor: "#d9e1e8",
                }}
                minDate={moment().format("YYYY-MM-DD")}
                disableAllTouchEventsForDisabledDays={true}
                scrollEnabled={true}
                enableSwipeMonths={true} 
            />
            {selectedDate && (
                <View>
                    <CommonText bold style={styles.selectedDateText}>
                        {selectedDate}
                    </CommonText>
                    <View style={styles.row}>
                        <CommonText style={styles.friend}>
                            Henk de Bloom is donating at Medisch Centrum Eindhoven
                        </CommonText>
                        <CommonButton size="small">Join!</CommonButton>
                    </View>
                    <CommonText bold style={styles.title}>Available locations</CommonText>

                    {availableLocations.map((location, index) => (
                        <View style={styles.row} key={index}>
                            <CommonText style={styles.friend}>
                                {location.name}{'\n'}{location.hours}
                            </CommonText>
                            <CommonButton
                                size="small"
                                onPress={() => handleSetAppointment(location.name)}
                            >
                                Set{'\n'}Appointment
                            </CommonButton>
                        </View>
                    ))}

                    {selectedHospital && (
                        <View>
                            <CommonText bold style={styles.title}>{selectedHospital}</CommonText>
                            {availableLocations
                                .filter((loc) => loc.name === selectedHospital)
                                .map((loc, index) => (
                                    <View key={index}>
                                        <CommonText style={styles.friend}>
                                            {loc.address}{'\n'}{loc.hours}
                                        </CommonText>
                                        <View style={styles.rowStart}>
                                            {timeSlots.map((time) => (
                                                <CommonButton
                                                    key={time}
                                                    size="small"
                                                    onPress={() => setSelectedTime(time)}
                                                    style={[
                                                        selectedTime === time ? styles.selectedTime : {},
                                                        styles.timeButton,
                                                    ]}
                                                >
                                                    {time}
                                                </CommonButton>
                                            ))}
                                        </View>
                                        {isTimeSelected && (
                                            <CommonButton style={styles.center} size="small" onPress={resetFields}>
                                                Request {'\n'}Appointment
                                            </CommonButton>
                                        )}
                                    </View>
                                ))}
                        </View>
                    )}
                </View>
            )}
        </View>
    </CommonContent>
                    )}
                </CommonScrollElement>
            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold"
    },
    calendarWrapper: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    timeButton: {
        margin: 1
    },
    rowStart: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 5,
        marginTop: 5,
        flexWrap: 'wrap',
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 5,
        marginTop: 5,
    },
    center: {
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 20
    },
    friend: {
        width: "70%",
        textAlign: "left"
    },
    selectedTime: {
        backgroundColor: "#00BFFF",
        color: "#fff",
    },
    calendarContainer: {
        marginTop: 20,
        width: "90%",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    greyBar: {
        backgroundColor: 'rgb(223,223,223)',
        padding: 10,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    greyBarText: {
        fontSize: 16,
        color: '#404040',
    },
    whiteBackground: {
        backgroundColor: "#ffffff",
        padding: 15,
    },
    selectedDateText: {
        marginTop: 10,
        fontSize: 25,
        fontWeight: "bold",
        color: "#333",
        textAlign: 'left',
        textDecorationLine: "underline",
        textDecorationStyle: "solid"
    },
});
