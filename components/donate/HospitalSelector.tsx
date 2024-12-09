import React from "react";
import { View } from "react-native";
import CommonButton from "@/components/common/CommonButton";
import CommonText from "@/components/common/CommonText";
import { AVAILABLE_LOCATIONS } from "@/constants/DonateData";
import styles from "@/app/styles/DonateStyle";

interface HospitalSelectorProps {
    selectedHospital: string;
    setSelectedHospital: (hospitalName: string) => void;
}

const HospitalSelector: React.FC<HospitalSelectorProps> = ({ selectedHospital, setSelectedHospital }) => {
    return (
        <View>
            <CommonText bold style={styles.title}>
                Available Locations
            </CommonText>
            {AVAILABLE_LOCATIONS.map((location, index) => (
                <View style={styles.row} key={index}>
                    <CommonText style={styles.friend}>
                        {location.name}
                        {"\n"}
                        {location.hours}
                    </CommonText>
                    <CommonButton
                        size="small"
                        onPress={() => setSelectedHospital(location.name)}
                    >
                        Set{"\n"}Appointment
                    </CommonButton>
                </View>
            ))}
            {selectedHospital && (
                <CommonText bold style={styles.title}>
                    {selectedHospital}
                </CommonText>
            )}
        </View>
    );
};

export default HospitalSelector;