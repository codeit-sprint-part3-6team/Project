const formatDate = (date: string) => {
  const formated = date.split(' ')[0].replaceAll('-', '.');
  return formated;
};

export default formatDate;
