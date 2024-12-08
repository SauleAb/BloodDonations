import React from "react";
import { View } from "react-native";
import CommonButton from "@/components/common/CommonButton";
import { TIME_SLOTS } from "@/constants/DonateData";
import styles from "@/app/styles/DonateStyle";

interface TimeSlotSelectorProps {
    selectedTime: string;
    setSelectedTime: (time: string) => void;
    resetFields: () => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ selectedTime, setSelectedTime, resetFields }) => {
    return (
        <View>
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
            {selectedTime && (
                <CommonButton
                    style={styles.center}
                    size="small"
                    onPress={resetFields}
                >
                    Request {"\n"}Appointment
                </CommonButton>
            )}
        </View>
    );
};

export default TimeSlotSelector;