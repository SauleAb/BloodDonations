import { useState } from 'react';

export const useDonationForm = () => {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedRadius, setSelectedRadius] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null);

    const resetFields = () => {
        setSelectedDate("");
        setSelectedCity("");
        setSelectedRadius("");
        setSelectedTime("");
        setSelectedHospital("");
        setInputValue("");
    };

    return {
        selectedDate,
        selectedCity,
        selectedRadius,
        selectedTime,
        selectedHospital,
        inputValue,
        setSelectedDate,
        setSelectedCity,
        setSelectedRadius,
        setSelectedTime,
        setSelectedHospital,
        setInputValue,
        resetFields,
    };
};