import React, { useState } from "react";
import { View } from "react-native";
import { Href } from "expo-router";
import CommonBackground from "@/components/common/CommonBackground";
import CommonButton from "@/components/common/CommonButton";
import InputField from "@/components/InputField";
import { REGISTER_FORM_FIELDS, REGISTER_PAGE_TEXT } from "@/constants/RegisterData";
import { registerStyles } from "@/app/styles/RegisterStyle";

interface FormState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Register() {
    const [formState, setFormState] = useState<FormState>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (key: keyof FormState, value: string) => {
        setFormState((prevState) => ({ ...prevState, [key]: value }));
    };

    return (
        <View style={registerStyles.container}>
            <CommonBackground
                style={registerStyles.backgroundImage}
                titleText={REGISTER_PAGE_TEXT.title}
                titleSubText={REGISTER_PAGE_TEXT.subTitle}
                logoVisible={true}
            >
                {REGISTER_FORM_FIELDS.map(({ placeholder, secureTextEntry, stateSetterKey }) => (
                    <InputField
                        key={placeholder}
                        placeholder={placeholder}
                        value={formState[stateSetterKey.replace("set", "").toLowerCase() as keyof FormState]}
                        onChangeText={(value) => handleInputChange(stateSetterKey.replace("set", "").toLowerCase() as keyof FormState, value)}
                        secureTextEntry={secureTextEntry}
                        placeholderTextColor="#5a5959"
                    />
                ))}

                <CommonButton href={"/registerdonorinfo" as Href<string | object>}>
                    {REGISTER_PAGE_TEXT.buttonText}
                </CommonButton>
            </CommonBackground>
        </View>
    );
}
