const user = {
    // Basic Info
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profilePicture: String,
    rewardPoints: 200,
    friendsList: [],
    posts: [],

    // Plasma Specific Info
    plasmaDonor: false,
    nextPlasmaDonation: Date,

    // Blood Specific Info
    bloodDonor: false,
    nextBloodDonation: Date,
    totalBloodDonated: 0,

    // DEMO PURPOSES
    // profile information
    bloodType: "AB+",
    nationality: "Dutch",
    sex: "Male",
    dateOfBirth: "21-07-2001",
    eligible: false,

    phoneNumber: "06 12345678",
    city: "",
    address: "Achtseweg Zuid 151C",

    // Donation Info
    donationHistory: [],
    timesDonated: 0,
    lastDonation: '',

    // Other
    ironLevels: 0,

    // Prefferences (this is where all the settings should go)
    darkModeEnabled: false,

    
};

export default user;