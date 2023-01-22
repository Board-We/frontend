import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { getBoardDdayStatus } from "../../../../utils/board";
import MoreBoardSlide from "./MoreBoardSlide";
import Slide from "./Slide";

const slidingValue = 10;

const BoardSlider = ({ type, boards, onClickMoreBoard }) => {
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
        {boards.map((board, i) => (
          <Slide
            key={board.boardName + i}
            boardDdayStatus={getBoardDdayStatus({
              openStartTime: board.openStartTime,
              writingStartTime: board.writingStartTime,
            })}
            boardLink={board.boardLink}
            boardName={board.boardName}
            boardViews={board.boardViews}
            boardBackground={board.boardBackground}
          />
        ))}
        {type === "reccomend" && <MoreBoardSlide onClick={onClickMoreBoard} />}
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
  width: fit-content;
  display: flex;
  gap: 1rem;
  margin-right: 3rem;
`;
