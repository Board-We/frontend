import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import FooterButton from '../../components/buttons/FooterButton'
import StepHeader from '../../components/layout/headers/stepHeader'
import { boardState, selectedMemoColorState, selectedMemoTypeState } from '../../store'
import MemoBoard from './components/MemoBoard'
import MemoColorSelector from './components/memoColorSelector'
import MemoTypeSelector from './components/memoTypeSelector'

const MakeMemoPage = () => {
    const board = useRecoilValue(boardState)
    const [selectedMemoType, setSelectedMemoType] = useRecoilState(selectedMemoTypeState)
    const [selectedMemoColor, setSelectedMemoColor] = useRecoilState(selectedMemoColorState)
    const [memoText, setMemoText] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        initMemoSetting()

        if (board.memoTypes.length > 0) setSelectedMemoType(board.memoTypes[0])
        else {
            if (board.memoColors.length > 0) setSelectedMemoColor(board.memoColors[0])
        }
    }, [board])

    const initMemoSetting = () => {
        setSelectedMemoType(undefined)
        setSelectedMemoColor(undefined)
    }

    const goBack = () => {
        navigate("/bomp")
    }

    return (
        <PageWrapper>
            <StepHeader title="메모 작성하기" onClick={goBack} />
            <MemoBoard memoText={memoText} setMemoText={setMemoText} />
            <MemoTypeSelector memoTypes={board.memoTypes} selectedMemoType={selectedMemoType} />
            <MemoColorSelector memoColors={board.memoColors} selectedMemoColor={selectedMemoColor} />
            <FooterButton color="grey" text="완료" disabled={memoText.length === 0} />
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-top: 2rem;
`

export default MakeMemoPage