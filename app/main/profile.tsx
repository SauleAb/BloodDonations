import React from "react";
import { View } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import { profileContent } from "@/constants/ProfileData";
import { commonStyles } from "@/app/styles/CommonStyles";

const validateTextSize = (size: any): "small" | "large" | undefined => {
    return size === "small" || size === "large" ? size : undefined;
};

export default function Profile() {
    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <CommonScrollElement>
                    {profileContent.map((item, index) => (
                        <CommonContent
                            key={index}
                            titleText={item.titleText}
                            contentText={item.contentText}
                            icon={item.icon}
                            contentTextSize={validateTextSize(item.contentTextSize)}
                            rightText={item.rightText}
                            showContent={item.showContent}
                        />
                    ))}
                </CommonScrollElement>
            </CommonBackground>
        </View>
    );
}
