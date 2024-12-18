
export enum IconNames {
    BloodDrop = 'BloodDrop',
    BloodDonated = 'BloodDonated',
    BloodSample = 'BloodSample',
    Notification = 'Notification',
    Reward = 'Reward',
    AccountData = 'AccountData',
    BloodData = 'BloodData',
    DonationData = 'DonationData',
    LocationData = 'LocationData',
    Heart = 'Heart',
    Time = 'Time',
    Delete = 'Delete',
    Settings = "Settings",
    Community = "Communtiy",
    Home = "Home",
    Blood = "Blood",
    Pin = "Pin",
    RandomPin = "RandomPin",
    Gift = "Gift",
    Uber = "Uber",
    Tickets = "Tickets",
    Medal = "Medal"
}

export const iconMap: Record<IconNames, any> = {
    [IconNames.BloodDrop]: require('@/assets/icons/blood-drop-icon.png'),
    [IconNames.BloodDonated]: require('@/assets/icons/blood-donated-icon.png'),
    [IconNames.BloodSample]: require('@/assets/icons/blood-sample-icon.png'),
    [IconNames.Notification]: require('@/assets/icons/notification-icon.png'),
    [IconNames.Reward]: require('@/assets/icons/reward-icon.png'),
    [IconNames.AccountData]: require('@/assets/icons/account-data.png'),
    [IconNames.BloodData]: require('@/assets/icons/BloodData.png'),
    [IconNames.DonationData]: require('@/assets/icons/BloodDonationsData.png'),
    [IconNames.LocationData]: require('@/assets/icons/DonationsLocationsData.png'),
    [IconNames.Heart]: require('@/assets/icons/heart.png'),
    [IconNames.Time]: require('@/assets/icons/time.png'),
    [IconNames.Delete]: require('@/assets/icons/trash.png'),
    [IconNames.Settings]: require('@/assets/icons/setting.png'),
    [IconNames.Community]: require('@/assets/icons/community.png'),
    [IconNames.Home]: require('@/assets/icons/home.png'),
    [IconNames.Blood]: require('@/assets/icons/blood.png'),
    [IconNames.Pin]: require('@/assets/icons/Droplet.png'),
    [IconNames.RandomPin]: require('@/assets/icons/random-pin.png'),
    [IconNames.Gift]: require('@/assets/icons/Gift.png'),
    [IconNames.Uber]: require('@/assets/icons/uber.png'),
    [IconNames.Tickets]: require('@/assets/icons/tickets.png'),
    [IconNames.Medal]: require('@/assets/icons/medal.png'),
};