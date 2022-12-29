import styled from "styled-components";
import { ReactComponent as ArrowBack } from "../../../../assets/icons/arrowBack.svg";

const MoreBoardSlide = () => {
  return (
    <MoreBoardContainer>
      <p>인기보드 더 보기</p>
      <ArrowBack />
    </MoreBoardContainer>
  );
};

export default MoreBoardSlide;

const MoreBoardContainer = styled.div`
  height: 30vh;
  display: flex;
  flex-direction: column;
  color: #4e4e4e;
  justify-content: center;
  align-items: center;
  border-radius: 1.2rem;
  aspect-ratio: 1 / 1.6;

  path {
    fill: ${(props) => props.theme.colors.grey_30};
  }
`;
