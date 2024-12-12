import React, { useState, useEffect } from "react";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent, { IconNames } from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import { View, TextInput, FlatList, TouchableOpacity } from "react-native";
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
import { cityLocations, DonationLocation } from "@/constants/DonateData";  // New data structure
import CustomInput from "@/components/InputField";

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
    const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');  // Declare inputValue state
    const [suggestions, setSuggestions] = useState<string[]>([]);  // Declare suggestions state

    const handleTextChange = (text: string) => {
        setInputValue(text);
        
        // Filter cities based on input value
        const filteredSuggestions = Object.keys(cityLocations).filter(city =>
            city.toLowerCase().includes(text.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionSelect = (city: string) => {
        setInputValue(city);  // Set the input field to the selected city
        setSuggestions([]);  // Clear the suggestions
        setSelectedCity(city); // Set the selected city
        setLocations(cityLocations[city].locations);  // Get the locations for the selected city
    };

    useEffect(() => {
        console.log("Selected city:", selectedCity);
        if (selectedCity.trim()) {
            const cityData = cityLocations[selectedCity];
            console.log("City data:", cityData);
            if (cityData) {
                setLocations(cityData.locations);
            } else {
                setLocations([]);
            }
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedCity.trim()) {
            const filteredCities = Object.keys(cityLocations).filter((city) =>
                city.toLowerCase().includes(selectedCity.toLowerCase())
            );
            setCitySuggestions(filteredCities);
        } else {
            setCitySuggestions([]);
        }
    }, [selectedCity]);

    const handleSetAppointment = (hospitalName: string) => {
        setSelectedHospital(hospitalName);
    };

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
        setCitySuggestions([]);  // Hide suggestions after selection
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

                    <CustomInput
                        placeholder="Search for a city"
                        value={inputValue}
                        onChangeText={handleTextChange}
                        suggestions={suggestions}
                        onSuggestionSelect={handleSuggestionSelect}
                    />

                    {/* City suggestions dropdown */}
                    {selectedCity.trim() && citySuggestions.length > 0 && (
                        <View>
                            <FlatList
                                data={citySuggestions}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleCitySelect(item)}>
                                        <View>
                                            <CommonText>{item}</CommonText>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item}
                            />
                        </View>
                    )}

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
                                        setSelectedDate(day.dateString)  // Ensure this sets the date correctly
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

                                        {locations.map((location, index) => (
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
                                                {locations
                                                    .filter((loc) => loc.name === selectedHospital)
                                                    .map((loc, index) => (
                                                        <View key={index}>
                                                            <CommonText style={donateStyles.friend}>
                                                                {loc.address}{'\n'}{loc.hours}
                                                            </CommonText>
                                                            <View style={donateStyles.rowStart}>
                                                                {loc.availableTimes.map((time : string) => (
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
