import styled from "styled-components";
import Slide from "./Slide";

const Slider = () => {
  const handleWheelSlider = () => {};

  return (
    <SliderContainer onWheel={handleWheelSlider}>
      <Slide></Slide>
      <Slide></Slide>
      <Slide></Slide>
    </SliderContainer>
  );
};

export default Slider;

const SliderContainer = styled.div`
  width: 100%;
  margin: auto;
  overflow: hidden;
  display: flex;
  padding: 0.8rem 0;
`;
