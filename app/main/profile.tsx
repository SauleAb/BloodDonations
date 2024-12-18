import React, { useState } from "react";
import { View } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import { getProfileContent } from "@/constants/ProfileData";
import { profileHealthData } from "@/constants/ProfileHealthData";
import { commonStyles } from "@/app/styles/CommonStyles";
import SecondaryNavBar from "@/components/common/CommonSecondaryNavBar";
import { useUser } from "@/components/UserContext";
import CommonButton from "@/components/common/CommonButton";
import {router} from "expo-router";

const validateTextSize = (size: any): "small" | "large" | undefined => {
    return size === "small" || size === "large" ? size : undefined;
};

export default function Profile() {
    const { user } = useUser();
    const { logout } = useUser();
    const [activeTab, setActiveTab] = useState<"profile" | "health">("profile");

    const handleLogout = async () => {
        await logout();
        router.replace('/login');
    };
    const renderContent = () => {
        if (activeTab === "profile") {
            const profileContent = getProfileContent(user); // Get dynamic profile content
            return (
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

                    <CommonButton onPress={handleLogout}>Log Out</CommonButton>
                </CommonScrollElement>
            );
        } else {
            return (
                <CommonScrollElement>
                    {profileHealthData.map((item, index) => (
                        <CommonContent
                            key={index}
                            titleText={item.titleText}
                            contentText={item.contentText}
                            icon={item.icon}
                            contentTextSize={validateTextSize(item.contentTextSize)}
                            rightText={item.rightText}
                        />
                    ))}

                    <CommonButton onPress={handleLogout}>Log Out</CommonButton>
                </CommonScrollElement>
            );
        }
    };

    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                {renderContent()}
            </CommonBackground>
            <SecondaryNavBar
                tabs={[
                    { key: "profile", label: "Profile" },
                    { key: "health", label: "Health" },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </View>
    );
}
