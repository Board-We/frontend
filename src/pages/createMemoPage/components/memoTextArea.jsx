import React, { forwardRef } from 'react'
import styled from 'styled-components'

const MemoTextArea = forwardRef(({ text = "", onChange, disabled = false }, ref) => {
    return (
        <ComponentWrapper>
            <MemoTextTA ref={ref} value={text} onChange={onChange} lineHeight={text.split('\n').length} disabled={disabled} />
        </ComponentWrapper>
    )
})

const ComponentWrapper = styled.div`
    
`

const MemoTextTA = styled.textarea`
    height: ${props => `${props.lineHeight + 0.5}rem`};
    font-size: 1rem;
    line-height: 1rem;
    text-align: center;
    resize: none;
    border: 0;
    width: 80%;
    background: transparent;
    outline: 0;
    overflow: hidden;
    :disabled{
        background-color: inherit;
        color: inherit;
    }
`

export default MemoTextArea