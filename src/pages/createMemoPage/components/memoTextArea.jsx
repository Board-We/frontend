import React, { forwardRef } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const MemoTextArea = forwardRef(({ text = "", onChange, disabled = false }, ref) => {

    const [lineHeight, setLineHeight] = useState('16px')

    const resize = () => {
        const scrollHeight = ref.current.scrollHeight
        setLineHeight(`${scrollHeight}px`)
    }

    const onChangeMemoTextTA = (e) => {
        onChange(e);
        resize();
    }

    return (
        <ComponentWrapper>
            <MemoTextTA ref={ref} value={text} onChange={onChangeMemoTextTA} height={lineHeight} disabled={disabled} />
        </ComponentWrapper>
    )
})

const ComponentWrapper = styled.div`
    
`

const MemoTextTA = styled.textarea`
    height: ${props => props.height};
    font-size: 1rem;
    line-height: 1rem;
    text-align: center;
    resize: none;
    border: 0;
    width: 100%;
    background: transparent;
    outline: 0;
    overflow: hidden;
    :disabled{
        background-color: inherit;
        color: inherit;
    }
`

export default MemoTextArea