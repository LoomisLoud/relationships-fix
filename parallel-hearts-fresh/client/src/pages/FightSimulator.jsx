import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Flame, Heart, MessageCircle, Lightbulb, TrendingDown, TrendingUp , Home } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const scenarios = [
  {
    id: 1,
    title: 'Household Chores Disagreement',
    description: 'Your partner feels you\'re not doing your fair share of housework',
    partnerMessage: 'I feel like I\'m always the one cleaning up. It would really help if you could be more proactive about the dishes and laundry.'
  },
  {
    id: 2,
    title: 'Quality Time Conflict',
    description: 'Your partner wants more quality time together',
    partnerMessage: 'I miss spending time with you. It feels like you\'re always busy with work or your phone. Can we make more time for us?'
  },
  {
    id: 3,
    title: 'Financial Decision',
    description: 'Disagreement about a major purchase',
    partnerMessage: 'I don\'t think we should spend that much money right now. We need to save for our future goals first.'
  }
]

const responseOptions = [
  {
    text: 'You\'re right, I haven\'t been pulling my weight. Let\'s create a schedule together.',
    type: 'validating',
    heatChange: -15,
    empathyPoints: 25,
    feedback: 'Excellent! You acknowledged their feelings and offered a collaborative solution.'
  },
  {
    text: 'I do plenty around here! You just don\'t notice everything I do.',
    type: 'defensive',
    heatChange: 20,
    empathyPoints: -10,
    feedback: 'This defensive response escalates conflict. Try acknowledging their perspective first.'
  },
  {
    text: 'I hear that you\'re feeling overwhelmed. Can you help me understand which tasks are most important to you?',
    type: 'curious',
    heatChange: -10,
    empathyPoints: 20,
    feedback: 'Great mirroring and curiosity! This opens dialogue and shows you care.'
  },
  {
    text: 'Whatever, I\'ll just do everything myself then.',
    type: 'dismissive',
    heatChange: 25,
    empathyPoints: -15,
    feedback: 'This shuts down communication. Try expressing your feelings without withdrawing.'
  }
]

const aiPrompts = [
  'Try using "I feel..." instead of "You always..."',
  'Mirror what you heard: "What I\'m hearing is..."',
  'Ask for clarification: "Can you help me understand..."',
  'Validate their emotion: "I can see this is important to you"',
  'Take a pause if heat is rising',
  'Express appreciation for bringing this up'
]

