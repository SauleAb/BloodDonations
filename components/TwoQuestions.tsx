import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CommonText from "@/components/common/CommonText";

type TwoQuestionsProps = {
    titleText: string;
    onAnswerChange: (answer: string | null) => void;
};

const TwoQuestions: React.FC<TwoQuestionsProps> = ({ titleText, onAnswerChange }) => {
    const [selected, setSelected] = useState<string | null>(null);

    const handlePress = (answer: string) => {
        setSelected(answer);
        onAnswerChange(answer);
    };

    return (
        <View style={[styles.container, styles.shadow]}>
            <View style={styles.greyBar}>
                <CommonText style={styles.label}>{titleText}</CommonText>
            </View>

            <View style={styles.content}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selected === 'yes' && styles.buttonSelectedYes,
                    ]}
                    onPress={() => handlePress('yes')}
                >
                    <CommonText bold style={styles.buttonText}>
                        Yes
                    </CommonText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.button,
                        selected === 'no' && styles.buttonSelectedNo,
                    ]}
                    onPress={() => handlePress('no')}
                >
                    <CommonText bold style={styles.buttonText}>
                        No
                    </CommonText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '87%',
        marginBottom: 20,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    shadow: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    greyBar: {
        backgroundColor: 'rgb(223,223,223)',
        minHeight: 30,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 4,
        flexWrap: 'wrap',
    },
    label: {
        fontSize: 25,
        color: '#404040',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
        paddingHorizontal: 0,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    button: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSelectedYes: {
        backgroundColor: '#b4ffb4',
    },
    buttonSelectedNo: {
        backgroundColor: '#ff9393',
    },
    buttonText: {
        fontSize: 30,
        color: '#404040',
    },
    buttonTextSelected: {
        color: '#fff',
    },
});

export default TwoQuestions;