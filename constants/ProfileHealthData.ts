import { RightTextItem } from "@/components/common/CommonContent";
import { IconNames } from "@/components/common/CommonIcons";

export const profileHealthData = [
    {
        titleText: "Last Donation",
        contentText: "26th September, 2024",
        icon: IconNames.Time,
    },
    {
        titleText: "Times Donated",
        contentText: "9",
        icon: IconNames.Time,
    },

    {
        titleText: "Amount Donated",
        contentText: "14 units of plasma",
        icon: IconNames.BloodDonated,
    },
    {
        titleText: "Iron Levels",
        contentText: "41 ng/ml",
        icon: IconNames.BloodData,
    },
    {
        titleText: "Donation History",
        contentText: "16th July, 2024\n26th September, 2024\nNext Donation",
        icon: IconNames.Notification,
        contentTextSize: "small",
        rightText: [
            {
                type: "expandableContent",
                title: "View Details",
                details: [
                    { left: "Location", right: "Medisch Centrum Veldhoven" },
                    { left: "Type", right: "Blood" },
                    { left: "Amount", right: "0.9 Units" },
                    { left: "Date", right: "2024/07/16" },
                ],
            } as RightTextItem,
            {
                type: "expandableContent",
                title: "View Details",
                details: [
                    { left: "Location", right: "Medisch Centrum Veldhoven" },
                    { left: "Type", right: "Blood" },
                    { left: "Amount", right: "0.8 Units" },
                    { left: "Date", right: "2024/09/26" },
                ],
            } as RightTextItem,
            "30th of October, 2024",
        ]
    }
];