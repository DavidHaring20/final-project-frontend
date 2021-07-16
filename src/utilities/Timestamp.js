import { DateTime } from 'luxon';

export const dayOfMonthSuffix = function (day) {
  if (day >= 11 && day <= 13)
    return 'th';
  switch (day % 10) {
    case 1:  return 'st';
    case 2:  return 'nd';
    case 3:  return 'rd';
    default: return 'th';
  }
}

export const dateTimeFormat = function (timestamp, format) {
  return timestamp.toFormat(format.replace('eee', `'${dayOfMonthSuffix(timestamp.day)}'`));
}

export const formatDateTime = function (timestamp, timezone = '', time = true) {
  if (typeof(timestamp) === 'undefined')
    return 'undefined';
  if (typeof(timestamp) === 'string')
    timestamp = (new Date(timestamp)).getTime() / 1000;
  if (typeof(timestamp) === 'number')
    timestamp = DateTime.fromSeconds(timestamp);
  if (timezone === 'ref')
    timezone = this.$service.fixture.referentTimezone;
  if (timezone)
    timestamp = timestamp.setZone(timezone);
  if (timestamp.toSeconds() === 0)
    return '/';

  // var format = time ? 'LLL deee yyyy, hh:mm a' : 'LLL deee yyyy';
  var format = time ? 'LLL deee yyyy, HH:mm' : 'LLL deee yyyy';

  return dateTimeFormat(timestamp, format);
}

export const secondsFormat = function (secondsRaw) {
  let minutes = Math.floor(secondsRaw / 60);
  let seconds = secondsRaw % 60;

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return minutes + ':' + seconds;
}

export const dateTimeFromTimestamp = function (timestamp) {
  if (typeof(timestamp) === 'string')
    timestamp = (new Date(timestamp)).getTime() / 1000;
  if (typeof(timestamp) === 'number')
    timestamp = DateTime.fromSeconds(timestamp);
  return timestamp;
}
