import React, { useState, useEffect } from "react";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent, { IconNames } from "@/components/common/CommonContent";
import { View, FlatList, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import InputField from "@/components/InputField";
import moment from "moment";
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
import CalendarComponent from "@/components/CalendarComponent";
import CalendarContent from "@/components/CalendarComponent";

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

    const [locations, setLocations] = useState<DonationLocation[]>([]);
    const [inputValue, setInputValue] = useState(""); 
    const [suggestions, setSuggestions] = useState<string[]>([]);

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
        console.log("Selected city:", selectedCity);
        if (selectedCity.trim()) {
            const cityData = cityLocations[selectedCity];
            if (cityData) {
                setLocations(cityData.locations);
            } else {
                setLocations([]);
            }
        }
    }, [selectedCity]);

    const handleSetAppointment = (hospitalName: string) => {
        setSelectedHospital(hospitalName);
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
                            <CommonContent
                                titleText={"Next Donation Available in"}
                                contentText={nextDonationText}
                                icon={IconNames.BloodDonated}
                            />

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
                                                                        style={
                                                                            donateStyles.rowStart
                                                                        }
                                                                    >
                                                                        {loc.availableTimes.map(
                                                                            (time: string) => (
                                                                                <CommonButton
                                                                                    key={time}
                                                                                    size="small"
                                                                                    onPress={() =>
                                                                                        setSelectedTime(
                                                                                            time
                                                                                        )
                                                                                    }
                                                                                    style={[
                                                                                        selectedTime ===
                                                                                        time
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
                                                                            style={
                                                                                donateStyles.center
                                                                            }
                                                                            size="small"
                                                                            onPress={resetFields}
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
        alignItems: "center"
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
        alignItems: "center"
    },
});
