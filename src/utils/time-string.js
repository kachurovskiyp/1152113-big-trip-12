export const getTimeString = (time, flag) => {
  let timeString = ``;

  const formatDatetime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  if (flag === `datetime`) {
    timeString = `${time.getFullYear()}-${formatDatetime(time.getUTCDate())}T${formatDatetime(time.getUTCHours())}:${formatDatetime(time.getMonth())}-${formatDatetime(time.getUTCMinutes())}`;
    return timeString;
  }

  if (flag === `edittime`) {
    timeString = `${formatDatetime(time.getUTCDate())}/${formatDatetime(time.getMonth())}/${time.getFullYear() - 2000}`;
    return timeString;
  }

  if (flag === `time`) {
    timeString = `${formatDatetime(time.getUTCHours())}:${formatDatetime(time.getUTCMinutes())}`;
    return timeString;
  }

  return null;
};
