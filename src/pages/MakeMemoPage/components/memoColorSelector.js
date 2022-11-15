import React from 'react'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { selectedMemoColorState, selectedMemoTypeState } from '../../../store'
import MemoColor from './memoColor'

const MemoColorSelector = ({ memoColors, selectedMemoColor }) => {

    const setSelectedMemoColor = useSetRecoilState(selectedMemoColorState)
    const setSelectedMemoType = useSetRecoilState(selectedMemoTypeState)

    const setMemoColorState = (memoColor) => {
        setSelectedMemoColor(memoColor)
        setSelectedMemoType(undefined)
    }

    return (
        <ComponentWrapper>
            <div>메모지 컬러 선택하기</div>
            <MemoColorList>

                {
                    memoColors.map((el) => {
                        return <MemoColor
                            background={el}
                            isSelected={selectedMemoColor === el}
                            key={el}
                            onClick={() => setMemoColorState(el)}
                        />
                    })
                }
            </MemoColorList>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0.5rem;
`

const MemoColorList = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
`

export default MemoColorSelector