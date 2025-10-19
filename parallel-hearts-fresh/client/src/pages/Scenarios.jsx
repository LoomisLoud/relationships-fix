import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, TrendingUp, TrendingDown, Minus, Lightbulb, Play, Film, Popcorn , Home } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const scenarios = [
  {
    id: 's1',
    label: 'S1: Current Path',
    title: 'Continue As Is',
    icon: Minus,
    color: 'from-gray-400 to-gray-500',
    likelihood: 60,
    description: 'Maintain your current relationship patterns and behaviors without significant changes.',
    assumptions: [
      'No major life changes',
      'Current communication patterns continue',
      'Work-life balance remains similar'
    ],
    impacts: {
      intimacy: 0,
      conflict: 0,
      satisfaction: -5,
      growth: -10
    },
    leadingIndicators: [
      'Frequency of quality time together',
      'Number of meaningful conversations per week',
      'Conflict resolution time'
    ],
    narrative: 'If you continue on your current path, your relationship will remain stable but may experience gradual stagnation. Without intentional growth efforts, you might find yourselves in a comfortable but uninspiring routine within 6-12 months.'
  },
  {
    id: 's2',
    label: 'S2: Warning Path',
    title: 'Drift Apart',
    icon: TrendingDown,
    color: 'from-red-400 to-orange-500',
    likelihood: 25,
    description: 'Without intervention, unresolved issues compound and emotional distance grows.',
    assumptions: [
      'Conflict avoidance continues',
      'Work stress increases',
      'Communication deteriorates',
      'No proactive relationship work'
    ],
    impacts: {
      intimacy: -40,
      conflict: +35,
      satisfaction: -50,
      growth: -30
    },
    leadingIndicators: [
      'Decreased physical affection',
      'More time spent apart',
      'Increased criticism or defensiveness',
      'Reduced emotional sharing'
    ],
    narrative: 'This scenario represents a concerning trajectory where small issues snowball into larger problems. Without addressing conflict avoidance and communication gaps, you may find yourselves feeling like roommates rather than partners within a year. Early warning signs would appear within 2-3 months.'
  },
  {
    id: 's3',
    label: 'S3: Growth Path',
    title: 'Thrive Together',
    icon: TrendingUp,
    color: 'from-green-400 to-emerald-500',
    likelihood: 70,
    description: 'Commit to intentional growth, better communication, and shared goals.',
    assumptions: [
      'Weekly relationship check-ins',
      'Active conflict resolution practice',
      'Shared growth activities',
      'Regular date nights'
    ],
    impacts: {
      intimacy: +45,
      conflict: -30,
      satisfaction: +55,
      growth: +60
    },
    leadingIndicators: [
      'Increased emotional vulnerability',
      'More frequent expressions of appreciation',
      'Faster conflict resolution',
      'New shared experiences'
    ],
    narrative: 'This optimistic scenario shows what\'s possible with commitment and effort. By implementing weekly check-ins, practicing active listening, and prioritizing quality time, you can deepen your bond significantly. Within 3-6 months, you\'ll notice improved communication and greater emotional intimacy.'
  },
  {
    id: 's4',
    label: 'S4: Adventure Path',
    title: 'New Horizons',
    icon: Lightbulb,
    color: 'from-purple-400 to-pink-500',
    likelihood: 45,
    description: 'Embrace change together through new experiences and shared adventures.',
    assumptions: [
      'Monthly adventure or new activity',
      'Support each other\'s individual growth',
      'Embrace vulnerability and change',
      'Regular gratitude practices'
    ],
    impacts: {
      intimacy: +35,
      conflict: -20,
      satisfaction: +50,
      growth: +70
    },
    leadingIndicators: [
      'Number of new experiences together',
      'Individual goal achievement with partner support',
      'Laughter and playfulness frequency',
      'Mutual encouragement instances'
    ],
    narrative: 'This exciting path combines relationship work with adventure and novelty. By trying new things together and supporting each other\'s personal growth, you create a dynamic partnership that evolves and deepens. This approach builds resilience and keeps the relationship fresh and engaging.'
  }
]

