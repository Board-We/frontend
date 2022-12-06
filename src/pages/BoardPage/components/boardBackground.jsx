import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import Description from '../../../components/label/description'
import SmallTitle from '../../../components/label/smallTitle'
import Tag from '../../../components/label/tag'

const BoardBackground = ({ boardInfo, centerContent }) => {

    return (
        <ComponentWrapper background={boardInfo.background}>
            <CenterContentContainer>
                {centerContent}
            </CenterContentContainer>
            <SmallTitle>{boardInfo.name}</SmallTitle>
            <Tags>
                {
                    boardInfo.tags.map(el => {
                        return <Tag key={el}>{`#${el}`}</Tag>
                    })
                }
            </Tags>
            <Description>{boardInfo.description}</Description>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 1.5rem;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 80vh;
    line-height: 2rem;
`

const CenterContentContainer = styled.div`
    position: absolute;
    display: flex;
    left:0;
    top:0;
    width: inherit;
    height: inherit;
    align-items: center;
    justify-content: center;
`

const Tags = styled.div`
    display: flex;
    flex-direction: row;
`

export default BoardBackground