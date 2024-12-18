import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import CommonText from "@/components/common/CommonText";

type TwoQuestionsProps = {
    titleText: string;
    onAnswerChange: (answer: boolean | string | null) => void;
    customYesLabel?: string;
    customNoLabel?: string;
    answerOne?: string;
    answerTwo?: string;
};

const TwoQuestions: React.FC<TwoQuestionsProps> = ({
                                                       titleText,
                                                       onAnswerChange,
                                                       customYesLabel,
                                                       customNoLabel,
                                                       answerOne,
                                                       answerTwo,
                                                   }) => {
    const [selected, setSelected] = useState<boolean | string | null>(null);

    const handlePress = (answer: boolean, customAnswer?: string) => {
        const valueToReturn = customAnswer ?? answer;
        setSelected(valueToReturn);
        onAnswerChange(valueToReturn);
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
                        selected === (answerOne ?? true) && styles.buttonSelectedYes,
                    ]}
                    onPress={() => handlePress(true, answerOne)}
                >
                    <CommonText bold style={styles.buttonText}>
                        {customYesLabel || "Yes"}
                    </CommonText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.button,
                        selected === (answerTwo ?? false) && styles.buttonSelectedNo,
                    ]}
                    onPress={() => handlePress(false, answerTwo)}
                >
                    <CommonText bold style={styles.buttonText}>
                        {customNoLabel || "No"}
                    </CommonText>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '90%',
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
        paddingTop: 5,
        lineHeight: 25,
        fontSize: 16,
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