import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { ChevronRight, ChevronLeft, Sparkles, Trophy, Star, Zap, Heart, Award, Target, Flame } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { realms } from '@/data/assessmentQuestions'

export default function AssessmentQuestionnaire() {
  const navigate = useNavigate()
  const location = useLocation()
  const { type, subType, mode, assessingFor, assessmentId } = location.state || {}

  const [currentRealmIndex, setCurrentRealmIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [totalPoints, setTotalPoints] = useState(0)
  const [badges, setBadges] = useState([])
  const [showRealmTransition, setShowRealmTransition] = useState(false)
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [encouragementMessage, setEncouragementMessage] = useState('')
  const [realmCharacter, setRealmCharacter] = useState(null)
  const [streak, setStreak] = useState(0)
  const [showBadgeUnlock, setShowBadgeUnlock] = useState(false)
  const [unlockedBadge, setUnlockedBadge] = useState(null)

  const currentRealm = realms[currentRealmIndex]
  const currentQuestion = currentRealm?.questions[currentQuestionIndex]
  const totalQuestions = realms.reduce((sum, realm) => sum + realm.questions.length, 0)
  const answeredQuestions = Object.keys(answers).length
  const progress = (answeredQuestions / totalQuestions) * 100

  // Realm characters
  const realmCharacters = [
    { emoji: '🦸', name: 'The Guide', message: 'Welcome to the Realm of Archetypes! Let\'s discover your inner hero.' },
    { emoji: '💝', name: 'The Keeper', message: 'In the Realm of Attachment, we explore how you bond and connect.' },
    { emoji: '🗣️', name: 'The Messenger', message: 'Welcome to Communication! How do you express your truth?' },
    { emoji: '🔥', name: 'The Alchemist', message: 'Feel the Realm of Emotions. Let your feelings guide you.' },
    { emoji: '🧠', name: 'The Sage', message: 'Enter the Realm of Beliefs. What stories shape your love?' },
    { emoji: '💎', name: 'The Guardian', message: 'In the Realm of Values, discover what you hold sacred.' },
    { emoji: '🎭', name: 'The Mirror', message: 'The Realm of Identity awaits. Who must you be to be loved?' },
    { emoji: '🌱', name: 'The Healer', message: 'Welcome to Needs. What does your heart truly require?' },
    { emoji: '⚡', name: 'The Warrior', message: 'In the Realm of Power, explore your strength and boundaries.' },
    { emoji: '🌊', name: 'The Oracle', message: 'The Realm of Intimacy beckons. How deep can you go?' },
    { emoji: '🎯', name: 'The Visionary', message: 'In Expectations, we see what you hope and fear.' },
    { emoji: '🦋', name: 'The Transformer', message: 'Welcome to Growth! How do you evolve through love?' }
  ]

  // Encouragement messages
  const encouragementMessages = [
    '✨ You\'re doing amazing!',
    '🌟 Keep going, you\'re on fire!',
    '💫 Your insights are powerful!',
    '🎯 You\'re unlocking deep truths!',
    '🔥 Incredible self-awareness!',
    '💎 You\'re a natural at this!',
    '🚀 You\'re making great progress!',
    '🌈 Your honesty is beautiful!',
    '⚡ You\'re crushing it!',
    '🎨 Your answers paint a vivid picture!'
  ]

  // Badge definitions
  const badgeDefinitions = [
    { id: 'first_answer', name: 'First Step', emoji: '👣', condition: (answers) => Object.keys(answers).length === 1 },
    { id: 'realm_1', name: 'Archetype Explorer', emoji: '🪞', condition: (answers, realm) => realm === 0 && isRealmComplete(0, answers) },
    { id: 'realm_2', name: 'Attachment Master', emoji: '💝', condition: (answers, realm) => realm === 1 && isRealmComplete(1, answers) },
    { id: 'realm_3', name: 'Communication Pro', emoji: '🗣️', condition: (answers, realm) => realm === 2 && isRealmComplete(2, answers) },
    { id: 'halfway', name: 'Halfway Hero', emoji: '🏆', condition: (answers) => Object.keys(answers).length >= totalQuestions / 2 },
    { id: 'streak_5', name: 'On Fire', emoji: '🔥', condition: (answers, realm, streak) => streak >= 5 },
    { id: 'all_realms', name: 'Realm Master', emoji: '👑', condition: (answers) => Object.keys(answers).length === totalQuestions }
  ]

  function isRealmComplete(realmIndex, currentAnswers) {
    const realm = realms[realmIndex]
    return realm.questions.every(q => currentAnswers[q.id])
  }

  useEffect(() => {
    // Show realm character when entering new realm
    if (currentQuestionIndex === 0) {
      setRealmCharacter(realmCharacters[currentRealmIndex])
      setTimeout(() => setRealmCharacter(null), 3000)
    }
  }, [currentRealmIndex])

  useEffect(() => {
    // Check for badge unlocks
    badgeDefinitions.forEach(badgeDef => {
      if (!badges.find(b => b.id === badgeDef.id) && badgeDef.condition(answers, currentRealmIndex, streak)) {
        unlockBadge(badgeDef)
      }
    })
  }, [answers, currentRealmIndex, streak])

  const unlockBadge = (badge) => {
    setBadges(prev => [...prev, badge])
    setUnlockedBadge(badge)
    setShowBadgeUnlock(true)
    setTimeout(() => setShowBadgeUnlock(false), 3000)
  }

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(newAnswers)

    // Award points
    const points = 10
    setTotalPoints(prev => prev + points)
    setStreak(prev => prev + 1)

    // Show encouragement every 3 answers
    if (Object.keys(newAnswers).length % 3 === 0) {
      showRandomEncouragement()
    }

    // Move to next question or realm
    setTimeout(() => {
      if (currentQuestionIndex < currentRealm.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
      } else if (currentRealmIndex < realms.length - 1) {
        // Realm complete! Show transition
        setShowRealmTransition(true)
        setTimeout(() => {
          setShowRealmTransition(false)
          setCurrentRealmIndex(prev => prev + 1)
          setCurrentQuestionIndex(0)
        }, 2000)
      } else {
        // All done!
        completeAssessment(newAnswers)
      }
    }, 300)
  }

  const showRandomEncouragement = () => {
    const message = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]
    setEncouragementMessage(message)
    setShowEncouragement(true)
    setTimeout(() => setShowEncouragement(false), 2000)
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    } else if (currentRealmIndex > 0) {
      setCurrentRealmIndex(prev => prev - 1)
      setCurrentQuestionIndex(realms[currentRealmIndex - 1].questions.length - 1)
    }
  }

  const completeAssessment = (finalAnswers) => {
    // Store answers
    if (mode === 'solo_both' && assessingFor === 'self_first') {
      // Save self answers and prompt for partner answers
      localStorage.setItem('selfAssessmentAnswers', JSON.stringify(finalAnswers))
      navigate('/assessment-questionnaire', {
        state: {
          type,
          subType,
          mode,
          assessingFor: 'partner',
          assessmentId
        }
      })
    } else {
      // Navigate to loading/analysis
      const assessmentData = {
        selfAnswers: mode === 'solo_both' ? JSON.parse(localStorage.getItem('selfAssessmentAnswers')) : finalAnswers,
        partnerAnswers: mode === 'solo_both' ? finalAnswers : null,
        mode,
        type,
        subType
      }

      navigate('/loading-realities', {
        state: {
          type,
          subType,
          assessmentData,
          source: 'assessment'
        }
      })
    }
  }

  const renderQuestion = () => {
    if (!currentQuestion) return null

    switch (currentQuestion.type) {
      case 'choice':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(option.value)}
                className="cursor-pointer"
              >
                <Card
                  className="p-6 border-4 border-purple-500/30 hover:border-cyan-400 transition-all duration-300"
                  style={{
                    background: 'rgba(30, 15, 60, 0.8)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="flex items-center space-x-4">
                    {option.emoji && (
                      <span className="text-4xl">{option.emoji}</span>
                    )}
                    <span className="text-lg font-semibold text-white">
                      {option.label}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )

      case 'visual':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAnswer(option.value)}
                className="cursor-pointer"
              >
                <Card
                  className="aspect-square flex items-center justify-center border-4 border-purple-500/30 hover:border-magenta-500 transition-all duration-300"
                  style={{
                    background: 'rgba(30, 15, 60, 0.8)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span className="text-6xl">{option.emoji}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        )

      case 'slider':
        return (
          <div className="space-y-8">
            <Slider
              defaultValue={[5]}
              max={10}
              step={1}
              className="w-full"
              onValueCommit={(value) => handleAnswer(value[0])}
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>{currentQuestion.min}</span>
              <span>{currentQuestion.max}</span>
            </div>
            <Button
              onClick={() => handleAnswer(5)}
              className="w-full py-6 text-lg font-bold"
              style={{
                background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
                border: '3px solid #ff00ff'
              }}
            >
              Continue
            </Button>
          </div>
        )

      case 'ranking':
        return (
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                onClick={() => handleAnswer(option.value)}
                className="cursor-pointer"
              >
                <Card
                  className="p-4 border-4 border-purple-500/30 hover:border-cyan-400 transition-all duration-300"
                  style={{
                    background: 'rgba(30, 15, 60, 0.8)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-cyan-400">
                      {index + 1}
                    </span>
                    <span className="text-lg text-white">{option.label}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated cosmic background */}
      <div className="absolute inset-0 cosmic-bg opacity-30"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
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
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Top Stats Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-20 bg-black/50 backdrop-blur-md border-b-4 border-purple-500/50 px-6 py-4"
      >
        <div className="container mx-auto flex justify-between items-center flex-wrap gap-4">
          {/* Points */}
          <motion.div
            className="flex items-center space-x-2"
            animate={{ scale: totalPoints % 10 === 0 && totalPoints > 0 ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
            key={totalPoints}
          >
            <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
            <span className="text-2xl font-black text-yellow-400">{totalPoints}</span>
            <span className="text-sm text-gray-400">points</span>
          </motion.div>

          {/* Streak */}
          {streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center space-x-2"
            >
              <Flame className="w-6 h-6 text-orange-500" />
              <span className="text-xl font-bold text-orange-500">{streak}</span>
              <span className="text-sm text-gray-400">streak</span>
            </motion.div>
          )}

          {/* Badges */}
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold text-purple-400">{badges.length}</span>
            <div className="flex space-x-1">
              {badges.slice(-3).map((badge, i) => (
                <motion.span
                  key={badge.id}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-2xl"
                >
                  {badge.emoji}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="container mx-auto mt-4">
          <div className="relative h-3 bg-purple-900/50 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-magenta-500 via-cyan-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              style={{
                boxShadow: '0 0 20px rgba(255, 0, 255, 0.8)'
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Realm {currentRealmIndex + 1} of {realms.length}</span>
            <span>{answeredQuestions} / {totalQuestions} questions</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {/* Realm Transition */}
          {showRealmTransition && (
            <motion.div
              key="transition"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg"
            >
              <div className="text-center">
                <motion.div
                  className="text-9xl mb-6"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{ duration: 1.5 }}
                >
                  {currentRealm.emoji}
                </motion.div>
                <motion.h2
                  className="text-5xl font-black mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${currentRealm.color}, #00ffff)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Realm Complete!
                </motion.h2>
                <motion.p
                  className="text-2xl text-cyan-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  +50 Bonus Points! 🎉
                </motion.p>
              </div>
            </motion.div>
          )}

          {/* Realm Character Introduction */}
          {realmCharacter && (
            <motion.div
              key="character"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-30 max-w-lg w-full px-4"
            >
              <Card
                className="p-6 border-4 border-cyan-400"
                style={{
                  background: 'rgba(0, 0, 0, 0.9)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)'
                }}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-6xl">{realmCharacter.emoji}</span>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400">{realmCharacter.name}</h3>
                    <p className="text-gray-300">{realmCharacter.message}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Encouragement Popup */}
          {showEncouragement && (
            <motion.div
              key="encouragement"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              className="fixed top-1/3 left-1/2 transform -translate-x-1/2 z-40"
            >
              <div
                className="px-8 py-4 rounded-full text-2xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
                  boxShadow: '0 0 40px rgba(255, 0, 255, 0.8)'
                }}
              >
                {encouragementMessage}
              </div>
            </motion.div>
          )}

          {/* Badge Unlock */}
          {showBadgeUnlock && unlockedBadge && (
            <motion.div
              key="badge"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <Card
                className="p-8 border-4 border-yellow-400"
                style={{
                  background: 'rgba(0, 0, 0, 0.95)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 60px rgba(255, 215, 0, 0.8)'
                }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-8xl mb-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1 }}
                  >
                    {unlockedBadge.emoji}
                  </motion.div>
                  <h3 className="text-3xl font-black text-yellow-400 mb-2">
                    Badge Unlocked!
                  </h3>
                  <p className="text-xl text-white">{unlockedBadge.name}</p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Question Card */}
          <motion.div
            key={`realm-${currentRealmIndex}-q-${currentQuestionIndex}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="max-w-4xl mx-auto"
          >
            {/* Realm Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="text-7xl mb-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {currentRealm.emoji}
              </motion.div>
              <h2
                className="text-4xl font-black mb-2"
                style={{
                  color: currentRealm.color,
                  textShadow: `0 0 20px ${currentRealm.color}`
                }}
              >
                {currentRealm.name}
              </h2>
              <p className="text-lg text-gray-400">{currentRealm.theme}</p>
            </motion.div>

            {/* Question */}
            <Card
              className="p-8 md:p-12 border-4 mb-8"
              style={{
                background: 'rgba(20, 10, 40, 0.9)',
                backdropFilter: 'blur(20px)',
                borderColor: currentRealm.color,
                boxShadow: `0 0 40px ${currentRealm.color}40`
              }}
            >
              <motion.h3
                className="text-2xl md:text-3xl font-bold text-white mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentQuestion?.text}
              </motion.h3>

              {renderQuestion()}
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                onClick={handleBack}
                disabled={currentRealmIndex === 0 && currentQuestionIndex === 0}
                variant="outline"
                className="px-6 py-3"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </Button>

              <div className="text-gray-400 text-sm">
                Question {currentQuestionIndex + 1} of {currentRealm.questions.length}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

