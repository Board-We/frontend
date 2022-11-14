import React from 'react'
import styled from 'styled-components'
import MemoType from './memoType'

const MemoTypeSelector = ({ memoTypes, selectedMemoType }) => {
    return (
        <ComponentWrapper>
            <div>메모지 종류 선택하기</div>
            <MemoTypeList>
                {
                    memoTypes.map((el) => {
                        return <MemoType background={el} isSelected={selectedMemoType === el} key={el} />
                    })
                }
            </MemoTypeList>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const MemoTypeList = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
`

export default MemoTypeSelector