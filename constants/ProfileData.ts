import { RightTextItem } from "@/components/common/CommonContent";
import { IconNames } from "@/components/common/CommonIcons";

export const getProfileContent = (user: any) => [
    {
        titleText: "Full Name",
        contentText: user?.first_name + ' ' + user?.last_name || "N/A",
    },
    {
        titleText: "Email",
        contentText: user?.username || "N/A",
    },
    {
        titleText: "Health Information",
        contentText: "Blood Type\nNationality\nSex\nDate Of Birth\nEligible Status",
        icon: IconNames.BloodDrop,
        contentTextSize: "small",
        rightText: [
            user?.bloodType || "N/A",
            user?.nationality || "N/A",
            user?.sex || "N/A",
            user?.dateOfBirth || "N/A",
            { type: "switch", switchValue: user?.eligible || false, onToggle: () => console.log("Eligible switched!") } as RightTextItem,
        ],
    },
    {
        titleText: "Phone Number",
        contentText: user?.phoneNumber || "N/A",
        icon: IconNames.BloodDonated,
    },
    {
        titleText: "City",
        contentText: user?.city || "N/A",
        icon: IconNames.BloodDonated,
    },
    {
        titleText: "Address",
        contentText: user?.address || "N/A",
        icon: IconNames.BloodDonated,
    },
    {
        titleText: "Notifications",
        contentText: "Donation Reminder\nFriend Activity",
        icon: IconNames.Notification,
        contentTextSize: "small",
        rightText: [
            { type: "switch", switchValue: user?.notifications?.donationReminder || false, onToggle: () => console.log("Donation Reminder switched!") },
            { type: "switch", switchValue: user?.notifications?.friendActivity || false, onToggle: () => console.log("Friend Activity switched!") },
        ],
    },
    {
        titleText: "Home Screen",
        contentText: "Friend Activity\nDonation Timer\nAmount Donated",
        icon: IconNames.Notification,
        contentTextSize: "small",
        rightText: [
            { type: "switch", switchValue: user?.homeScreen?.friendActivity || false, onToggle: () => console.log("Friend Activity switched!") },
            { type: "switch", switchValue: user?.homeScreen?.donationTimer || false, onToggle: () => console.log("Donation Timer switched!") },
            { type: "switch", switchValue: user?.homeScreen?.amountDonated || false, onToggle: () => console.log("Amount Donated switched!") },
        ],
    },
    {
        titleText: "Appearance",
        contentText: "Dark Mode\nBig UI Size",
        icon: IconNames.Notification,
        contentTextSize: "small",
        rightText: [
            { type: "switch", switchValue: user?.appearance?.darkMode || false, onToggle: () => console.log("Dark mode switched!") },
            { type: "switch", switchValue: user?.appearance?.bigUiSize || false, onToggle: () => console.log("Big UI size switched!") },
        ],
    },
    {
        titleText: "Edit Details",
        icon: IconNames.Settings,
        showContent: false,
    },
];
