import React from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import ChipButton from "../../../components/buttons/chipButton"
import { boardState, memoState } from "../../../store"
import MemoTextArea from "../components/memoTextArea"

const EndStep = () => {

    const board = useRecoilValue(boardState)
    const memo = useRecoilValue(memoState)

    return (
        <PageWrapper>
            <MemoTextContainer background={board.background}>
                <MemoTextArea text={memo.text} disabled={true} />
            </MemoTextContainer>
            <Alertcontainer>
                <span>롤링페이퍼 작성이<br />완료되었습니다!</span>
                <span>이 롤링페이퍼는 {board.attachableTerm[0]}에 공개될 예정입니다.</span>
                <ChipButton width={"16.8rem"} flat color={"black"} background={"#E8E8E8"} text={"롤링페이퍼 더 붙이기"} />
                <ChipButton width={"16.8rem"} flat text={"나도 롤링페이퍼 만들래"} />
            </Alertcontainer>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    width: 100%;
    height: 100vh;
`

const MemoTextContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vw;
    max-height: 700px;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
`

const Alertcontainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

export default EndStep