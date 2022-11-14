import React from 'react'
import styled from 'styled-components'

const MemoBoard = ({ memoText, setMemoText }) => {

    const onChangeMemoText = (e) => {
        const newString = e.target.value
        if (newString.length <= 50) setMemoText(newString)
    }

    return (
        <ComponentWrapper>
            <MemoTextInput type="text" value={memoText} onChange={onChangeMemoText} />
            {`${memoText.length}/50`}
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const MemoTextInput = styled.input`

`

export default MemoBoard