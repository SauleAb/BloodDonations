import React, { useEffect, useState } from 'react';
import {View, ViewStyle} from 'react-native';
import CommonTextBold from "@/components/Common/CommonTextBold";

type TimeUntilProps = {
    targetDate: Date;
    style?: ViewStyle;
};

const TimeTillNextDonation: React.FC<TimeUntilProps> = ({ targetDate, style }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

                setTimeLeft({ days, hours, minutes });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
            }
        };

        // Calculate immediately and then set up an interval to update every minute
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

        // Clear interval on component unmount
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <View>
            <CommonTextBold style={style}>
                {timeLeft.days} days, {timeLeft.hours} hours, and {timeLeft.minutes} minutes left
            </CommonTextBold>
        </View>
    );
};



export default TimeTillNextDonation;