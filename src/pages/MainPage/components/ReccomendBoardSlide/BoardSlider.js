import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import MoreBoardSlide from "./MoreBoardSlide";
import Slide from "./Slide";

const slidingValue = 10;

const BoardSlider = ({ reccomendBoards }) => {
  const sliderContainerRef = useRef();
  const [mobileStartX, setMobileStartX] = useState(0);

  const slideRight = useCallback(
    () => (sliderContainerRef.current.scrollLeft += slidingValue),
    []
  );

  const slideLeft = useCallback(
    () => (sliderContainerRef.current.scrollLeft -= slidingValue),
    []
  );

  const handleWheelSlider = (e) => {
    const { deltaX } = e;

    if (deltaX > 0) {
      slideRight();
    } else {
      slideLeft();
    }
  };

  // mobile event handlers
  const handleTouchStartSlider = (e) => {
    const startX = e.touches[0].pageX;

    setMobileStartX(startX);
  };

  const handleTouchMoveSlider = (e) => {
    const deltaX = mobileStartX - e.touches[0].pageX;

    if (deltaX > 0) {
      slideRight();
    } else {
      slideLeft();
    }
  };

  return (
    <BoardSliderContainer
      ref={sliderContainerRef}
      onWheel={handleWheelSlider}
      onTouchStart={handleTouchStartSlider}
      onTouchMove={handleTouchMoveSlider}
    >
      <Slides>
        {reccomendBoards.map((board) => (
          <Slide
            boardLink={board.boardLink}
            boardName={board.boardName}
            boardViews={board.boardView}
            boardBackground={board.boardBackground}
          />
        ))}
        <MoreBoardSlide />
      </Slides>
    </BoardSliderContainer>
  );
};

export default BoardSlider;

const BoardSliderContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 31vh;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const Slides = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
`;
