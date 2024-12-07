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
import donateStyles from "@/app/styles/DonateStyle";
import { useDonationForm } from "@/hooks/useDonationForm";
import { getNextDonationDetails } from "@/utils/donationUtils"; 
import { generateDisabledDates } from "@/utils/calendarUtils"; 
import calendarStyles from "@/app/styles/CalendarStyle";
import commonStyles from "@/app/styles/CommonStyles";

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

    const disabledDates = generateDisabledDates(nextDonationAvailable);

    const isCityAndRadiusFilled = selectedCity.trim() && selectedRadius.trim();
    const isTimeSelected = selectedTime !== "";

    const handleSetAppointment = (hospitalName: string) => {
        setSelectedHospital(hospitalName);
    };

    return (
        <View style={commonStyles.container}>
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
                                        <CommonText bold style={donateStyles.title}>Available locations</CommonText>

                                        {AVAILABLE_LOCATIONS.map((location, index) => (
                                            <View style={donateStyles.row} key={index}>
                                                <CommonText style={donateStyles.friend}>
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
                                                <CommonText bold style={donateStyles.title}>{selectedHospital}</CommonText>
                                                {AVAILABLE_LOCATIONS
                                                    .filter((loc) => loc.name === selectedHospital)
                                                    .map((loc, index) => (
                                                        <View key={index}>
                                                            <CommonText style={donateStyles.friend}>
                                                                {loc.address}{'\n'}{loc.hours}
                                                            </CommonText>
                                                            <View style={donateStyles.rowStart}>
                                                                {TIME_SLOTS.map((time) => (
                                                                    <CommonButton
                                                                        key={time}
                                                                        size="small"
                                                                        onPress={() => setSelectedTime(time)}
                                                                        style={[
                                                                            selectedTime === time ? donateStyles.selectedTime : {},
                                                                            donateStyles.timeButton,
                                                                        ]}
                                                                    >
                                                                        {time}
                                                                    </CommonButton>
                                                                ))}
                                                            </View>
                                                            {isTimeSelected && (
                                                                <CommonButton
                                                                    style={donateStyles.center}
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
