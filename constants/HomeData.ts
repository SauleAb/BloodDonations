import React, { useState, useEffect } from "react";
import { IconNames } from "@/components/common/CommonIcons";
import { fetchTotalBloodDonated } from "@/utils/donationUtils";
import { getTimeTillNextDonation } from "@/utils/timeUtils";

const targetDate = new Date("2024-12-31T23:59:59");

type HomeScreenContentProps = {
    userId: number; 
};

export const useHomeScreenData = (userId: number) => {
    const [totalBloodDonated, setTotalBloodDonated] = useState(0);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            const total = await fetchTotalBloodDonated(userId);
            setTotalBloodDonated(total);
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, [userId]);

    return [
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
            contentText: `${totalBloodDonated} ml`,
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
};