export default function FightSimulator({ relationshipData }) {
  const navigate = useNavigate()
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [messages, setMessages] = useState([])
  const [currentInput, setCurrentInput] = useState('')
  const [heatLevel, setHeatLevel] = useState(30)
  const [empathyScore, setEmpathyScore] = useState(0)
  const [turn, setTurn] = useState(0)
  const [showPrompt, setShowPrompt] = useState(false)
  const [simulationComplete, setSimulationComplete] = useState(false)

  const startScenario = (scenario) => {
    setSelectedScenario(scenario)
    setMessages([
      { sender: 'partner', text: scenario.partnerMessage, type: 'initial' }
    ])
    setHeatLevel(30)
    setEmpathyScore(0)
    setTurn(0)
    setSimulationComplete(false)
  }

  const handleQuickResponse = (option) => {
    // Add user message
    const userMessage = { sender: 'user', text: option.text, type: option.type }
    setMessages([...messages, userMessage])

    // Update metrics
    const newHeat = Math.max(0, Math.min(100, heatLevel + option.heatChange))
    setHeatLevel(newHeat)
    setEmpathyScore(empathyScore + option.empathyPoints)

    // Add feedback
    setTimeout(() => {
      const feedbackMessage = { sender: 'system', text: option.feedback, type: 'feedback' }
      setMessages(prev => [...prev, feedbackMessage])

      // Generate partner response
      setTimeout(() => {
        const partnerResponse = generatePartnerResponse(option.type, newHeat)
        setMessages(prev => [...prev, partnerResponse])
        setTurn(turn + 1)

        if (turn >= 2 || newHeat < 10) {
          // End simulation
          setTimeout(() => {
            setSimulationComplete(true)
          }, 1000)
        }
      }, 1000)
    }, 500)
  }

  const generatePartnerResponse = (userType, heat) => {
    if (heat < 15) {
      return {
        sender: 'partner',
        text: 'Thank you for hearing me out. I really appreciate you working with me on this. I feel much better now.',
        type: 'positive'
      }
    } else if (heat > 70) {
      return {
        sender: 'partner',
        text: 'You know what, I don\'t think you\'re even trying to understand. Maybe we should talk about this later.',
        type: 'negative'
      }
    } else if (userType === 'validating' || userType === 'curious') {
      return {
        sender: 'partner',
        text: 'I appreciate you listening. It means a lot that you\'re willing to work on this together.',
        type: 'positive'
      }
    } else {
      return {
        sender: 'partner',
        text: 'I just wish you could see things from my perspective. This is really important to me.',
        type: 'neutral'
      }
    }
  }

  const handleCustomResponse = () => {
    if (!currentInput.trim()) return

    const userMessage = { sender: 'user', text: currentInput, type: 'custom' }
    setMessages([...messages, userMessage])
    setCurrentInput('')

    // Simple analysis of custom response
    const hasIFeel = currentInput.toLowerCase().includes('i feel')
    const hasValidation = currentInput.toLowerCase().includes('understand') || 
                         currentInput.toLowerCase().includes('hear you')
    
    let heatChange = 0
    let empathyChange = 0

    if (hasIFeel) empathyChange += 10
    if (hasValidation) {
      empathyChange += 15
      heatChange -= 10
    }
    if (currentInput.includes('!') || currentInput.includes('always') || currentInput.includes('never')) {
      heatChange += 15
      empathyChange -= 10
    }

    const newHeat = Math.max(0, Math.min(100, heatLevel + heatChange))
    setHeatLevel(newHeat)
    setEmpathyScore(empathyScore + empathyChange)

    setTimeout(() => {
      const partnerResponse = generatePartnerResponse('custom', newHeat)
      setMessages(prev => [...prev, partnerResponse])
      setTurn(turn + 1)

      if (turn >= 2 || newHeat < 10) {
        setTimeout(() => {
          setSimulationComplete(true)
        }, 1000)
      }
    }, 1000)
  }

  const getHeatColor = (heat) => {
    if (heat < 30) return 'from-green-400 to-green-600'
    if (heat < 60) return 'from-yellow-400 to-orange-500'
    return 'from-red-400 to-red-600'
  }

  const getHeatLabel = (heat) => {
    if (heat < 30) return 'Calm'
    if (heat < 60) return 'Tense'
    return 'Heated'
  }

  if (simulationComplete) {
    const grade = empathyScore > 40 ? 'A' : empathyScore > 20 ? 'B' : empathyScore > 0 ? 'C' : 'D'
    const gradeColor = grade === 'A' ? 'text-green-600' : grade === 'B' ? 'text-blue-600' : grade === 'C' ? 'text-yellow-600' : 'text-red-600'

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
              
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
<motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Simulation Complete!</CardTitle>
              <CardDescription className="text-center">Here's how you did</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`text-6xl font-bold ${gradeColor} mb-2`}>{grade}</div>
                <p className="text-gray-600">Overall Grade</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">{empathyScore}</div>
                  <div className="text-sm text-gray-600">Empathy Points</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">{Math.max(0, 100 - heatLevel)}</div>
                  <div className="text-sm text-gray-600">De-escalation Score</div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Key Takeaways</h3>
                <ul className="space-y-2 text-sm text-purple-800">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{empathyScore > 30 ? 'You showed strong empathy and validation' : 'Try to validate feelings before problem-solving'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{heatLevel < 40 ? 'You successfully de-escalated the conflict' : 'Watch for defensive language that escalates tension'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Practice "I feel" statements and active listening</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    setSelectedScenario(null)
                    setMessages([])
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Try Another Scenario
                </Button>
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600"
                >
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (selectedScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedScenario(null)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit Simulation
          </Button>

          <div className="space-y-4">
            {/* Metrics Bar */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-2 border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <Flame className="w-4 h-4 mr-2" />
                    Heat Level: {getHeatLabel(heatLevel)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${heatLevel}%` }}
                      transition={{ duration: 0.5 }}
                      className={`absolute h-full bg-gradient-to-r ${getHeatColor(heatLevel)}`}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Empathy Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{empathyScore}</div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Area */}
            <Card className="border-2 border-purple-200 min-h-[400px]">
              <CardHeader>
                <CardTitle className="text-lg">{selectedScenario.title}</CardTitle>
                <CardDescription>{selectedScenario.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'partner' 
                            ? 'bg-gray-100 text-gray-800' 
                            : message.sender === 'system'
                            ? 'bg-blue-50 text-blue-800 text-sm italic border border-blue-200'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        }`}>
                          {message.text}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* AI Prompt */}
                <AnimatePresence>
                  {showPrompt && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start space-x-2"
                    >
                      <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-800">
                        {aiPrompts[Math.floor(Math.random() * aiPrompts.length)]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Response Options */}
                {!simulationComplete && messages.length > 0 && messages[messages.length - 1].sender !== 'user' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-700">Choose your response:</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowPrompt(!showPrompt)}
                      >
                        <Lightbulb className="w-4 h-4 mr-1" />
                        Hint
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {responseOptions.slice(0, 3).map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => handleQuickResponse(option)}
                          variant="outline"
                          className="text-left h-auto py-3 px-4 justify-start hover:bg-purple-50"
                        >
                          <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="text-sm">{option.text}</span>
                        </Button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Or type your own response..."
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCustomResponse()}
                        className="flex-1"
                      />
                      <Button onClick={handleCustomResponse}>Send</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Fight Simulator
            </h1>
            <p className="text-gray-600 text-lg">
              Practice conflict resolution in a safe, guided environment
            </p>
          </div>

          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="text-orange-900 space-y-2 text-sm">
              <p>• Choose a realistic conflict scenario</p>
              <p>• Respond to your partner's concerns using healthy communication techniques</p>
              <p>• Watch the heat meter and earn empathy points</p>
              <p>• Get real-time feedback on your responses</p>
              <p>• Learn mirroring, validation, and Non-Violent Communication (NVC)</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-red-300 h-full"
                  onClick={() => startScenario(scenario)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{scenario.title}</CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700 italic">"{scenario.partnerMessage}"</p>
                    </div>
                    <Button className="w-full">
                      Start Simulation
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

