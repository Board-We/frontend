import React from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import ChipButton from "../../../components/buttons/chipButton"
import Description from "../../../components/label/description"
import Tag from "../../../components/label/tag"
import Title from "../../../components/label/title"
import ServiceNameHeader from "../../../components/layout/headers/serviceNameHeader"
import { boardState, memoState } from "../../../store"

const EndStep = () => {

    const board = useRecoilValue(boardState)
    const memo = useRecoilValue(memoState)
    const navigate = useNavigate()

    const onClickMoreMemo = () => {
        navigate("/memo/landing")
    }

    const onClickTopBoard = () => {
        navigate("/board/new")
    }

    return (
        <PageWrapper>
            <ServiceNameHeader />
            <BoardArea background={board.background}>
                <Title text={board.name} />
                <Tag />
                <Description text={board.description} />
                <MemoTextContainer background={memo.style.background} color={memo.style.textColor}>
                    <MemoTextResult>{memo.text}</MemoTextResult>
                </MemoTextContainer>
                <Title>롤링페이퍼가 작성되었어요!</Title>
                <Description>이 롤링페이퍼는 {board.attachableTerm[0]}에 공개될 예정입니다.</Description>
            </BoardArea>
            <Alertcontainer>
                <ChipButton flat fit color={"black"} background={"#E8E8E8"} text={"인기보드 보기"} onClick={onClickTopBoard} />
                <ChipButton flat fit text={"롤링페이퍼 더 붙이기"} onClick={onClickMoreMemo} />
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 700px;
    height: fit-content;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
`

const MemoTextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15rem;
    height: 15rem;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
    color: ${props => props.color};
    padding: 4.5rem; // padding value of text area
    border-radius: 0.5rem;
`

const MemoTextResult = styled.div`
    width: 80%;
    height: fit-content;
`

const Alertcontainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-grow: 1;
`

export default EndStep