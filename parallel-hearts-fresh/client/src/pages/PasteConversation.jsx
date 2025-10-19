import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Sparkles, Loader2, Award, AlertCircle, CheckCircle , Home } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { assessConversationQuality, analyzeConversation, storeAnalysisResults } from '../services/api'

export default function PasteConversation() {
  const navigate = useNavigate()
  const [conversation, setConversation] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [qualityBadge, setQualityBadge] = useState(null)
  const [showQuestions, setShowQuestions] = useState(false)
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: ''
  })

  const qualityLevels = {
    novice: {
      name: 'NOVICE',
      minChars: 50,
      maxChars: 200,
      color: '#ff0055',
      gradient: 'from-red-500 to-pink-600',
      icon: '🌱',
      message: 'Your conversation is too brief for deep analysis',
      needsQuestions: true
    },
    apprentice: {
      name: 'APPRENTICE',
      minChars: 200,
      maxChars: 500,
      color: '#ff6600',
      gradient: 'from-orange-500 to-yellow-600',
      icon: '⭐',
      message: 'Good start! A bit more context would help',
      needsQuestions: true
    },
    adept: {
      name: 'ADEPT',
      minChars: 500,
      maxChars: 1000,
      color: '#00ff80',
      gradient: 'from-green-400 to-cyan-500',
      icon: '💎',
      message: 'Great conversation depth!',
      needsQuestions: false
    },
    master: {
      name: 'MASTER',
      minChars: 1000,
      maxChars: 2000,
      color: '#00ffff',
      gradient: 'from-cyan-400 to-blue-500',
      icon: '👑',
      message: 'Excellent conversation quality!',
      needsQuestions: false
    },
    grandmaster: {
      name: 'GRANDMASTER',
      minChars: 2000,
      maxChars: Infinity,
      color: '#ff00ff',
      gradient: 'from-magenta-500 to-purple-600',
      icon: '🔮',
      message: 'Exceptional conversation depth!',
      needsQuestions: false
    }
  }

  const followUpQuestions = [
    {
      id: 'q1',
      question: 'What are the main topics you and your partner discuss most often?',
      placeholder: 'e.g., Work, family, future plans, hobbies...'
    },
    {
      id: 'q2',
      question: 'How do you typically resolve disagreements?',
      placeholder: 'e.g., We talk it through, we take time apart, we compromise...'
    },
    {
      id: 'q3',
      question: 'What makes you feel most connected to your partner?',
      placeholder: 'e.g., Deep conversations, physical touch, shared activities...'
    },
    {
      id: 'q4',
      question: 'What is one thing you wish was different in your relationship?',
      placeholder: 'e.g., More quality time, better communication, more support...'
    }
  ]

  const analyzeQuality = (text) => {
    const length = text.trim().length
    const words = text.trim().split(/\s+/).length
    const lines = text.trim().split('\n').length
    
    // Calculate quality score based on multiple factors
    let quality = null
    
    if (length >= qualityLevels.grandmaster.minChars) {
      quality = qualityLevels.grandmaster
    } else if (length >= qualityLevels.master.minChars) {
      quality = qualityLevels.master
    } else if (length >= qualityLevels.adept.minChars) {
      quality = qualityLevels.adept
    } else if (length >= qualityLevels.apprentice.minChars) {
      quality = qualityLevels.apprentice
    } else if (length >= qualityLevels.novice.minChars) {
      quality = qualityLevels.novice
    }

    return quality
  }

  const handleAnalyzeQuality = async () => {
    if (conversation.trim().length < 50) {
      alert('Please paste a conversation (at least 50 characters)')
      return
    }

    setAnalyzing(true)
    
    try {
      // Call Claude API for quality assessment
      const result = await assessConversationQuality(conversation)
      
      if (result.success) {
        // Map API response to quality level
        const qualityLevel = qualityLevels[result.badge] || qualityLevels.novice
        setQualityBadge(qualityLevel)
        
        if (result.needs_questions) {
          setShowQuestions(true)
        }
      } else {
        throw new Error(result.error || 'Quality assessment failed')
      }
    } catch (error) {
      console.error('Quality assessment error:', error)
      // Fallback to local assessment
      const quality = analyzeQuality(conversation)
      if (quality) {
        setQualityBadge(quality)
        if (quality.needsQuestions) {
          setShowQuestions(true)
        }
      }
    } finally {
      setAnalyzing(false)
    }
  }

  const handleFinalAnalysis = async () => {
    // Check if questions are answered for low quality
    if (qualityBadge?.needsQuestions) {
      const allAnswered = Object.values(answers).every(a => a.trim().length > 10)
      if (!allAnswered) {
        alert('Please answer all questions (at least 10 characters each) to continue')
        return
      }
    }

    setAnalyzing(true)
    setProgress(0)

    try {
      // Prepare additional context from questions
      const additionalContext = qualityBadge?.needsQuestions ? {
        'Main topics discussed': answers.q1,
        'Conflict resolution style': answers.q2,
        'Connection factors': answers.q3,
        'Desired changes': answers.q4
      } : null

      // Simulate progress while analyzing
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 90))
      }, 500)

      // Call Claude API for full analysis
      const result = await analyzeConversation(
        conversation,
        'romantic',
        additionalContext
      )

      clearInterval(progressInterval)
      setProgress(100)

      if (result.success) {
        // Store analysis results for next page
        storeAnalysisResults(result.analysis)
        
        // Navigate to loading realities page
        setTimeout(() => {
          navigate('/loading-realities')
        }, 500)
      } else {
        throw new Error(result.error || 'Analysis failed')
      }
    } catch (error) {
      console.error('Analysis error:', error)
      alert(`Analysis failed: ${error.message}\n\nPlease ensure the backend API is running with a valid CLAUDE_API_KEY.`)
      setAnalyzing(false)
      setProgress(0)
    }
  }

  const canProceed = qualityBadge && (!qualityBadge.needsQuestions || Object.values(answers).every(a => a.trim().length > 10))

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
<div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-cyan-300 hover:text-cyan-100"
          style={{
            border: '2px solid rgba(0, 255, 255, 0.3)',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)'
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Title */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl md:text-5xl font-black mb-4 glow-text"
              style={{
                background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Paste Your Conversation
            </h1>
            <p className="text-lg text-cyan-200">
              The more you share, the deeper the analysis
            </p>
          </div>

          {/* Input Card */}
          <Card
            className="border-4 border-purple-500/50 p-8"
            style={{
              background: 'rgba(20, 10, 40, 0.8)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="space-y-4">
              <label className="text-lg font-semibold text-magenta-300">
                Conversation Text
              </label>
              <textarea
                value={conversation}
                onChange={(e) => setConversation(e.target.value)}
                placeholder="Paste your conversation here...&#10;&#10;Example:&#10;You: Hey, how was your day?&#10;Partner: It was good! I finished that project I was working on.&#10;You: That's amazing! Want to celebrate tonight?&#10;Partner: I'd love that!"
                className="w-full h-96 p-4 rounded-lg text-white resize-none focus:outline-none focus:ring-2"
                style={{
                  background: 'rgba(10, 5, 20, 0.8)',
                  border: '2px solid rgba(255, 0, 255, 0.3)',
                  boxShadow: 'inset 0 0 20px rgba(255, 0, 255, 0.1)'
                }}
                disabled={analyzing || qualityBadge !== null}
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>{conversation.length} characters</span>
                <span>Minimum 50 characters</span>
              </div>
            </div>

            {!qualityBadge && (
              <Button
                onClick={handleAnalyzeQuality}
                disabled={conversation.trim().length < 50}
                className="w-full mt-6 py-6 text-xl font-bold"
                style={{
                  background: conversation.trim().length >= 50
                    ? 'linear-gradient(135deg, #ff00ff, #00ffff)'
                    : 'rgba(100, 50, 150, 0.3)',
                  border: '2px solid rgba(255, 0, 255, 0.5)',
                  color: '#ffffff'
                }}
              >
                Analyze Quality
              </Button>
            )}
          </Card>

          {/* Quality Badge Display */}
          <AnimatePresence>
            {qualityBadge && !analyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Card
                  className="border-4 p-8 neon-border text-center"
                  style={{
                    background: 'rgba(30, 15, 60, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderColor: qualityBadge.color
                  }}
                >
                  {/* Badge Icon */}
                  <motion.div
                    className="flex justify-center mb-6"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div
                      className="w-32 h-32 rounded-full flex items-center justify-center text-6xl pulse-glow"
                      style={{
                        background: `linear-gradient(135deg, ${qualityBadge.color}40, ${qualityBadge.color}20)`,
                        border: `4px solid ${qualityBadge.color}`,
                        boxShadow: `0 0 40px ${qualityBadge.color}, inset 0 0 30px ${qualityBadge.color}`
                      }}
                    >
                      {qualityBadge.icon}
                    </div>
                  </motion.div>

                  {/* Badge Name */}
                  <h2
                    className="text-4xl font-black mb-4 glow-text"
                    style={{ color: qualityBadge.color }}
                  >
                    {qualityBadge.name}
                  </h2>

                  {/* Message */}
                  <p className="text-xl text-gray-300 mb-6">
                    {qualityBadge.message}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-300">
                        {conversation.length}
                      </div>
                      <div className="text-sm text-gray-400">Characters</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-magenta-300">
                        {conversation.trim().split(/\s+/).length}
                      </div>
                      <div className="text-sm text-gray-400">Words</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-300">
                        {conversation.trim().split('\n').length}
                      </div>
                      <div className="text-sm text-gray-400">Lines</div>
                    </div>
                  </div>

                  {/* Status indicator */}
                  {qualityBadge.needsQuestions ? (
                    <div className="flex items-center justify-center space-x-2 text-orange-400">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-semibold">Additional questions required for quality analysis</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Sufficient data for comprehensive analysis</span>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Follow-up Questions */}
          <AnimatePresence>
            {showQuestions && !analyzing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card
                  className="border-4 border-orange-500/50 p-8"
                  style={{
                    background: 'rgba(20, 10, 40, 0.8)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-orange-300 mb-2">
                      Help Us Understand Better
                    </h3>
                    <p className="text-gray-300">
                      Answer these questions to enhance the analysis quality
                    </p>
                  </div>

                  <div className="space-y-6">
                    {followUpQuestions.map((q, index) => (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-semibold text-cyan-300 flex items-start">
                          <span className="mr-2 text-magenta-400">Q{index + 1}.</span>
                          {q.question}
                        </label>
                        <Input
                          value={answers[q.id]}
                          onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                          placeholder={q.placeholder}
                          className="w-full p-4 text-white"
                          style={{
                            background: 'rgba(10, 5, 20, 0.8)',
                            border: '2px solid rgba(0, 255, 255, 0.3)',
                            boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.1)'
                          }}
                        />
                        <div className="text-xs text-gray-500 text-right">
                          {answers[q.id].length} / 10 min
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Analysis Progress */}
          {analyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card
                className="border-4 p-6 neon-border"
                style={{
                  background: 'rgba(30, 15, 60, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderColor: '#00ffff'
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                    <span className="text-xl font-semibold text-cyan-300">
                      Generating Parallel Realities...
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative w-full h-4 rounded-full overflow-hidden"
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '2px solid rgba(0, 255, 255, 0.3)'
                    }}
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0"
                      style={{
                        background: 'linear-gradient(90deg, #ff00ff, #00ffff)',
                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)'
                      }}
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="text-center text-cyan-200 text-sm">
                    {progress}% Complete
                  </div>

                  {/* Analysis Steps */}
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className={progress >= 20 ? 'text-cyan-300' : ''}>
                      {progress >= 20 ? '✓' : '○'} Extracting conversation patterns...
                    </div>
                    <div className={progress >= 40 ? 'text-cyan-300' : ''}>
                      {progress >= 40 ? '✓' : '○'} Analyzing emotional dynamics...
                    </div>
                    <div className={progress >= 60 ? 'text-cyan-300' : ''}>
                      {progress >= 60 ? '✓' : '○'} Building psychological profile...
                    </div>
                    <div className={progress >= 80 ? 'text-cyan-300' : ''}>
                      {progress >= 80 ? '✓' : '○'} Calculating probability matrices...
                    </div>
                    <div className={progress >= 100 ? 'text-cyan-300' : ''}>
                      {progress >= 100 ? '✓' : '○'} Rendering parallel realities...
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Proceed Button */}
          {qualityBadge && !analyzing && (
            <Button
              onClick={handleFinalAnalysis}
              disabled={!canProceed}
              className={`w-full py-8 text-2xl font-black tracking-wider rounded-2xl relative overflow-hidden transition-all duration-500 ${
                canProceed
                  ? 'neon-border pulse-glow'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              style={{
                background: canProceed
                  ? 'linear-gradient(135deg, #ff00ff, #00ffff, #9d00ff)'
                  : 'rgba(100, 50, 150, 0.3)',
                border: canProceed ? '3px solid #ff00ff' : '3px solid rgba(157, 0, 255, 0.3)',
                color: '#ffffff',
                textShadow: canProceed ? '0 0 20px rgba(255, 255, 255, 0.8)' : 'none'
              }}
            >
              {canProceed ? (
                <span className="flex items-center justify-center space-x-3">
                  <Sparkles className="w-6 h-6" />
                  <span>GENERATE REALITIES</span>
                  <Sparkles className="w-6 h-6" />
                </span>
              ) : (
                <span>
                  {qualityBadge.needsQuestions 
                    ? 'ANSWER ALL QUESTIONS TO CONTINUE' 
                    : 'ANALYZING...'}
                </span>
              )}
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  )
}

