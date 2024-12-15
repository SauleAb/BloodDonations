import { RightTextItem, IconNames } from "@/components/common/CommonContent";

export const profileContent = [
    {
        titleText: "Full Name",
        contentText: "Garfield Gingerman",
    },
    {
        titleText: "Username",
        contentText: "bloodforlasagna",
    },
    {
        titleText: "Health Information",
        contentText: "Blood Type\nNationality\nSex\nDate Of Birth\nEligible Status",
        icon: IconNames.BloodDrop,
        contentTextSize: "small",
        rightText: [
            "A+",
            "Netherlands",
            "Male",
            "19/19/1999",
            { type: "switch", switchValue: true, onToggle: () => console.log("Eligible switched!") } as RightTextItem,
        ],
    },
    {
        titleText: "Phone Number",
        contentText: "+31 6 12 34 56 78",
        icon: IconNames.BloodDonated,
    },
    {
        titleText: "City",
        contentText: "Eindhoven",
        icon: IconNames.BloodDonated,
    },
    {
        titleText: "Address",
        contentText: "Zwaanstraat 1",
        icon: IconNames.BloodDonated,
    },
    {
        titleText: "Notifications",
        contentText: "Donation Reminder\nFriend Activity",
        icon: IconNames.Notification,
        contentTextSize: "small",
        rightText: [
            { type: "switch", switchValue: false, onToggle: () => console.log("Eligible switched!") } as RightTextItem,
            { type: "switch", switchValue: false, onToggle: () => console.log("Friend activity switched!") } as RightTextItem,
        ],
    },
    {
        titleText: "Home Screen",
        contentText: "Friend Activity\nDonation Timer\nAmount Donated",
        icon: IconNames.Notification,
        contentTextSize: "small",
        rightText: [
            { type: "switch", switchValue: false, onToggle: () => console.log("Friend activity switched!") } as RightTextItem,
            { type: "switch", switchValue: false, onToggle: () => console.log("Donation timer switched!") } as RightTextItem,
            { type: "switch", switchValue: false, onToggle: () => console.log("Amount donated switched!") } as RightTextItem,
        ],
    },
    {
        titleText: "Appearance",
        contentText: "Dark Mode\nBig UI Size",
        icon: IconNames.Notification,
        contentTextSize: "small",
        rightText: [
            { type: "switch", switchValue: false, onToggle: () => console.log("Dark mode switched!") } as RightTextItem,
            { type: "switch", switchValue: false, onToggle: () => console.log("Big UI size switched!") } as RightTextItem,
        ],
    },
    {
        titleText: "Edit Details",
        icon: IconNames.Settings,
        showContent: false,
    },
];