import React, { createContext, useState, useContext } from 'react';

// Create User Context
const UserContext = createContext();

// User Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        // Basic Info
        firstName: 'Eitvidas',
        lastName: 'Semenko',
        email: 'WaterSandwich@blet.co.uk',
        password: 'onetwothree',
        profilePicture: 'https://www.google.com/imgres?q=circular%20profile%20pic&imgurl=https%3A%2F%2Fa.storyblok.com%2Ff%2F191576%2F1200x800%2F215e59568f%2Fround_profil_picture_after_.webp&imgrefurl=https%3A%2F%2Fwww.photoroom.com%2Ftools%2Fround-profile-picture&docid=IjCqey4zpl0BJM&tbnid=0Dcuta4WXRYMgM&vet=12ahUKEwj7x-Pl8ZyKAxUa_QIHHR_iA0gQM3oECHoQAA..i&w=1200&h=800&hcb=2&ved=2ahUKEwj7x-Pl8ZyKAxUa_QIHHR_iA0gQM3oECHoQAA',
        rewardPoints: 0,
        friendsList: [],
        posts: [],
    
        // Plasma Specific Info
        plasmaDonor: false,
        nextPlasmaDonation: Date,
    
        // Blood Specific Info
        bloodDonor: false,
        nextBloodDonation: Date,
        totalBloodDonated: 0,
    
        // Donation Info
        donationHistory: [],
        timesDonated: 0,
        lastDonation: '',
    
        // Other
        ironLevels: 0,
    
        // Prefferences (this is where all the settings should go)
        darkModeEnabled: false,
    
        
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook for using User Context
export const useUser = () => useContext(UserContext);
