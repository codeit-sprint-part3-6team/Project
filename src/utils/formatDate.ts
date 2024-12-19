const formatDate = (date: string, includeTime: boolean = false): string => {
  if (!date) {
    console.error('Invalid date string');
    return '';
  }

  let formattedDate = '';

  let datePart: string;
  let timePart: string;
  if (date.includes('T')) {
    [datePart, timePart] = date.split('T');
  } else if (date.includes(' ')) {
    [datePart, timePart] = date.split(' ');
  }

  const [year, month, day] = datePart.split('-');
  formattedDate = `${year}.${month}.${day}`;

  if (includeTime && timePart) {
    const time = timePart.split('.')[0];
    if (time) {
      formattedDate += ` ${time.substring(0, 5)}`;
    }
  }

  return formattedDate;
};

export default formatDate;
