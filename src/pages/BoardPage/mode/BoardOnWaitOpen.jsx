import React from "react"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import ChipButton from "../../../components/buttons/chipButton"
import { boardState } from "../../../store"
import BoardBackground from "../components/boardBackground"
import Buttons from "../components/buttons"
import Timer from "../components/timer"

const BoardOnWaitOpen = () => {

    const [board, setBoard] = useRecoilState(boardState)

    const onTimeOver = () => {
        console.log("onTimeover")
    }

    const getTimer = () => {
        return <Timer duedate={board.openStartTime} onTimeOver={onTimeOver} text="후에 확인할 수 있습니다." />
    }

    return (
        <PageWrapper>
            <BoardBackground boardInfo={board} centerContent={getTimer()}>
            </BoardBackground>
            <Buttons>
                <ChipButton background="#5B5B5B" flat>나도 롤링페이퍼 만들래</ChipButton>
            </Buttons>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export default BoardOnWaitOpen