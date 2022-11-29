import { useRef, useState } from "react";
import styled from "styled-components";
import Slide from "./Slide";

const Slider = () => {
  const [slideValue, setSlideValue] = useState(0);

  const sliderContainerRef = useRef();
  console.log(sliderContainerRef);
  const handleWheel = (e) => {
    const { deltaX } = e;

    if (deltaX > 0) {
      sliderContainerRef.current.scrollLeft += 20;
    } else {
      sliderContainerRef.current.scrollLeft -= 20;
    }
    setSlideValue(slideValue);
  };

  return (
    <SliderContainer ref={sliderContainerRef} onWheel={handleWheel}>
      <Slides>
        <Slide scrollLeft={slideValue}></Slide>
        <Slide></Slide>
        <Slide></Slide>
        <Slide></Slide>
        <Slide></Slide>
      </Slides>
    </SliderContainer>
  );
};

export default Slider;

const SliderContainer = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  padding: 0.8rem 0;
`;

const Slides = styled.div`
  position: absolute;
  width: 100vw;
  display: flex;
  overflow: hidden;
`;
