import styled from "styled-components";
import BoardBackground from "../components/boardBackground";
import { useRecoilValue } from "recoil";
import { boardState } from "../../../store";
import MemoPaper from "../../../components/memoPaper";
import PasswordModal from "../BoardPageModal/PasswordModal"
import { useEffect, useState } from "react";

const BoardOnOpen = () => {

  const board = useRecoilValue(boardState)
  const privateModeForTest = true
  const [openPasswordModal, setOpenPasswordModal] = useState(false)

  useEffect(()=>{
    if(!board.memos) setOpenPasswordModal(true)
    else setOpenPasswordModal(false)
  }, [board])

  const onClosePasswordModal = () => {
    setOpenPasswordModal(false)
  }

  const onSuccessPasswordModal = () => {
    console.log('get memo list of board')
  }

  return (
    <PageWrapper>
      <BoardBackground boardInfo={board} backgroundRepeat={true} />
      <MemoContainer>
        {
          board.memos && privateModeForTest ? 
          board.memos.map((el, i) => {
            return <MemoPaper key={`${el}${i}`} text={el.memoContent} />
          })
          : <PasswordModal open={openPasswordModal} onClose={onClosePasswordModal} onSuccess={onSuccessPasswordModal}/>
        }
      </MemoContainer>
    </PageWrapper>
  );
};

export default BoardOnOpen;

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const MemoContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding-top: 100%;
  padding-bottom: 3rem;
  width: 100%;
  display: grid;
  height: 1px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  overflow: scroll;
  gap: 1rem;
  z-index: 3;
  &::-webkit-scrollbar{
    width: 0;
  }
`

const Dummy = styled.div`
  display: inline-block;
  height: 40vh;
`