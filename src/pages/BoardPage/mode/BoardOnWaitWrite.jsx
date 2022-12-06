import React from "react"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import ChipButton from "../../../components/buttons/chipButton"
import { boardState } from "../../../store"
import BoardBackground from "../components/boardBackground"
import Buttons from "../components/buttons"
import Timer from "../components/timer"

const BoardOnWaitWrite = () => {

    const [board, setBoard] = useRecoilState(boardState)

    useEffect(() => {
        makeTestData()
    }, [])

    //test code
    const makeTestData = () => {
        const randomDateTime = new Date(new Date().getTime() + 10)
        setBoard({
            ...board,
            attachableTerm: {
                start: randomDateTime,
                end: null
            }
        })
    }

    const getTimer = () => {
        return <Timer duedate={board.attachableTerm.start} text="후에 작성할 수 있습니다." />
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

export default BoardOnWaitWrite