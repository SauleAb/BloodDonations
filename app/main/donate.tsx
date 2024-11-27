import CommonBackground from "@/components/common/CommonBackground";
import CommonContent, { IconNames } from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import { View, StyleSheet } from "react-native"; // Ensure StyleSheet is imported

export default function Donate() {
    return (
        <View style={styles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <CommonScrollElement>
                    <CommonContent
                        titleText={"Next Donation Available In"}
                        contentText={"14 units of plasma"}
                        icon={IconNames.BloodDonated}
                    />
                    <CommonContent
                        titleText={"Donation Location"}
                        contentText={"41 ng/ml"}
                        icon={IconNames.BloodData}
                    />
                </CommonScrollElement>
            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
});
