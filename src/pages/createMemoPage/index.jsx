import React from 'react'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import EndStep from './steps/endStep'
import MakingStep from './steps/makingStep'
import LandingStep from './steps/landingStep'

const CreateMemoPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/memo/landing")
    }, [])

    return (
        <PageWrapper>
            <Routes>
                <Route path="/landing" element={<LandingStep />} />
                <Route path="/making" element={<MakingStep />} />
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