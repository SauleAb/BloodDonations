import React, { useState } from "react";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent, { IconNames } from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import InputField from "@/components/InputField";

export default function Donate() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedRadius, setSelectedRadius] = useState("");

    return (
        <View style={styles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <CommonScrollElement>
                    {/* Always visible: Next donation info */}
                    <CommonContent
                        titleText={"Next Donation Available in"}
                        contentText={"7 days 4 hours"}
                        icon={IconNames.BloodDonated}
                    />

                    {/* Always visible: Input for donation location */}
                    <InputField
                        placeholder="Enter donation location"
                        value={selectedCity}
                        onChangeText={setSelectedCity}
                    />

                    {/* Conditionally render radius input if location is filled */}
                    {selectedCity.trim() && (
                        <InputField
                            placeholder="Enter search radius"
                            value={selectedRadius}
                            onChangeText={setSelectedRadius}
                        />
                    )}

                    {/* Conditionally render calendar if radius is filled */}
                    {selectedRadius.trim() && (
                        <Calendar
                            onDayPress={(day: { dateString: React.SetStateAction<string>; }) => setSelectedDate(day.dateString)}
                            markedDates={{
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
                            }}
                        />
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
});
