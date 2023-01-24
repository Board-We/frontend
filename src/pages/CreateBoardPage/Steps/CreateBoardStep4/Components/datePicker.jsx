import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SmallTitle from "../../../../../components/label/smallTitle";
import { get4WeekDateTime } from "../../../../../utils/datetime";
import Picker from "./picker";

const DatePicker = ({ text, datetime, selectedDatetime, setter, step }) => {
  const [dateObjects, setDateObjects] = useState([]);
  const [years, setYears] = useState({});
  const [dates, setDates] = useState({});
  const [hours, setHours] = useState({});
  const [selectedYear, setSelectedYear] = useState(
    `${selectedDatetime?.getFullYear()}년`
  );
  const [selectedDate, setSelectedDate] = useState(
    `${selectedDatetime?.getMonth() + 1}월${selectedDatetime?.getDate()}일`
  );
  const [selectedHour, setSelectedHour] = useState(
    `${selectedDatetime?.getHours()}시`
  );

  useEffect(() => {
    createDateObjects();
  }, [step]);

  useEffect(() => {
    parseDateObjects();
  }, [dateObjects]);

  useEffect(() => {
    initSelectedTime();
  }, [years, dates, hours]);

  useEffect(() => {
    setDateByYear();
  }, [selectedYear]);

  useEffect(() => {
    setHourByDate();
  }, [selectedDate]);

  useEffect(() => {
    setDateTime();
  }, [selectedYear, selectedDate, selectedHour]);

  const setDateTime = useCallback(() => {
    const newDateTime = new Date();
    newDateTime.setFullYear(selectedYear.replace("년", ""));
    newDateTime.setMonth(selectedDate.split("월")[0] - 1);
    newDateTime.setDate(selectedDate.split("월")[1].replace("일", ""));
    newDateTime.setHours(selectedHour.replace("시", ""));
    newDateTime.setMinutes(0);
    newDateTime.setSeconds(0);
    setter(newDateTime);
  }, []);

  const createDateObjects = () => {
    const newDateObjects = get4WeekDateTime(
      datetime() ? datetime() : new Date()
    );
    setDateObjects(newDateObjects);
  };

  const parseDateObjects = () => {
    if (dateObjects.length === 0) return;

    const newYears = {};
    const newDates = {};
    const newHours = {};

    dateObjects.forEach((el) => {
      const yearStr = `${el.getFullYear()}년`;
      const dateStr = `${el.getMonth() + 1}월${el.getDate()}일`;
      const hourStr = `${el.getHours()}시`;
      const yearObj = newYears[yearStr];
      const dateObj = newDates[dateStr];
      const hourObj = newHours[hourStr];

      if (!yearObj) newYears[yearStr] = {};
      newYears[yearStr][dateStr] = true;
      if (!dateObj) newDates[dateStr] = {};
      newDates[dateStr][hourStr] = true;
      if (!hourObj) newHours[hourStr] = true;
    });

    setYears(newYears);
    setDates(newDates);
    setHours(newHours);
  };

  const initSelectedTime = () => {
    if (
      getKeys(years).length === 0 ||
      getKeys(dates).length === 0 ||
      getKeys(hours).length === 0
    )
      return;

    const initYear = selectedYear;
    const initDate = selectedDate;
    const initHour = selectedHour;

    setSelectedYear(initYear);
    setSelectedDate(initDate);
    setSelectedHour(initHour);
  };

  const setDateByYear = useCallback(() => {
    if (getKeys(years).length === 0) return;
    const newSelectedDate = getKeys(years[selectedYear])[0];
    setSelectedDate(newSelectedDate);
  }, []);

  const setHourByDate = useCallback(() => {
    if (getKeys(dates).length === 0) return;
    const newHours = getKeys(dates[selectedDate]);
    const newSelectedHour = newHours.includes(selectedHour)
      ? selectedHour
      : newHours[0];
    setSelectedHour(newSelectedHour);
  }, []);

  const getKeys = (obj) => {
    if (!obj) return [];
    return Object.keys(obj);
  };

  return (
    <ComponentWrapper>
      {selectedHour && (
        <>
          {getKeys(years).length && (
            <Picker
              data={getKeys(years)}
              selectedData={selectedYear}
              setSelectedData={setSelectedYear}
            />
          )}
          {getKeys(years[selectedYear]).length && (
            <Picker
              data={getKeys(years[selectedYear])}
              selectedData={selectedDate}
              setSelectedData={setSelectedDate}
            />
          )}
          {getKeys(dates[selectedDate]).length && (
            <Picker
              data={getKeys(dates[selectedDate])}
              selectedData={selectedHour}
              setSelectedData={setSelectedHour}
            />
          )}
          <SmallTitle>{text}</SmallTitle>
        </>
      )}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  height: max-content;
  max-width: 600px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default DatePicker;
