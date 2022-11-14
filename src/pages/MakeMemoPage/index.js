import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { boardState } from '../../store'
import MemoBoard from './components/MemoBoard'
import MemoColorSelector from './components/memoColorSelector'
import MemoTypeSelector from './components/memoTypeSelector'

const MakeMemoPage = ({ }) => {

    const [board, setBoard] = useRecoilState(boardState)
    const [selectedMemoType, setSelectedMemoType] = useState()

    useEffect(() => {
        const res = getBoardInfo()
        setBoard(res)
    }, [])

    useEffect(() => {
        if (board.memoTypes.length > 0) setSelectedMemoType(board.memoTypes[0])
    }, [board])

    const getBoardInfo = () => {
        return {
            background: "red",
            memoTypes: [
                "https://cdn.pixabay.com/photo/2016/04/22/10/16/paper-1345510_960_720.jpg",
                "https://cdn.pixabay.com/photo/2018/04/11/09/04/paper-clip-3309924_960_720.png",
                "https://cdn.pixabay.com/photo/2016/05/20/14/14/open-spiral-notebook-1405082_960_720.png"
            ],
            memoColors: [
                "red",
                "green",
                "blue"
            ]
        }
    }

    const [memoText, setMemoText] = useState("")

    return (
        <PageWrapper>
            <MemoBoard memoText={memoText} setMemoText={setMemoText} />
            <MemoTypeSelector memoTypes={board.memoTypes} selectedMemoType={selectedMemoType} />
            <MemoColorSelector />
        </PageWrapper>
    )
}

const PageWrapper = styled.div`

`

export default MakeMemoPage