import React, { useState } from "react";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent, { IconNames } from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import { View, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import InputField from "@/components/InputField";
import moment from "moment";

export default function Donate() {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedRadius, setSelectedRadius] = useState<string>("");

    const nextDonationAvailable = moment().add(7, "days").startOf("day");
    const nextDonationText = `${moment.duration(nextDonationAvailable.diff(moment())).humanize()} away`;

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
                        <View style={styles.calendarContainer}>
                            <View style={styles.greyBar}>
                                <Text style={styles.greyBarText}>
                                    Select a Donation Date
                                </Text>
                            </View>
                            <View style={styles.whiteBackground}>
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
                                />
                                {selectedDate && (
                                    <Text style={styles.selectedDateText}>
                                        You have selected: {selectedDate}
                                    </Text>
                                )}
                            </View>
                        </View>
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
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
});
