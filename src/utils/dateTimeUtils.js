import moment from 'moment'

export const getCurrentTime = () => {
    return moment().format('hh:mm a');
};
