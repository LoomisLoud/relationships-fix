import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, Sparkles, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PartnerAssessment() {
  const navigate = useNavigate()
  const { assessmentId } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Validate assessment ID
    if (!assessmentId || !assessmentId.startsWith('assess_')) {
      setError('Invalid assessment link')
      setLoading(false)
      return
    }

    // Check if this assessment already has partner data
    const partnerData = localStorage.getItem(`assessment_${assessmentId}_partner`)
    if (partnerData) {
      setError('This assessment has already been completed by a partner')
      setLoading(false)
      return
    }

    setLoading(false)
  }, [assessmentId])

  const startAssessment = () => {
    // Store that this is a partner assessment
    localStorage.setItem('currentAssessmentId', assessmentId)
    localStorage.setItem('assessmentInitiator', 'false')

    navigate('/assessment-questionnaire', {
      state: {
        type: 'romantic', // Will be overridden by original assessment data
        mode: 'dual',
        assessingFor: 'partner',
        assessmentId
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ✨
          </motion.div>
          <p className="text-xl text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">Oops!</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <Button
            onClick={() => navigate('/')}
            className="w-full"
          >
            Go to Homepage
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated cosmic background */}
      <div className="absolute inset-0 cosmic-bg opacity-30"></div>
      
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
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
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
                  className="text-8xl mb-6"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  💕
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-black mb-4 glow-text"
                  style={{
                    background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Your Partner Invited You
                </h1>

                <p className="text-xl text-gray-300 mb-6">
                  They want to explore your relationship's parallel realities together.
                </p>

                <div className="bg-black/40 border-2 border-cyan-500/50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-bold text-cyan-400 mb-3">
                    What is this?
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    You'll complete a deep psychological assessment exploring 12 realms of your relational self. 
                    Once both of you finish, I'll analyze your profiles using Jungian psychology, attachment theory, 
                    and the Enneagram to reveal your relationship archetype and generate parallel reality scenarios.
                  </p>
                </div>

                <div className="space-y-4 text-left mb-8">
                  <h3 className="text-xl font-bold text-magenta-400 text-center mb-4">
                    What you'll discover:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Heart className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-pink-400">Your Archetype</p>
                        <p className="text-sm text-gray-400">One of 14 relationship patterns</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-cyan-400">Parallel Realities</p>
                        <p className="text-sm text-gray-400">5-10 possible futures</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">🧠</span>
                      <div>
                        <p className="font-bold text-purple-400">Deep Insights</p>
                        <p className="text-sm text-gray-400">Subconscious patterns revealed</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">🌟</span>
                      <div>
                        <p className="font-bold text-yellow-400">Growth Path</p>
                        <p className="text-sm text-gray-400">Actionable recommendations</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-magenta-500/10 border-2 border-magenta-500/30 rounded-xl p-4 mb-8">
                  <p className="text-sm text-gray-300">
                    ⏱️ <strong>Time required:</strong> 10-15 minutes<br/>
                    🔒 <strong>Privacy:</strong> Your answers are stored locally and analyzed by AI<br/>
                    ✨ <strong>No right answers:</strong> Trust your first impulse
                  </p>
                </div>
              </div>

              <Button
                onClick={startAssessment}
                className="w-full py-6 text-xl font-black rounded-xl neon-border pulse-glow"
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

              <p className="text-center text-xs text-gray-500">
                Assessment ID: {assessmentId}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

