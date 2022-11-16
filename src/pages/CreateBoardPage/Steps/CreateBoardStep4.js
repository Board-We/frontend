import { useRecoilState } from "recoil";
import styled from "styled-components";
import BoardCanvas from "../../../components/BoardCanvas";
import FooterButton from "../../../components/buttons/FooterButton";
import { boardState } from "../../../store";

const CreateBoardStep4 = () => {
  const [board, setBoard] = useRecoilState(boardState);
  return (
    <>
      <BoardCanvas color={board.background} />
      <FinalStepDescription>
        보드가 완성되었어요! <br />
        보드의 링크를 잘 보관해주세요!
      </FinalStepDescription>
      <BoardLinkBox>
        <BoardLinkUrlText>
          <p>www.어쩌구저쩌구</p>
        </BoardLinkUrlText>
        <BoardLinkCopyButton>링크 복사</BoardLinkCopyButton>
      </BoardLinkBox>
    </>
  );
};

export default CreateBoardStep4;

const FinalStepDescription = styled.div`
  padding: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const BoardLinkBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const BoardLinkUrlText = styled.div`
  display: flex;
  background-color: #f3f3f3;
  width: 100%;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  border-radius: 0.5rem;
`;

const BoardLinkCopyButton = styled.button`
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: gray;
  color: white;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  right: 0;
  top: 0;
  border: 0;
  padding: 0 1.2rem 0 1.2rem;
  border-radius: 0.5rem;
`;
