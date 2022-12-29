export const formattingDateObject = (date) => {
  let year = date.getFullYear();
  let month;
  let day;

  month = ("0" + (date.getMonth() + 1)).slice(-2);
  day = ("0" + date.getDate()).slice(-2);

  let hour = ("0" + date.getHours()).slice(-2);
  let min = ("0" + date.getMinutes()).slice(-2);

  return `${year}년 ${month}월 ${day}일 ${hour}시`;
};

export const setDateISOstring = (date) => {
  console.log(date);
  const TIME_ZONE = 3240 * 10000;
  const filterDateString = new Date(+date + TIME_ZONE)
    .toISOString()
    .slice(0, -5);
  return filterDateString;
};
