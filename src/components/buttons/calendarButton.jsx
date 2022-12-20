import styled, { keyframes } from "styled-components";
import { ReactComponent as Calendar } from "../../assets/calendar.svg";

const CalendarButton = ({ open }) => {
  return (
    <ComponentWrapper open={open}>
      <Calendar />
    </ComponentWrapper>
  );
};

export default CalendarButton;

const ComponentWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 1800;
`;
