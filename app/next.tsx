import React, { useState } from 'react';
import { Alert, Text, View, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import nextStyles from './styles/NextStyle';
import CommonBackground from "@/components/common/CommonBackground";
import { useUser } from '@/components/UserContext';
import InputField from '@/components/InputField';
import CommonButton from '@/components/common/CommonButton';
import defaultUser from '@/components/user';

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
    const [nationality, setNationality] = useState(countries[0]);
    const [gender, setGender] = useState('Male');
    const [plasmaDonor, setPlasmaDonor] = useState(false);
    const [bloodDonor, setBloodDonor] = useState(!plasmaDonor);
    const router = useRouter();
    const { login } = useUser();

    const saveUser = async () => {
        try {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                Alert.alert('Error', 'Invalid email format');
                return;
            }

            // Change these field names to what the backend expects: first_name and last_name
            const newUserData = {
                ...defaultUser,
                username: email,
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
                nationality: nationality,
                gender: gender,
                plasmaDonor: plasmaDonor,
                bloodDonor: bloodDonor,
                donations: [],
                can_donate: true,
                birthdate: "1990-01-01",
                city: "Amsterdam"
            };

            const response = await fetch(`${API_BASE_URL}/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUserData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Server error while creating user:', errorMessage);
                Alert.alert('Error', 'Could not create account. Please try again.');
                return;
            }

            const createdUser = await response.json();
            console.log('Created user:', createdUser);

            await login(createdUser, true);

            Alert.alert('Success', 'Account created successfully!');
            router.replace('/');
        } catch (error: unknown) {
            console.error('Error saving user:', error);
            Alert.alert('Error', 'Could not save account. Please try again.');
        }
    };

    const handleFinish = () => {
        if (!firstName || !lastName) {
            Alert.alert('Error', 'Please fill out all fields');
            return;
        }
        
        saveUser();
    };

    const toggleDonorType = () => {
        setPlasmaDonor(!plasmaDonor);
        setBloodDonor(plasmaDonor);
    };

    return (
        <CommonBackground style={nextStyles.backgroundImage} titleText={"Complete Your Profile"} logoVisible={true}>
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

            <View style={{ marginVertical: 10, width: '100%' }}>
                <Text style={{ color: 'white', marginBottom: 5 }}>Nationality</Text>
                <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: 'white' }}>
                    <Picker
                        selectedValue={nationality}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue) => setNationality(itemValue)}
                    >
                        {countries.map((country, index) => (
                            <Picker.Item label={country} value={country} key={index}/>
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={{ marginVertical: 10, width: '100%' }}>
                <Text style={{ color: 'white', marginBottom: 5 }}>Gender</Text>
                <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: 'white' }}>
                    <Picker
                        selectedValue={gender}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue) => setGender(itemValue)}
                    >
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                </View>
            </View>

            <View style={{ marginVertical: 10 }}>
                <Text style={{ color: 'white', marginBottom: 5 }}>Plasma Donor / Blood Donor</Text>
                <Text style={{ color: 'white' }}>Plasma Donor: {plasmaDonor ? 'Yes' : 'No'}</Text>
                <Text style={{ color: 'white' }}>Blood Donor: {bloodDonor ? 'Yes' : 'No'}</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={plasmaDonor ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={toggleDonorType}
                    value={plasmaDonor}
                />
            </View>

            <CommonButton onPress={handleFinish} style={nextStyles.registerButton}>
                <Text>Register</Text>
            </CommonButton>
        </CommonBackground>
    );
}
