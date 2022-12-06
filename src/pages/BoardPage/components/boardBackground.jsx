import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import Description from '../../../components/label/description'
import SmallTitle from '../../../components/label/smallTitle'
import Tag from '../../../components/label/tag'

const BoardBackground = ({ boardInfo, centerContent=null }) => {

    return (
        <ComponentWrapper background={boardInfo.background}>
            <BackgroundImageContainer background={boardInfo.background}/>
            <CenterContentContainer>
                {centerContent}
            </CenterContentContainer>
            <SmallTitle color='white' style={{zIndex: 1}}>{boardInfo.name}</SmallTitle>
            <Tags>
                {
                    boardInfo.tags.map(el => {
                        return <Tag key={el} color='white'>{`#${el}`}</Tag>
                    })
                }
            </Tags>
            <Description color='white'>{boardInfo.description}</Description>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1.5rem;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 80vh;
    line-height: 2rem;
`

const BackgroundImageContainer = styled.div`
    background-color: rgba(28, 27, 31, 0.6);
    width: inherit;
    height: inherit;
    position:absolute;
    top:0;
    left:0;
    z-index: 0;
`

const CenterContentContainer = styled.div`
    position: absolute;
    display: flex;
    left:0;
    top:0;
    width: inherit;
    height: inherit;
    align-items: flex-end;
    justify-content: center;
`

const Tags = styled.div`
    display: flex;
    flex-direction: row;
`

export default BoardBackground