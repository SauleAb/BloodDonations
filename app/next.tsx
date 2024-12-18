import React, { useState } from 'react';
import {Alert, FlatList, View} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import nextStyles from './styles/NextStyle';
import CommonBackground from "@/components/common/CommonBackground";
import { useUser } from '@/components/UserContext';
import InputField from '@/components/InputField';
import CommonButton from '@/components/common/CommonButton';
import defaultUser from '@/components/user';
import TwoQuestions from "@/components/TwoQuestions";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CustomInput from "@/components/InputField";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = 'https://sanquin-api.onrender.com';

const countries = [
    "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan",
    "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi",
    "Côte d'Ivoire","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Congo-Brazzaville)","Costa Rica","Croatia","Cuba","Cyprus","Czechia (Czech Republic)",
    "Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic",
    "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
    "Fiji","Finland","France",
    "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
    "Haiti","Holy See","Honduras","Hungary",
    "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
    "Jamaica","Japan","Jordan",
    "Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan",
    "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
    "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
    "Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway",
    "Oman",
    "Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
    "Qatar",
    "Romania","Russia","Rwanda",
    "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
    "Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
    "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan",
    "Vanuatu","Venezuela","Vietnam",
    "Yemen",
    "Zambia","Zimbabwe"
];

export default function NextScreen() {
    const { email, password } = useLocalSearchParams() as { email: string; password: string };
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const router = useRouter();
    const { login } = useUser();

    //Donating
    const [donorTypeAnswer, setDonorType] = useState<string | boolean | null>(null);

    //Sex
    const [gender, setGender] = useState<string | boolean | null>(null);

    //Nationality
    const [nationality, setNationality] = useState(countries[0]);
    const [nationalityInput, setNationalityInput] = useState("");
    const [countrySuggestions, setCountrySuggestions] = useState<string[]>([]);

    const handleNationalityChange = (text: string) => {
        setNationalityInput(text);

        const filteredCountries = countries.filter((country) =>
            country.toLowerCase().includes(text.toLowerCase())
        );

        setCountrySuggestions(filteredCountries);
    };

    const handleCountrySelect = (country: string) => {
        setNationality(country);
        setNationalityInput(country);
        setCountrySuggestions([]);
    };


    const saveUser = async () => {
        try {
            // 1. Prepare User Data for Registration
            const newUserData = {
                ...defaultUser,
                username: email,
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
                nationality: nationality,
                gender: gender,
                plasmaDonor: !donorTypeAnswer,
                bloodDonor: donorTypeAnswer,
                donations: [],
                can_donate: true,
                birthdate: "1990-01-01",
                city: "Amsterdam"
            };

            // 2. Register the User
            const response = await fetch(`${API_BASE_URL}/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUserData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Server error while creating user:', errorMessage);
                Alert.alert('Registration Error', 'Could not create account. Please try again.');
                return; // Stop further execution if registration fails
            }

            Alert.alert('Success', 'Account created successfully! Attempting to log in...');

            // 3. Log the User in Automatically After Successful Registration
            const _email = email.replace(/@/g, "%40");
            const loginUrl = `https://sanquin-api.onrender.com/users/email/${_email}?password=${password}`;

            const loginResponse = await fetch(loginUrl, { method: 'GET' });

            if (!loginResponse.ok) {
                throw new Error("Automatic login failed after registration.");
            }

            // 4. Process Successful Login
            const loginData = await loginResponse.json();
            const userData = {
                ...defaultUser,
                ...loginData.data,
            };

            await login(userData);
            await AsyncStorage.setItem('user', JSON.stringify(userData));

            Alert.alert('Success', 'You have been logged in successfully!');
            router.replace('/main/home');

        } catch (error) {
            const errorMessage = (error as Error).message;
            console.error('Error:', errorMessage);

            // 5. Handle Login-Specific Errors
            if (errorMessage.includes("Automatic login failed")) {
                Alert.alert(
                    'Login Error',
                    'Account created successfully, but automatic login failed. Please log in manually.'
                );
                router.replace('/login');
            } else {
                // 6. General Error Handling
                Alert.alert('Error', 'Something went wrong. Please try again.');
            }
        }
    };

    const handleFinish = () => {
        if (!firstName || !lastName || !nationality || !gender || !donorTypeAnswer) {
            Alert.alert('Error', 'Please fill out all fields');
            return;
        }
        
        saveUser();
    };

    return (
        <CommonBackground
            style={nextStyles.backgroundImage}
            titleText={"Complete Your Profile"}
            titleSubText={"Fill in the fields to create your account"}
            logoVisible={true}

        >
            <FlatList
                data={[]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={() => null}
                scrollEnabled={countrySuggestions.length === 0}
                style={nextStyles.fullWidthContainer}
                ListHeaderComponent={
                <View style={nextStyles.fullWidthContent}>
                    <InputField
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <InputField
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                    />

                    <CustomInput
                        placeholder="Select a country"
                        value={nationalityInput}
                        onChangeText={handleNationalityChange}
                        suggestions={countrySuggestions}
                        onSuggestionSelect={handleCountrySelect}
                    />

                    <TwoQuestions
                        titleText={"What sex are you?"}
                        customYesLabel="Female"
                        customNoLabel="Male"
                        answerOne="Female"
                        answerTwo="Male"
                        onAnswerChange={(selectedAnswer) => setGender(selectedAnswer)}
                    />

                    <TwoQuestions
                        titleText={"What do you plan to donate?"}
                        customYesLabel="Blood"
                        customNoLabel="Plasma"
                        onAnswerChange={(selectedAnswer) => setDonorType(selectedAnswer)}
                    />

                    <CommonButton onPress={handleFinish}>
                        Register
                    </CommonButton>
                </View>
            }
            />
        </CommonBackground>
    );
}
