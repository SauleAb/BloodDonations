import React from "react";
import { View } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import HomeScreenBottom from "@/components/home/HomeScreenBottom";
import commonStyles from "../styles/CommonStyles";
import { homeScreenContent } from "@/constants/HomeData";
import CommonContent from "@/components/common/CommonContent";

export default function Home() {
    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <CommonScrollElement>
                    {homeScreenContent.map((item, index) => (
                        <CommonContent
                            key={index}
                            titleText={item.titleText}
                            contentText={item.contentText}
                            icon={item.icon}
                        />
                    ))}
                    <HomeScreenBottom />
                </CommonScrollElement>
            </CommonBackground>
        </View>
    );
}
