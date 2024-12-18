import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { IconNames, iconMap } from "@/components/common/CommonContent";
import CommonText from "@/components/common/CommonText";
import { useUser } from '@/components/UserContext';

type CommonRewardBoxProps = {
    titleText: string;
    amountText: string;
    icon: IconNames;
    onPress: () => void; // ask for confirmation here
};

const CommonRewardBox: React.FC<CommonRewardBoxProps> = ({ titleText, icon, amountText, onPress }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const iconSource = iconMap[icon];

    const { user } = useUser();

    const handlePress = () => {
        setErrorMessage('') // ensure previous error messages arent still there
        setIsModalVisible(true); // Show the confirmation modal
    };

    const handleConfirm = () => {
        const price = parseInt(amountText)
        if(user.rewardPoints >= price){
            user.rewardPoints -= price
            setIsModalVisible(false); // Close the modal
            onPress(); // Execute the redeem action
        } else {
            setErrorMessage('You do not have enough points to redeem this reward.'); // Set the error message
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Simply close the modal
    };

    return (
        <>
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={styles.greyBar}>
                <CommonText bold style={styles.label}>{titleText}</CommonText>
                <CommonText style={styles.label}>{amountText}</CommonText>
            </View>
            <View style={[styles.contentWrapper, styles.shadow]}>
                <View style={styles.content}>
                    <Image source={iconSource} style={styles.contentIcon} />
                </View>
            </View>
            </TouchableOpacity>
            
            {/* Confirmation Modal */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={handleCancel} // Handle Android back button
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Are you sure you want to redeem this reward?
                        </Text>
                        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                        <View style={styles.modalButtons}>
                            <Button title="Cancel" onPress={handleCancel} color="#888" />
                            <Button title="Confirm" onPress={handleConfirm} color="#4CAF50" />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '40%',
        marginHorizontal: 15,
    },
    greyBar: {
        backgroundColor: 'rgba(223,223,223,0.5)',
        height: 60,
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        paddingHorizontal: 20,
        paddingVertical: 4,
        flexDirection: 'column',
    },
    label: {
        fontSize: 16,
        color: '#404040',
        textAlign: 'center', // Ensure the text itself is centered
    },
    contentWrapper: {
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    shadow: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    content: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        alignItems: 'center', // Center the icon
    },
    contentIcon: {
        width: 80,
        height: 80,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    errorMessage: {
        fontSize: 14,
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default CommonRewardBox;