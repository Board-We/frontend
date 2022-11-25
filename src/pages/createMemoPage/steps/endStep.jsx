import React from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import ChipButton from "../../../components/buttons/chipButton"
import ServiceNameHeader from "../../../components/layout/headers/serviceNameHeader"
import { boardState, memoState } from "../../../store"
import MemoTextArea from "../components/memoTextArea"

const EndStep = () => {

    const board = useRecoilValue(boardState)
    const memo = useRecoilValue(memoState)
    const navigate = useNavigate()

    const onClickMoreMemo = () => {
        navigate("/memo/landing")
    }

    const onClickMakeBoard = () => {
        navigate("/board/new")
    }

    return (
        <PageWrapper>
            <ServiceNameHeader />
            <BoardArea background={board.background}>
                <MemoTextContainer background={memo.style.background} color={memo.style.textColor}>
                    <MemoTextResult>{memo.text}</MemoTextResult>
                </MemoTextContainer>
            </BoardArea>
            <Alertcontainer>
                <span>롤링페이퍼 작성이<br />완료되었습니다!</span>
                <span>이 롤링페이퍼는 {board.attachableTerm[0]}에 공개될 예정입니다.</span>
                <ChipButton width={"16.8rem"} flat color={"black"} background={"#E8E8E8"} text={"롤링페이퍼 더 붙이기"} onClick={onClickMoreMemo} />
                <ChipButton width={"16.8rem"} flat text={"나도 롤링페이퍼 만들래"} onClick={onClickMakeBoard} />
            </Alertcontainer>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
`

const BoardArea = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100vw;
    min-height: 100vw;
    max-width: 700px;
    max-height: 700px;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
`

const MemoTextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;
    height: 75%;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
    color: ${props => props.color};
    padding: 4.5rem; // padding value of text area
    border-radius: 0.5rem;
`

const MemoTextResult = styled.div`
    width: 100%;
    height: fit-content;
`

const Alertcontainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-grow: 1;
`

export default EndStep