export default function Scenarios({ relationshipData }) {
  const navigate = useNavigate()
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [viewingMovie, setViewingMovie] = useState(false)
  const [movieRecs, setMovieRecs] = useState(null)

  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario)
    // Fetch movie recommendations (mock VOS3 API call)
    fetchMovieRecommendations(scenario)
  }

  const fetchMovieRecommendations = (scenario) => {
    // Mock VOS3 API response based on scenario
    const mockRecs = {
      s1: [
        { title: 'Before Midnight', reason: 'Explores long-term relationship maintenance' },
        { title: 'Marriage Story', reason: 'Honest portrayal of relationship challenges' },
        { title: 'The Big Sick', reason: 'Navigating cultural and family dynamics' },
        { title: 'Eternal Sunshine', reason: 'Understanding relationship patterns' },
        { title: 'Blue Valentine', reason: 'Realistic relationship evolution' }
      ],
      s2: [
        { title: 'Revolutionary Road', reason: 'Warning signs of relationship decline' },
        { title: 'Gone Girl', reason: 'Communication breakdown consequences' },
        { title: 'Who\'s Afraid of Virginia Woolf?', reason: 'Destructive conflict patterns' },
        { title: 'Scenes from a Marriage', reason: 'Relationship deterioration stages' },
        { title: 'Kramer vs. Kramer', reason: 'Impact of unresolved issues' }
      ],
      s3: [
        { title: 'About Time', reason: 'Cherishing everyday moments together' },
        { title: 'The Notebook', reason: 'Commitment through challenges' },
        { title: 'Crazy, Stupid, Love', reason: 'Rekindling connection and growth' },
        { title: 'When Harry Met Sally', reason: 'Building deep friendship and love' },
        { title: 'The Big Sick', reason: 'Growing stronger through adversity' }
      ],
      s4: [
        { title: 'Up', reason: 'Adventure and shared dreams' },
        { title: 'The Secret Life of Walter Mitty', reason: 'Embracing new experiences' },
        { title: 'Amélie', reason: 'Finding magic in the everyday' },
        { title: 'Lost in Translation', reason: 'Connection through vulnerability' },
        { title: 'Midnight in Paris', reason: 'Romance and discovery' }
      ]
    }
    
    setTimeout(() => {
      setMovieRecs(mockRecs[scenario.id] || mockRecs.s3)
    }, 500)
  }

  const handleWatchMovie = () => {
    setViewingMovie(true)
    // Simulate movie playback
    setTimeout(() => {
      setViewingMovie(false)
    }, 3000)
  }

  const handleCreatePlan = () => {
    navigate('/plan', { state: { scenario: selectedScenario } })
  }

  const getImpactColor = (value) => {
    if (value > 0) return 'text-green-600'
    if (value < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getImpactSign = (value) => {
    if (value > 0) return '+'
    return ''
  }

  if (viewingMovie && selectedScenario) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
              
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-6 p-8"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
            <Film className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            {selectedScenario.title}
          </h2>
          <p className="text-gray-300 max-w-2xl">
            Imagine yourself 6 months from now... {selectedScenario.narrative}
          </p>
          <div className="flex items-center justify-center space-x-2 text-white">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (selectedScenario) {
    const Icon = selectedScenario.icon

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedScenario(null)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scenarios
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${selectedScenario.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 font-medium">{selectedScenario.label}</div>
                    <CardTitle className="text-2xl">{selectedScenario.title}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Likelihood: {selectedScenario.likelihood}%
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Overview</h3>
                  <p className="text-gray-700">{selectedScenario.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Key Assumptions</h3>
                  <ul className="space-y-2">
                    {selectedScenario.assumptions.map((assumption, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span className="text-gray-700">{assumption}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Projected Impact (6 months)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedScenario.impacts).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 capitalize">{key}</div>
                        <div className={`text-2xl font-bold ${getImpactColor(value)}`}>
                          {getImpactSign(value)}{value}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Leading Indicators</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-blue-900 font-medium">Track these signals:</p>
                    <ul className="space-y-1">
                      {selectedScenario.leadingIndicators.map((indicator, index) => (
                        <li key={index} className="text-sm text-blue-800 flex items-start space-x-2">
                          <span>→</span>
                          <span>{indicator}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">The Story</h3>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
                    <p className="text-gray-800 leading-relaxed italic">
                      "{selectedScenario.narrative}"
                    </p>
                  </div>
                </div>

                {movieRecs && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <Popcorn className="w-5 h-5 mr-2 text-pink-600" />
                      Recommended Movies for This Path
                    </h3>
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 border-2 border-pink-200 space-y-2">
                      {movieRecs.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm">
                          <span className="text-pink-600 font-bold">{index + 1}.</span>
                          <div>
                            <span className="font-semibold text-gray-800">{rec.title}</span>
                            <span className="text-gray-600"> - {rec.reason}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handleWatchMovie}
                    variant="outline"
                    className="flex-1 py-6 text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch as Movie
                  </Button>
                  <Button
                    onClick={handleCreatePlan}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-6 text-lg"
                  >
                    Create Action Plan
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Explore Your Future
            </h1>
            <p className="text-gray-600 text-lg">
              Discover possible scenarios and choose your path forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon

              return (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-purple-300 h-full"
                    onClick={() => handleSelectScenario(scenario)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-14 h-14 bg-gradient-to-br ${scenario.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-600">Likelihood</div>
                          <div className="text-lg font-bold text-purple-600">{scenario.likelihood}%</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 font-medium">{scenario.label}</div>
                      <CardTitle className="text-xl">{scenario.title}</CardTitle>
                      <CardDescription className="text-base line-clamp-2">
                        {scenario.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(scenario.impacts).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center bg-gray-50 rounded px-2 py-1">
                              <span className="text-gray-600 capitalize text-xs">{key}:</span>
                              <span className={`font-semibold ${getImpactColor(value)}`}>
                                {getImpactSign(value)}{value}%
                              </span>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full" variant="outline">
                          Explore Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Lightbulb className="w-5 h-5 mr-2" />
                How to Use Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-900 space-y-2">
              <p>
                Each scenario represents a possible future for your relationship based on different choices and behaviors.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Review each scenario to understand potential outcomes</li>
                <li>Watch scenarios as immersive "movies" to visualize your future</li>
                <li>Choose the scenario that aligns with your goals</li>
                <li>Create an action plan to make it happen</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

