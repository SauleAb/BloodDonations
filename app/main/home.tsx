import React, {useEffect} from "react";
import {BackHandler, View} from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import HomeScreenBottom from "@/components/home/HomeScreenBottom";
import commonStyles from "../styles/CommonStyles";
import { homeScreenContent } from "@/constants/HomeData";
import CommonContent from "@/components/common/CommonContent";
import { useUser } from "@/components/UserContext";
import { startNotificationPolling, stopNotificationPolling } from "@/utils/notificationUtils";

export default function Home() {
    const {user} = useUser();
    const userId = user.id;
    
      useEffect(() => {
        startNotificationPolling(userId);
    
        return () => {
          stopNotificationPolling();
        };
      }, [userId]);
    useEffect(() => {
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

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
