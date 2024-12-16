import React, {useState, useContext} from "react";
import { View } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import { profileContent } from "@/constants/ProfileData";
import { profileHealthData } from "@/constants/ProfileHealthData";
import { commonStyles } from "@/app/styles/CommonStyles";
import SecondaryNavBar from "@/components/common/CommonSecondaryNavBar";

const validateTextSize = (size: any): "small" | "large" | undefined => {
    return size === "small" || size === "large" ? size : undefined;
};

export default function Profile() {
    const [activeTab, setActiveTab] = useState<'profile' | 'health'>('profile');

    const renderContent = () => {
        if (activeTab === "profile") {
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
                </CommonScrollElement>
            )
        }
        else {
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
                </CommonScrollElement>
            )
        }
    }
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
