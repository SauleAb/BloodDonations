import React from "react";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent, { IconNames } from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import InputField from "@/components/InputField";
import moment from "moment";
import CommonButton from "@/components/common/CommonButton";
import CommonText from "@/components/common/CommonText";
import { TIME_SLOTS, AVAILABLE_LOCATIONS } from "@/constants/DonateData";
import styles from "@/app/styles/DonateStyle";
import { useDonationForm } from "@/hooks/useDonationForm";
import { getNextDonationDetails } from "@/utils/donationUtils";
import calendarStyles from "@/app/styles/CalendarStyle";

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

    const { nextDonationAvailable, nextDonationText } = getNextDonationDetails();

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
                                    theme={calendarStyles.calendar} 
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
                                        <CommonText bold style={styles.title}>Available locations</CommonText>

                                        {AVAILABLE_LOCATIONS.map((location, index) => (
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
                                                {AVAILABLE_LOCATIONS
                                                    .filter((loc) => loc.name === selectedHospital)
                                                    .map((loc, index) => (
                                                        <View key={index}>
                                                            <CommonText style={styles.friend}>
                                                                {loc.address}{'\n'}{loc.hours}
                                                            </CommonText>
                                                            <View style={styles.rowStart}>
                                                                {TIME_SLOTS.map((time) => (
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
                                                                <CommonButton
                                                                    style={styles.center}
                                                                    size="small"
                                                                    onPress={resetFields}
                                                                >
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
