import {IconNames} from "@/components/common/CommonIcons";

export const getChallengesData = () => [
    {
        titleText: "Challenge",
        challengeTitleText: "Breda Challenge",
        challengeDescriptionText: "Challenge for people donating in Breda.",
        contentText: "Location\nGoal\nCurrent Donations\nYour Participation\nRewards If Completed\nEnd Date",
        icon: IconNames.BloodDrop,
        contentTextSize: "small",
        rightText: [
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        ],
        buttons: [
            {
                label: "Accept",
                onPressOn: () => console.log("Challenge Accepted"),
                onPressOff: () => console.log("Challenge Declined"),
            },
            {
                label: "Participate",
                onPressOn: () => console.log("Participation Started"),
                onPressOff: () => console.log("Participation Stopped"),
            },
        ],
    }
]