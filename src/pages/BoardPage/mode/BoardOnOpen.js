import styled from "styled-components";
import BoardBackground from "../components/boardBackground";
import { useRecoilValue } from "recoil";
import { boardState, deviceScreenState } from "../../../store";
import MemoPaper from "../../../components/memoPaper";
import PasswordModal from "../BoardPageModal/PasswordModal"
import { useEffect, useRef, useState } from "react";
import Toast from "../components/toast";

const BoardOnOpen = () => {

  const board = useRecoilValue(boardState)
  const privateModeForTest = true
  const [openPasswordModal, setOpenPasswordModal] = useState(false)
  const [openToast, setOpenToast] = useState(true)
  const deviceScreenSize = useRecoilValue(deviceScreenState)
  const [paddingTop, setPaddingTop] = useState(0)


  useEffect(() => {
    if (!board.memos) setOpenPasswordModal(true)
    else setOpenPasswordModal(false)
  }, [board])

  useEffect(() => {
    // 13 = service header 3rem + top 9 rem + padding bottom 1rem
    const newPaddingTop = deviceScreenSize.y - Number(deviceScreenSize.rem.replace('px', '')) * 13
    setPaddingTop(newPaddingTop)
  }, [deviceScreenSize])

  const onClosePasswordModal = () => {
    setOpenPasswordModal(false)
  }

  const onSuccessPasswordModal = () => {
    console.log('get memo list of board')
  }

  const onScrollMemoContainer = (e) => {
    if (e.target.scrollTop > 0) setOpenToast(false)
    else if (e.target.scrollTop === 0) setOpenToast(true)
  }

  return (
    <PageWrapper >
      <BoardBackground boardInfo={board} backgroundRepeat={true} />
      <MemoContainer onScroll={onScrollMemoContainer} paddingTop={paddingTop}>
        {
          board.memos && privateModeForTest ?
            board.memos.map((el, i) => {
              return <MemoPaper key={`${el}${i}`} text={el.memoContent} />
            })
            : <PasswordModal open={openPasswordModal} onClose={onClosePasswordModal} onSuccess={onSuccessPasswordModal} />
        }
      </MemoContainer>
      <Toast open={openToast}>스크롤해서 확인해보세요!</Toast>
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
  overflow: hidden;
`

const MemoContainer = styled.div`
  position: absolute;
  top: 9rem;
  left: 0;
  padding-top: ${props => `${props.paddingTop}px`};
  padding-bottom: 1.2rem;
  width: 100%;
  height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  overflow-y: scroll;
  overflow-x: hidden;
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