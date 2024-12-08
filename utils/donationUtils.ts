import moment from 'moment';

export const getNextDonationDetails = () => {
    const nextDonationAvailable = moment().add(7, "days").startOf("day");
    const nextDonationText = `${moment.duration(nextDonationAvailable.diff(moment())).humanize()} away`;
    return { nextDonationAvailable, nextDonationText };
};
