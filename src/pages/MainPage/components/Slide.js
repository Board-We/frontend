import styled from "styled-components";

const Slide = ({ slideValue }) => {
  return <SlideContainer scrollLeft={slideValue}></SlideContainer>;
};
export default Slide;

const SlideContainer = styled.div`
  height: 30vh;
  border-radius: 1.2rem;
  background-color: #8d8d8d;
  margin-left: 1rem;
  aspect-ratio: 1 / 1.2;
  transform: ${(props) => `translateX(${props.slideValue}%)`};
`;
