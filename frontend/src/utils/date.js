import moment from 'moment';
const dateFormat = 'YYYY-MM-DD HH:mm Z';

export const dateFromString = string => {
  return moment(string, dateFormat);
};
