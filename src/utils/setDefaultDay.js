export const setDefaultWritingDay = (isStart, date) => {
  let year = date.getFullYear();
  let month;
  let day;

  if (isStart) {
    month = ("0" + (date.getMonth() + 1)).slice(-2);
    day = ("0" + date.getDate()).slice(-2);
  } else {
    month = ("0" + (date.getMonth() + 1)).slice(-2);
    day = ("0" + (date.getDate() + 7)).slice(-2);
  }

  let hour = ("0" + date.getHours()).slice(-2);
  let min = ("0" + date.getMinutes()).slice(-2);

  if (min >= 50 && min <= 59) {
    hour = date.getHours() + 2;
  } else {
    hour = date.getHours() + 1;
  }

  return `${year}년 ${month}월 ${day}일 ${hour}시`;
};

export const setDefaultOpenDay = (isStart, date) => {
  let year = date.getFullYear();
  let month;
  let day;

  if (isStart) {
    month = ("0" + (date.getMonth() + 1)).slice(-2);
    day = ("0" + (date.getDate() + 7)).slice(-2);
  } else {
    month = ("0" + (date.getMonth() + 1)).slice(-2);
    day = ("0" + (date.getDate() + 14)).slice(-2);
  }

  let hour = ("0" + date.getHours()).slice(-2);
  let min = ("0" + date.getMinutes()).slice(-2);

  if (min >= 50 && min <= 59) {
    hour = date.getHours() + 3;
  } else {
    hour = date.getHours() + 2;
  }

  return `${year}년 ${month}월 ${day}일 ${hour}시`;
};

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
