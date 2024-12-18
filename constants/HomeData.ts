import { IconNames } from "@/components/common/CommonIcons";
import { getTimeTillNextDonation } from "@/utils/timeUtils";

const targetDate = new Date("2024-12-31T23:59:59");

export const homeScreenContent = [
    {
        titleText: "Notification",
        contentText: "awesome content",
        icon: IconNames.Notification,
    },
    {
        titleText: "Next Blood Donation",
        contentText: getTimeTillNextDonation(targetDate),
        icon: IconNames.BloodDonated,
    },
    {
        titleText: "Blood Donated",
        contentText: "1.8L",
        icon: IconNames.BloodDrop,
    },
    {
        titleText: "Next Reward",
        contentText: "2 Donations Left",
        icon: IconNames.Reward,
    },
    {
        titleText: "Reward Points",
        contentText: "2450",
        icon: IconNames.Reward,
    },
    {
        titleText: "Next Plasma Donation",
        contentText: "awesome content",
        icon: IconNames.BloodSample,
    },
];
