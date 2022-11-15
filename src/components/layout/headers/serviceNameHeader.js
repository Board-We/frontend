import React from 'react'
import styled from 'styled-components'

const ServiceNameHeader = ( {} ) => {
    return (
        <ComponentWrapper>
            ServiceName
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    background-color: yellow;
`

export default ServiceNameHeader