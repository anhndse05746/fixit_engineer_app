export const dateFormant = (strFullDate) => {
  if (strFullDate) {
    let arr_strDate_time = strFullDate.split(' ');
    return format(new Date(arr_strDate_time[0]), 'MM/dd/yyyy');
  }
  return null;
};

export const formatTime = (params) => {
  if (params) {
    let temp = params.spli(' ');

    let date = temp[0];
    let temp1 = date.split('-');
    let year = temp1[0];
    let month = temp1[1];
    let day = temp1[2];

    let time = temp[1];
    let temp2 = time.split(':');
    let hour = Number.parseInt(temp2[0]);
    let minute = temp2[1];

    if (hour < 12) {
      return month + '/' + day + '/' + year + ' ' + hour + ':' + minute + 'am';
    } else if (hour === 12) {
      return month + '/' + day + '/' + year + ' ' + 12 + ':' + minute + 'pm';
    } else {
      return (
        month + '/' + day + '/' + year + ' ' + (hour - 12) + ':' + minute + 'am'
      );
    }
  }
};

export const convertDateStrToDate = (dateStr) => {
  if (dateStr) {
    let splitDateStr = dateStr.split('/');
    const month = Number.parseInt(splitDateStr[0]);
    const day = Number.parseInt(splitDateStr[1]);
    const year = Number.parseInt(splitDateStr[2]);
    return new Date(year, month - 1, day + 1);
  }
  return null;
};
