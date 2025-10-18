import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, Heart, TrendingUp, AlertTriangle, Star, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

export default function RelationshipMap({ relationshipData }) {
  const navigate = useNavigate()

  // Mock relationship map data
  const mapData = {
    archetype: 'The Passionate Explorers',
    stage: 'Growth & Deepening',
    riskIndex: 32,
    strengths: [
      'Strong emotional connection',
      'Shared values and goals',
      'Good communication foundation',
      'Mutual respect and trust'
    ],
    risks: [
      'Occasional conflict avoidance',
      'Different conflict resolution styles',
      'Work-life balance challenges'
    ],
    values: [
      'Personal Growth',
      'Adventure',
      'Family',
      'Career Success',
      'Health & Wellness'
    ]
  }

  const radarData = [
    { dimension: 'Communication', value: 78 },
    { dimension: 'Trust', value: 85 },
    { dimension: 'Intimacy', value: 72 },
    { dimension: 'Conflict Resolution', value: 65 },
    { dimension: 'Shared Values', value: 88 },
    { dimension: 'Support', value: 80 }
  ]

  const getRiskColor = (risk) => {
    if (risk < 30) return 'text-green-600'
    if (risk < 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRiskLabel = (risk) => {
    if (risk < 30) return 'Low Risk'
    if (risk < 60) return 'Moderate Risk'
    return 'High Risk'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Your Relationship Map
            </h1>
            <p className="text-gray-600 text-lg">
              A comprehensive view of your relationship dynamics
            </p>
          </div>

          {/* Archetype Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white fill-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{mapData.archetype}</CardTitle>
                      <CardDescription className="text-base">Your Relationship Archetype</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Current Stage</div>
                    <div className="text-lg font-semibold text-purple-700">{mapData.stage}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  You and your partner are adventurous souls who value growth, exploration, and deep emotional connection. 
                  You're in a phase of deepening your bond while maintaining individual identities.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Risk Index */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Relationship Health Index
                </CardTitle>
                <CardDescription>
                  Overall assessment of relationship stability and satisfaction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-4xl font-bold ${getRiskColor(mapData.riskIndex)}`}>
                      {100 - mapData.riskIndex}%
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {getRiskLabel(mapData.riskIndex)} - Healthy & Growing
                    </div>
                  </div>
                  <div className="w-32 h-32">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeDasharray={`${(100 - mapData.riskIndex) * 2.51} 251`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <Progress value={100 - mapData.riskIndex} className="h-3" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Relationship Dimensions
                </CardTitle>
                <CardDescription>
                  Your strengths across key relationship areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis 
                      dataKey="dimension" 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                    <Radar 
                      name="Score" 
                      dataKey="value" 
                      stroke="#8b5cf6" 
                      fill="#8b5cf6" 
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Strengths and Risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-2 border-green-200 bg-green-50 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <Star className="w-5 h-5 mr-2" />
                    Strengths
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    What makes your relationship thrive
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {mapData.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-2 border-yellow-200 bg-yellow-50 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-yellow-800">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Growth Areas
                  </CardTitle>
                  <CardDescription className="text-yellow-700">
                    Opportunities for improvement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {mapData.risks.map((risk, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-sm font-bold">!</span>
                        </div>
                        <span className="text-gray-700">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Shared Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Shared Values
                </CardTitle>
                <CardDescription>
                  The core values that unite you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {mapData.values.map((value, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="px-5 py-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-base font-semibold shadow-sm"
                    >
                      {value}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Ready to Explore Your Future?</CardTitle>
                <CardDescription className="text-blue-700">
                  Discover possible scenarios and create an action plan for growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate('/scenarios')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-6 text-lg"
                >
                  Explore Scenarios
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

