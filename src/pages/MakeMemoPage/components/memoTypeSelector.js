import React from 'react'
import styled from 'styled-components'
import MemoType from './memoType'
import { selectedMemoColorState, selectedMemoTypeState } from '../../../store'
import { useSetRecoilState } from 'recoil'

const MemoTypeSelector = ({ memoTypes, selectedMemoType }) => {

    const setSelectedMemoType = useSetRecoilState(selectedMemoTypeState)
    const setSelectedMemoColor = useSetRecoilState(selectedMemoColorState)

    const setMemoTypeState = (memoType) => {
        setSelectedMemoType(memoType)
        setSelectedMemoColor(undefined)
    }

    return (
        <ComponentWrapper>
            <div>메모지 종류 선택하기</div>
            <MemoTypeList>
                {
                    memoTypes.map((el) => {
                        return <MemoType
                            background={el}
                            isSelected={selectedMemoType === el}
                            key={el}
                            onClick={() => setMemoTypeState(el)}
                        />
                    })
                }
            </MemoTypeList>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0.5rem;
`

const MemoTypeList = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
`

export default MemoTypeSelector