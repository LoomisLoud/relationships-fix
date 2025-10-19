import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Import pages
import Landing from './pages/Landing'
import Welcome from './pages/Welcome'
import PasteConversation from './pages/PasteConversation'
import LoadingRealities from './pages/LoadingRealities'
import ResultsAhaMoment from './pages/ResultsAhaMoment'
import Onboarding from './pages/Onboarding'
import Import from './pages/Import'
import Assessments from './pages/Assessments'
import RelationshipMap from './pages/RelationshipMap'
import Scenarios from './pages/Scenarios'
import ActionPlan from './pages/ActionPlan'
import FightSimulator from './pages/FightSimulator'
import Rewards from './pages/Rewards'
import Dashboard from './pages/Dashboard'
import VoiceMessage from './pages/VoiceMessage'
import AssessmentQuestionnaire from './pages/AssessmentQuestionnaire'
import PartnerAssessment from './pages/PartnerAssessment'

function App() {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('parallelHeartsUser')
    return saved ? JSON.parse(saved) : null
  })

  const [relationshipData, setRelationshipData] = useState(() => {
    const saved = localStorage.getItem('parallelHeartsRelationship')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (userData) {
      localStorage.setItem('parallelHeartsUser', JSON.stringify(userData))
    }
  }, [userData])

  useEffect(() => {
    if (relationshipData) {
      localStorage.setItem('parallelHeartsRelationship', JSON.stringify(relationshipData))
    }
  }, [relationshipData])

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Landing />} 
        />
        <Route 
          path="/welcome" 
          element={<Welcome />} 
        />
        <Route 
          path="/paste-conversation" 
          element={<PasteConversation />} 
        />
        <Route 
          path="/loading-realities" 
          element={<LoadingRealities />} 
        />
        <Route 
          path="/results" 
          element={<ResultsAhaMoment />} 
        />
        <Route 
          path="/onboarding" 
          element={<Onboarding setUserData={setUserData} />} 
        />
        <Route 
          path="/dashboard" 
          element={<Dashboard userData={userData} relationshipData={relationshipData} />} 
        />
        <Route 
          path="/import" 
          element={<Import setRelationshipData={setRelationshipData} />} 
        />
        <Route 
          path="/assessments" 
          element={<Assessments setRelationshipData={setRelationshipData} relationshipData={relationshipData} />} 
        />
        <Route 
          path="/map" 
          element={<RelationshipMap relationshipData={relationshipData} />} 
        />
        <Route 
          path="/scenarios" 
          element={<Scenarios relationshipData={relationshipData} />} 
        />
        <Route 
          path="/plan" 
          element={<ActionPlan relationshipData={relationshipData} />} 
        />
        <Route 
          path="/simulator" 
          element={<FightSimulator relationshipData={relationshipData} />} 
        />
        <Route 
          path="/rewards" 
          element={<Rewards userData={userData} setUserData={setUserData} />} 
        />
        <Route 
          path="/voice-message" 
          element={<VoiceMessage />} 
        />
        <Route 
          path="/assessment-questionnaire" 
          element={<AssessmentQuestionnaire />} 
        />
        <Route 
          path="/partner-assessment/:assessmentId" 
          element={<PartnerAssessment />} 
        />
      </Routes>
    </Router>
  )
}

export default App

