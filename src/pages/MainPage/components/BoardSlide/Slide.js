import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Eye } from "../../../../assets/icons/eye.svg";

const Slide = ({
  boardLink,
  boardStatus,
  boardName,
  boardViews,
  boardBackground,
  sx,
}) => {
  const navigate = useNavigate();
  return (
    <SlideContainer
      boardBackground={boardBackground}
      sx={sx}
      onClick={() => navigate(boardLink)}
    >
      <SlideTopDescription>
        <BoardStatus>작성 가능</BoardStatus>
        <BaordViewCount>
          <Eye />
          <span>{boardViews}</span>
        </BaordViewCount>
      </SlideTopDescription>
      <SlideBottomDescription>{boardName}</SlideBottomDescription>
    </SlideContainer>
  );
};
export default Slide;

const SlideContainer = styled.div`
  height: 30vh;
  border-radius: 1.2rem;
  background-color: ${(props) =>
    props.boardBackground === "#FFFFFF" ? "#8d8d8d" : props.boardBackground};
  aspect-ratio: 1 / 1.2;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.8rem;
  ${(props) => props.sx}
`;

const SlideTopDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const SlideBottomDescription = styled.div`
  width: 100%;
  text-align: start;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.1rem;
`;

const BoardStatus = styled.div`
  border: 0.1rem solid white;
  width: fit-content;
  padding: 0.2rem 0.5rem;
  border-radius: 0.8rem;
`;

const BaordViewCount = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  span {
    margin-left: 0.3rem;
  }
`;
