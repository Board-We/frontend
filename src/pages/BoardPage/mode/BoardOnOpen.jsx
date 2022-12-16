import styled from "styled-components";
import BoardBackground from "../components/boardBackground";
import { useRecoilValue } from "recoil";
import { boardState, deviceScreenState } from "../../../store";
import PasswordModal from "../BoardPageModal/PasswordModal"
import { useEffect, useRef, useState } from "react";
import Toast from "../components/toast";
import MemoOnBoard from "../components/memoOnBoard";
import Spinner from "../components/spinner";

const BoardOnOpen = () => {

  const board = useRecoilValue(boardState)
  const privateModeForTest = true
  const [openPasswordModal, setOpenPasswordModal] = useState(false)
  const [openToast, setOpenToast] = useState(true)
  const deviceScreenSize = useRecoilValue(deviceScreenState)
  const [paddingTop, setPaddingTop] = useState(0)
  const [memoThemes, setMemoThemes] = useState({})
  const [visibleMemos, setVisibleMemos] = useState([])
  const [isMemoLoading, setIsMemoLoading] = useState(true)
  const $memoContainer = useRef()

  useEffect(() => {
    makeMemoThemes()
    makeVisibleMemos()

    if (!board.memos) setOpenPasswordModal(true)
    else setOpenPasswordModal(false)
  }, [board])

  useEffect(() => {
    // 14 = service header 3rem + top 9 rem + padding bottom 2rem
    const newPaddingTop = deviceScreenSize.y - Number(deviceScreenSize.rem.replace('px', '')) * 14
    setPaddingTop(newPaddingTop)
  }, [deviceScreenSize])

  const makeMemoThemes = () => {
    const newMemoThemes = {}
    board.memoThemes.forEach(el => {
      newMemoThemes[el.memoThemeId] = el
    })
    setMemoThemes(newMemoThemes)
  }

  const makeVisibleMemos = () => {
    setVisibleMemos(board.memos.slice(0, 10))
    setIsMemoLoading(false)
  }

  const addVisibleMemos = () => {
    if (visibleMemos.length === board.memos.length) return

    setIsMemoLoading(true)
    setTimeout(() => {
      setVisibleMemos(board.memos.slice(0, visibleMemos.length + 10))
      setIsMemoLoading(false)
    }, 750)
  }

  const onClosePasswordModal = () => {
    setOpenPasswordModal(false)
  }

  const onSuccessPasswordModal = () => {
    console.log('get memo list of board')
  }

  const onScrollMemoContainer = (e) => {
    const memoContainerObject = e.target
    if (memoContainerObject.scrollTop > 0) setOpenToast(false)
    else if (memoContainerObject.scrollTop === 0) setOpenToast(true)

    if (memoContainerObject.scrollHeight == memoContainerObject.offsetHeight + memoContainerObject.scrollTop) addVisibleMemos()
  }

  return (
    <PageWrapper >
      <BoardBackground boardInfo={board} backgroundRepeat={true} />
      <MemoContainer ref={$memoContainer} onScroll={onScrollMemoContainer} paddingTop={paddingTop}>
        {
          visibleMemos && privateModeForTest ?
            visibleMemos.map((el, i) => {
              // memoThemeId
              const theme = memoThemes[el.memoThemeId]
              return <MemoOnBoard size={$memoContainer.current.clientWidth * 0.4} key={`${el}${i}`} text={el.memoContent} background={theme?.memoBackground} color={theme?.memoTextColor} marginOption={i % 2 === 0} />
            })
            : <PasswordModal open={openPasswordModal} onClose={onClosePasswordModal} onSuccess={onSuccessPasswordModal} />
        }      </MemoContainer>
      {
        isMemoLoading ?
          <Spinner />
          : null
      }
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
  padding-bottom: 2.5rem;
  width: 100%;
  height: 0;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  overflow-y: scroll;
  overflow-x: hidden;
  grid-gap: 0.5rem;
  z-index: 3;
  &::-webkit-scrollbar{
    width: 0;
  }
`