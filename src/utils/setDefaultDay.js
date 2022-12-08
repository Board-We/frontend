export const setDefaultAttachableDay = (isStart) => {
  const today = new Date();

  let year = today.getFullYear();
  let month;
  let day;

  if (isStart) {
    month = ("0" + (today.getMonth() + 1)).slice(-2);
    day = ("0" + today.getDate()).slice(-2);
    console.log(isStart);
    console.log("m", month);
    console.log("d", day);
  } else {
    month = ("0" + (today.getMonth() + 1)).slice(-2);
    day = ("0" + (today.getDate() + 7)).slice(-2);
  }

  let hour = ("0" + today.getHours()).slice(-2);
  let min = ("0" + today.getMinutes()).slice(-2);

  if (min >= 50 && min <= 59) {
    hour = today.getHours() + 2;
  } else {
    hour = today.getHours() + 1;
  }

  return `${year}년 ${month}월 ${day}일 ${hour}시`;
};

export const setDefaultOpenDay = (isStart) => {
  const today = new Date();

  let year = today.getFullYear();
  let month;
  let day;

  if (isStart === true) {
    month = ("0" + (today.getMonth() + 1)).slice(-2);
    day = ("0" + (today.getDate() + 7)).slice(-2);
  } else {
    month = ("0" + (today.getMonth() + 1)).slice(-2);
    day = ("0" + (today.getDate() + 14)).slice(-2);
  }

  let hour = ("0" + today.getHours()).slice(-2);
  let min = ("0" + today.getMinutes()).slice(-2);

  if (min >= 50 && min <= 59) {
    hour = today.getHours() + 3;
  } else {
    hour = today.getHours() + 2;
  }

  return `${year}년 ${month}월 ${day}일 ${hour}시`;
};
