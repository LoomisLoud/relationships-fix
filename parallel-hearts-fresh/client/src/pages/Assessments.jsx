import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Users, User, Sparkles, ChevronRight, Link as LinkIcon, Copy, Check , Home } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { assessmentIntro } from '@/data/assessmentQuestions'

export default function Assessments() {
  const navigate = useNavigate()
  const location = useLocation()
  const relationshipType = location.state?.type || 'romantic'
  const subType = location.state?.subType || null

  const [assessmentMode, setAssessmentMode] = useState(null) // 'solo', 'dual', 'solo_both'
  const [partnerLinkGenerated, setPartnerLinkGenerated] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const handleModeSelect = (mode) => {
    setAssessmentMode(mode)
    
    if (mode === 'dual') {
      // Generate partner link
      generatePartnerLink()
    } else if (mode === 'solo' || mode === 'solo_both') {
      // Start assessment directly
      navigate('/assessment-questionnaire', {
        state: {
          type: relationshipType,
          subType,
          mode,
          assessingFor: mode === 'solo' ? 'self' : 'self_first'
        }
      })
    }
  }

  const generatePartnerLink = () => {
    // Generate unique assessment ID
    const assessmentId = `assess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Create partner link
    const baseUrl = window.location.origin
    const partnerLink = `${baseUrl}/partner-assessment/${assessmentId}`
    
    // Store in state
    setPartnerLinkGenerated(true)
    
    // Store assessment ID for later matching
    localStorage.setItem('currentAssessmentId', assessmentId)
    localStorage.setItem('assessmentInitiator', 'true')
  }

  const copyPartnerLink = () => {
    const assessmentId = localStorage.getItem('currentAssessmentId')
    const baseUrl = window.location.origin
    const partnerLink = `${baseUrl}/partner-assessment/${assessmentId}`
    
    navigator.clipboard.writeText(partnerLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const startMyAssessment = () => {
    navigate('/assessment-questionnaire', {
      state: {
        type: relationshipType,
        subType,
        mode: 'dual',
        assessingFor: 'self',
        assessmentId: localStorage.getItem('currentAssessmentId')
      }
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated cosmic background */}
      <div className="absolute inset-0 cosmic-bg opacity-30"></div>
      
            
      {/* HOME Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 left-6 z-20"
      >
        <Button
          onClick={() => navigate('/')}
          className="neon-border bg-purple-900/50 hover:bg-purple-800/70 backdrop-blur-md px-6 py-3 rounded-xl font-bold"
          style={{
            border: '2px solid #ff00ff',
            boxShadow: '0 0 20px rgba(255, 0, 255, 0.5)'
          }}
        >
          <Home className="w-5 h-5 mr-2" />
          HOME
        </Button>
      </motion.div>
{/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#ff00ff', '#00ffff', '#9d00ff', '#00ff80'][Math.floor(Math.random() * 4)],
              boxShadow: '0 0 10px currentColor'
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        
        <AnimatePresence mode="wait">
          {/* Introduction Screen */}
          {!assessmentMode && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full max-w-4xl"
            >
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <motion.div
                  className="text-8xl mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {assessmentIntro.emoji}
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-6xl font-black mb-6 glow-text"
                  style={{
                    background: 'linear-gradient(135deg, #ff00ff, #00ffff, #9d00ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  animate={{
                    textShadow: [
                      '0 0 40px rgba(255, 0, 255, 0.8)',
                      '0 0 60px rgba(0, 255, 255, 0.8)',
                      '0 0 40px rgba(157, 0, 255, 0.8)',
                      '0 0 60px rgba(255, 0, 255, 0.8)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {assessmentIntro.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="text-xl md:text-2xl text-cyan-200 font-light mb-4"
                >
                  {assessmentIntro.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="max-w-2xl mx-auto text-gray-300 leading-relaxed whitespace-pre-line"
                >
                  {assessmentIntro.description}
                </motion.div>
              </motion.div>

              {/* Mode Selection */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-center text-magenta-300 mb-8">
                  How would you like to proceed?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Solo Mode */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleModeSelect('solo')}
                    className="cursor-pointer"
                  >
                    <Card
                      className="relative overflow-hidden border-4 border-purple-500/30 hover:border-cyan-400 transition-all duration-500 h-full"
                      style={{
                        background: 'rgba(20, 10, 40, 0.8)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <div className="p-8 flex flex-col items-center text-center space-y-6">
                        <motion.div
                          className="w-20 h-20 rounded-full flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #00ffff40, #00ffff20)',
                            border: '3px solid #00ffff',
                            boxShadow: '0 0 20px #00ffff40'
                          }}
                        >
                          <User className="w-10 h-10 text-cyan-400" />
                        </motion.div>

                        <h3 className="text-2xl font-bold text-cyan-400">
                          I'll Do It Alone
                        </h3>

                        <p className="text-sm text-gray-300">
                          Complete the assessment by yourself. I'll analyze your individual profile.
                        </p>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Dual Mode */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleModeSelect('dual')}
                    className="cursor-pointer"
                  >
                    <Card
                      className="relative overflow-hidden border-4 border-purple-500/30 hover:border-magenta-500 transition-all duration-500 h-full"
                      style={{
                        background: 'rgba(30, 15, 60, 0.9)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {/* Recommended badge */}
                      <div className="absolute top-4 right-4 bg-magenta-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        RECOMMENDED
                      </div>

                      <div className="p-8 flex flex-col items-center text-center space-y-6">
                        <motion.div
                          className="w-20 h-20 rounded-full flex items-center justify-center pulse-glow"
                          style={{
                            background: 'linear-gradient(135deg, #ff00ff40, #ff00ff20)',
                            border: '3px solid #ff00ff',
                            boxShadow: '0 0 30px #ff00ff'
                          }}
                          animate={{
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Users className="w-10 h-10 text-magenta-400" />
                        </motion.div>

                        <h3 className="text-2xl font-bold text-magenta-400">
                          My Partner Will Too
                        </h3>

                        <p className="text-sm text-gray-300">
                          Generate a link for your partner. Both complete the assessment for deeper insights.
                        </p>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Solo Both Mode */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleModeSelect('solo_both')}
                    className="cursor-pointer"
                  >
                    <Card
                      className="relative overflow-hidden border-4 border-purple-500/30 hover:border-green-400 transition-all duration-500 h-full"
                      style={{
                        background: 'rgba(20, 10, 40, 0.8)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <div className="p-8 flex flex-col items-center text-center space-y-6">
                        <motion.div
                          className="w-20 h-20 rounded-full flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #00ff8040, #00ff8020)',
                            border: '3px solid #00ff80',
                            boxShadow: '0 0 20px #00ff8040'
                          }}
                        >
                          <Sparkles className="w-10 h-10 text-green-400" />
                        </motion.div>

                        <h3 className="text-2xl font-bold text-green-400">
                          I'll Do Both
                        </h3>

                        <p className="text-sm text-gray-300">
                          Answer for yourself first, then answer as if you were your partner.
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Partner Link Generation Screen */}
          {assessmentMode === 'dual' && (
            <motion.div
              key="partner-link"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full max-w-3xl"
            >
              <Card
                className="border-4 border-magenta-500 overflow-hidden"
                style={{
                  background: 'rgba(30, 15, 60, 0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="p-12 space-y-8">
                  <div className="text-center">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      💌
                    </motion.div>

                    <h2 className="text-4xl font-black text-magenta-400 mb-4">
                      Share With Your Partner
                    </h2>

                    <p className="text-xl text-gray-300">
                      Send this link to your partner so they can complete their assessment.
                      Once both of you finish, I'll analyze your relationship dynamics.
                    </p>
                  </div>

                  {/* Partner Link Display */}
                  <div className="bg-black/40 border-2 border-magenta-500/50 rounded-xl p-6">
                    <div className="flex items-center space-x-4">
                      <LinkIcon className="w-6 h-6 text-magenta-400 flex-shrink-0" />
                      <div className="flex-1 font-mono text-sm text-cyan-300 break-all">
                        {`${window.location.origin}/partner-assessment/${localStorage.getItem('currentAssessmentId')}`}
                      </div>
                      <Button
                        onClick={copyPartnerLink}
                        className="flex-shrink-0"
                        style={{
                          background: linkCopied ? '#00ff80' : '#ff00ff',
                          color: '#000'
                        }}
                      >
                        {linkCopied ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Link
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-cyan-400">
                      What happens next:
                    </h3>
                    <ol className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-magenta-500 text-white flex items-center justify-center font-bold">
                          1
                        </span>
                        <span>Copy the link and send it to your partner via text, email, or any messaging app</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-magenta-500 text-white flex items-center justify-center font-bold">
                          2
                        </span>
                        <span>Your partner opens the link and completes their assessment</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-magenta-500 text-white flex items-center justify-center font-bold">
                          3
                        </span>
                        <span>You complete your own assessment</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-magenta-500 text-white flex items-center justify-center font-bold">
                          4
                        </span>
                        <span>Once both are done, I'll generate your parallel realities based on both profiles</span>
                      </li>
                    </ol>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={startMyAssessment}
                      className="flex-1 py-6 text-xl font-black rounded-xl neon-border pulse-glow"
                      style={{
                        background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
                        border: '3px solid #ff00ff',
                        color: '#ffffff'
                      }}
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span>Start My Assessment</span>
                        <ChevronRight className="w-6 h-6" />
                      </span>
                    </Button>
                  </div>

                  <p className="text-center text-sm text-gray-400">
                    You can start your assessment now. Your partner can complete theirs anytime using the link.
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

