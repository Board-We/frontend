import styled from "styled-components";
import { ReactComponent as Pen } from "../../../../assets/pen.svg";

const Slide = () => {
  return (
    <SlideContainer>
      <SlideTopDescription>
        메모 수 <Pen />
      </SlideTopDescription>
      <SlideBottomDescription>보드 이름</SlideBottomDescription>
    </SlideContainer>
  );
};
export default Slide;

const SlideContainer = styled.div`
  height: 30vh;
  border-radius: 1.2rem;
  background-color: #8d8d8d;
  margin-right: 1rem;
  aspect-ratio: 1 / 1.2;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.8rem;
`;

const SlideTopDescription = styled.div`
  width: 100%;
  text-align: end;
`;

const SlideBottomDescription = styled.div`
  width: 100%;
  text-align: start;
`;
