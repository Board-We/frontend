import React from 'react'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import EndStep from './steps/endStep'
import FirstStep from './steps/firstStep'
import LandingStep from './steps/landingStep'
import SecondStep from './steps/secondStep'

const CreateMemoPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/memo/landing")
    }, [])

    return (
        <PageWrapper>
            <Routes>
                <Route path="/landing" element={<LandingStep />} />
                <Route path="/step1" element={<FirstStep />} />
                <Route path="/step2" element={<SecondStep />} />
                <Route path="/end" element={<EndStep />} />
            </Routes>
        </PageWrapper >
    )
}

const PageWrapper = styled.div`
    width: 100%;
    height: 100vh;
`

export default CreateMemoPage