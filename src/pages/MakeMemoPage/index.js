import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { boardState, selectedMemoColorState, selectedMemoTypeState } from '../../store'
import MemoBoard from './components/MemoBoard'
import MemoColorSelector from './components/memoColorSelector'
import MemoTypeSelector from './components/memoTypeSelector'

const MakeMemoPage = () => {
    const board = useRecoilValue(boardState)
    const [selectedMemoType, setSelectedMemoType] = useRecoilState(selectedMemoTypeState)
    const [selectedMemoColor, setSelectedMemoColor] = useRecoilState(selectedMemoColorState)
    const [memoText, setMemoText] = useState("")

    useEffect(() => {
        if (board.memoTypes.length > 0) setSelectedMemoType(board.memoTypes[0])
        else {
            if (board.memoColors.length > 0) setSelectedMemoColor(board.memoColors[0])
        }
    }, [board])

    return (
        <PageWrapper>
            <MemoBoard memoText={memoText} setMemoText={setMemoText} />
            <MemoTypeSelector memoTypes={board.memoTypes} selectedMemoType={selectedMemoType} />
            <MemoColorSelector memoColors={board.memoColors} selectedMemoColor={selectedMemoColor} />
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export default MakeMemoPage