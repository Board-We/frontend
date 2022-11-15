import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { selectedMemoColorState, selectedMemoTypeState } from '../../../store'

const MemoBoard = ({ memoText, setMemoText }) => {

    const backgroundColor = useRecoilValue(selectedMemoColorState)
    const backgroundType = useRecoilValue(selectedMemoTypeState)

    const onChangeMemoText = (e) => {
        const newString = e.target.value
        if (newString.split('\n').length > 9) return
        if (newString.length > 50) return
        setMemoText(newString)
    }

    return (
        <ComponentWrapper >
            <MemoTextInput backgroundImage={backgroundType} backgroundColor={backgroundColor} row={10} value={memoText} onChange={onChangeMemoText} numRow={memoText.split('\n').length} />
            {`${memoText.length}/50`}
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50vh;
`

const MemoTextInput = styled.textarea`
    background-image: ${props => `url(${props.backgroundImage})`};
    background-color: ${props => props.backgroundColor};
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: ${props => `${6.5 - props.numRow / 2}rem`};
    text-align: center;
    word-break:break-all;
    border: 0px solid transparent;
    font-size: 1rem;
    resize: none;
`

export default MemoBoard