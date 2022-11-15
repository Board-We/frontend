import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import EndStep from './steps/endStep'
import FirstStep from './steps/firstStep'
import SecondStep from './steps/secondStep'

const CreateMemoPage = () => {

    return (
        <PageWrapper>
            <Routes>
                <Route path="/step1" element={<FirstStep />} />
                <Route path="/step2" element={<SecondStep />} />
                <Route path="/end" element={<EndStep />} />
            </Routes>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    width: 100%;
    height: 100vh;
`

export default CreateMemoPage