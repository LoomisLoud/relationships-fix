import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function LoadingRealities() {
  const navigate = useNavigate()
  const location = useLocation()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisData, setAnalysisData] = useState(null)
  
  const { type, subType, source, conversation, assessmentData } = location.state || {}

  const loadingSteps = [
    {
      id: 0,
      text: 'Analyzing psychological profiles',
      duration: 2000,
      color: '#ff00ff'
    },
    {
      id: 1,
      text: 'Computing the possibility of lifelong relationship',
      duration: 2500,
      color: '#00ffff'
    },
    {
      id: 2,
      text: 'Computing the possibility of breakup',
      duration: 2000,
      color: '#ff0055'
    },
    {
      id: 3,
      text: 'Simulating the parallel realities',
      duration: 3000,
      color: '#00ff80'
    },
    {
      id: 4,
      text: 'Analyzing the best path forward',
      duration: 2500,
      color: '#9d00ff'
    }
  ]

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 0.5
      })
    }, 60)

    // Step progression
    let totalTime = 0
    loadingSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index)
      }, totalTime)
      totalTime += step.duration
    })

    // Start analysis based on source
    if (source === 'assessment') {
      analyzeAssessment()
    } else {
      analyzeConversation()
    }

    return () => clearInterval(progressInterval)
  }, [])
  
  // Navigate when analysis is complete
  useEffect(() => {
    if (analysisComplete && analysisData) {
      setTimeout(() => {
        navigate('/results', {
          state: {
            analysis: analysisData,
            type,
            subType,
            source
          }
        })
      }, 1000)
    }
  }, [analysisComplete, analysisData])
  
  const analyzeAssessment = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('analyze-assessment', {
        body: {
          partner1_answers: assessmentData.answers,
          partner2_answers: assessmentData.partnerAnswers || null,
          relationship_type: type,
          mode: assessmentData.mode
        }
      })
      
      if (error) throw error
      
      setAnalysisData(data.analysis)
      setAnalysisComplete(true)
    } catch (error) {
      console.error('Assessment analysis error:', error)
      // Still navigate but with error state
      setTimeout(() => {
        navigate('/results', {
          state: {
            error: 'Failed to analyze assessment. Please try again.',
            type,
            subType
          }
        })
      }, 2000)
    }
  }
  
  const analyzeConversation = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('analyze-conversation', {
        body: {
          conversation: conversation || 'No conversation provided',
          relationship_type: type
        }
      })
      
      if (error) throw error
      
      setAnalysisData(data.analysis)
      setAnalysisComplete(true)
    } catch (error) {
      console.error('Conversation analysis error:', error)
      // Still navigate but with error state
      setTimeout(() => {
        navigate('/results', {
          state: {
            error: 'Failed to analyze conversation. Please try again.',
            type,
            subType
          }
        })
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated cosmic background */}
      <div className="absolute inset-0 cosmic-bg opacity-40"></div>

      {/* Floating particles - more dense */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#ff00ff', '#00ffff', '#9d00ff', '#00ff80', '#ff0055'][Math.floor(Math.random() * 5)],
              boxShadow: '0 0 10px currentColor'
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Rotating mushroom circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2"
            style={{
              width: `${(i + 1) * 150}px`,
              height: `${(i + 1) * 150}px`,
              borderColor: loadingSteps[currentStep]?.color || '#ff00ff',
              opacity: 0.2
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: {
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'linear'
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        
        {/* Central icon */}
        <motion.div
          className="mb-12"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div
            className="text-9xl"
            style={{
              filter: `drop-shadow(0 0 30px ${loadingSteps[currentStep]?.color || '#ff00ff'})`
            }}
          >
            🍄
          </div>
        </motion.div>

        {/* Loading text */}
        <div className="text-center mb-8 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-3xl md:text-4xl font-black mb-4"
              style={{
                color: loadingSteps[currentStep]?.color || '#ff00ff',
                textShadow: `0 0 20px ${loadingSteps[currentStep]?.color || '#ff00ff'}`
              }}
            >
              {loadingSteps[currentStep]?.text}
            </motion.h2>
          </AnimatePresence>

          <p className="text-gray-400 text-lg">
            {source === 'assessment' ? 'Analyzing your 12 Realms assessment...' : 'Analyzing your conversation...'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md">
          <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${loadingSteps[currentStep]?.color || '#ff00ff'}, ${loadingSteps[(currentStep + 1) % loadingSteps.length]?.color || '#00ffff'})`,
                boxShadow: `0 0 20px ${loadingSteps[currentStep]?.color || '#ff00ff'}`
              }}
              animate={{
                width: `${progress}%`
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>0%</span>
            <motion.span
              key={Math.floor(progress)}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="font-bold"
              style={{ color: loadingSteps[currentStep]?.color }}
            >
              {Math.floor(progress)}%
            </motion.span>
            <span>100%</span>
          </div>
        </div>

        {/* Sparkles */}
        <motion.div
          className="mt-12 flex items-center space-x-2 text-cyan-400"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-sm">Channeling the multiverse...</span>
          <Sparkles className="w-5 h-5" />
        </motion.div>

        {/* Analysis status */}
        {analysisComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-green-400 font-bold text-xl"
          >
            ✨ Analysis Complete! Preparing results...
          </motion.div>
        )}
      </div>
    </div>
  )
}

