import moment from "moment";

export const generateDisabledDates = (nextDonationAvailable: moment.Moment): Record<string, { disabled: boolean }> => {
    const today = moment();
    const disabledDates: Record<string, { disabled: boolean }> = {};
    while (today.isBefore(nextDonationAvailable)) {
        disabledDates[today.format("YYYY-MM-DD")] = { disabled: true };
        today.add(1, "day");
    }
    return disabledDates;
};