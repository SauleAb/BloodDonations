import React, {useState} from "react";
import { View } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import { profileContent } from "@/constants/ProfileData";
import { profileBloodData } from "@/constants/ProfileBloodData";
import { commonStyles } from "@/app/styles/CommonStyles";
import SecondaryNavBar from "@/components/common/CommonSecondaryNavBar";

const validateTextSize = (size: any): "small" | "large" | undefined => {
    return size === "small" || size === "large" ? size : undefined;
};

export default function Profile() {
    const [activeTab, setActiveTab] = useState<'profile' | 'blood data'>('profile');

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
                    {profileBloodData.map((item, index) => (
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
    }
    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                {renderContent()}
            </CommonBackground>
            <SecondaryNavBar
                tabs={[
                    { key: "profile", label: "Profile" },
                    { key: "blood data", label: "Blood Data" },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </View>
    );
}
