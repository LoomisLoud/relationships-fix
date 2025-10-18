import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Calendar, CheckCircle2, Circle, Star, Heart, MessageCircle, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const actionPlanTemplate = {
  week1: {
    theme: 'Foundation & Awareness',
    icon: Star,
    color: 'from-blue-400 to-cyan-500',
    days: [
      { day: 1, task: 'Morning gratitude: Share 3 things you appreciate about each other', type: 'daily', xp: 10 },
      { day: 2, task: 'Active listening practice: 15-minute conversation with full attention', type: 'daily', xp: 15 },
      { day: 3, task: 'Identify your top 3 relationship values together', type: 'reflection', xp: 20 },
      { day: 4, task: 'Plan a weekly date night ritual', type: 'planning', xp: 15 },
      { day: 5, task: 'Practice "I feel" statements instead of "You always"', type: 'daily', xp: 10 },
      { day: 6, task: 'Share a childhood memory that shaped who you are', type: 'reflection', xp: 20 },
      { day: 7, task: 'Weekly check-in: What went well? What needs attention?', type: 'weekly', xp: 25 }
    ]
  },
  week2: {
    theme: 'Communication & Connection',
    icon: MessageCircle,
    color: 'from-purple-400 to-pink-500',
    days: [
      { day: 8, task: 'Morning appreciation text or note', type: 'daily', xp: 10 },
      { day: 9, task: 'Ask a deep question: "What makes you feel most loved?"', type: 'reflection', xp: 20 },
      { day: 10, task: 'Practice mirroring: Repeat back what you heard before responding', type: 'daily', xp: 15 },
      { day: 11, task: 'Create a "relationship playlist" together', type: 'fun', xp: 15 },
      { day: 12, task: 'Share your dreams for the next 5 years', type: 'reflection', xp: 20 },
      { day: 13, task: 'Tech-free evening: No phones for 2 hours', type: 'daily', xp: 15 },
      { day: 14, task: 'Weekly check-in + celebrate progress', type: 'weekly', xp: 25 }
    ]
  },
  week3: {
    theme: 'Conflict & Growth',
    icon: Users,
    color: 'from-green-400 to-emerald-500',
    days: [
      { day: 15, task: 'Identify your conflict triggers and share them', type: 'reflection', xp: 20 },
      { day: 16, task: 'Practice "time-out" signal for heated moments', type: 'daily', xp: 15 },
      { day: 17, task: 'Revisit a past disagreement with new perspective', type: 'reflection', xp: 20 },
      { day: 18, task: 'Learn each other\'s "repair attempts"', type: 'daily', xp: 15 },
      { day: 19, task: 'Try a new activity together outside comfort zone', type: 'fun', xp: 20 },
      { day: 20, task: 'Discuss: How can we support each other\'s individual growth?', type: 'reflection', xp: 20 },
      { day: 21, task: 'Weekly check-in + adjust plan if needed', type: 'weekly', xp: 25 }
    ]
  },
  week4: {
    theme: 'Integration & Future',
    icon: Heart,
    color: 'from-pink-400 to-rose-500',
    days: [
      { day: 22, task: 'Create a vision board for your relationship', type: 'planning', xp: 20 },
      { day: 23, task: 'Write love letters to each other', type: 'reflection', xp: 25 },
      { day: 24, task: 'Plan your next adventure together', type: 'planning', xp: 15 },
      { day: 25, task: 'Practice vulnerability: Share a fear or insecurity', type: 'reflection', xp: 25 },
      { day: 26, task: 'Celebrate wins: What has improved in 30 days?', type: 'reflection', xp: 20 },
      { day: 27, task: 'Create relationship rituals to maintain momentum', type: 'planning', xp: 20 },
      { day: 28, task: 'Final reflection: Write your relationship story so far', type: 'weekly', xp: 30 },
      { day: 29, task: 'Bonus: Plan next 30-day journey', type: 'planning', xp: 20 },
      { day: 30, task: 'Celebration day: Honor your commitment and growth', type: 'celebration', xp: 50 }
    ]
  }
}

export default function ActionPlan({ relationshipData }) {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedScenario = location.state?.scenario

  const [completedTasks, setCompletedTasks] = useState([])
  const [currentWeek, setCurrentWeek] = useState(1)

  const handleToggleTask = (day) => {
    if (completedTasks.includes(day)) {
      setCompletedTasks(completedTasks.filter(d => d !== day))
    } else {
      setCompletedTasks([...completedTasks, day])
    }
  }

  const getTaskTypeColor = (type) => {
    switch (type) {
      case 'daily': return 'bg-blue-100 text-blue-700'
      case 'reflection': return 'bg-purple-100 text-purple-700'
      case 'planning': return 'bg-green-100 text-green-700'
      case 'weekly': return 'bg-orange-100 text-orange-700'
      case 'fun': return 'bg-pink-100 text-pink-700'
      case 'celebration': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const totalXP = Object.values(actionPlanTemplate).reduce((sum, week) => 
    sum + week.days.reduce((weekSum, day) => weekSum + day.xp, 0), 0
  )

  const earnedXP = Object.values(actionPlanTemplate).reduce((sum, week) => 
    sum + week.days.filter(day => completedTasks.includes(day.day)).reduce((weekSum, day) => weekSum + day.xp, 0), 0
  )

  const completionPercentage = (completedTasks.length / 30) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Your 30-Day Action Plan
            </h1>
            <p className="text-gray-600 text-lg">
              {selectedScenario ? `Path: ${selectedScenario.title}` : 'A structured journey to relationship growth'}
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Progress Overview
                </span>
                <span className="text-2xl font-bold text-purple-600">
                  {completedTasks.length}/30 Days
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600">XP Earned</div>
                  <div className="text-xl font-bold text-purple-600">{earnedXP} / {totalXP}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Completion</div>
                  <div className="text-xl font-bold text-purple-600">{completionPercentage.toFixed(0)}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Current Streak</div>
                  <div className="text-xl font-bold text-orange-600">🔥 {Math.min(completedTasks.length, 7)} days</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Week Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((week) => {
              const weekData = actionPlanTemplate[`week${week}`]
              const Icon = weekData.icon
              const weekTasks = weekData.days.length
              const weekCompleted = weekData.days.filter(day => completedTasks.includes(day.day)).length

              return (
                <Button
                  key={week}
                  onClick={() => setCurrentWeek(week)}
                  variant={currentWeek === week ? 'default' : 'outline'}
                  className={`flex-shrink-0 ${currentWeek === week ? `bg-gradient-to-r ${weekData.color} text-white` : ''}`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  Week {week}
                  <span className="ml-2 text-xs">({weekCompleted}/{weekTasks})</span>
                </Button>
              )
            })}
          </div>

          {/* Current Week Details */}
          {Object.entries(actionPlanTemplate).map(([weekKey, weekData], weekIndex) => {
            if (weekIndex + 1 !== currentWeek) return null

            const Icon = weekData.icon

            return (
              <motion.div
                key={weekKey}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${weekData.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Week {weekIndex + 1}: {weekData.theme}</CardTitle>
                        <CardDescription>
                          {weekData.days.filter(day => completedTasks.includes(day.day)).length} of {weekData.days.length} tasks completed
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {weekData.days.map((dayData, index) => {
                        const isCompleted = completedTasks.includes(dayData.day)

                        return (
                          <motion.div
                            key={dayData.day}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleToggleTask(dayData.day)}
                            className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                              isCompleted 
                                ? 'bg-green-50 border-green-300 hover:border-green-400' 
                                : 'bg-white border-gray-200 hover:border-purple-300'
                            }`}
                          >
                            <div className="flex-shrink-0 mt-1">
                              {isCompleted ? (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                              ) : (
                                <Circle className="w-6 h-6 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-gray-900">Day {dayData.day}</span>
                                <div className="flex items-center space-x-2">
                                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTaskTypeColor(dayData.type)}`}>
                                    {dayData.type}
                                  </span>
                                  <span className="text-sm font-semibold text-purple-600">+{dayData.xp} XP</span>
                                </div>
                              </div>
                              <p className={`text-sm ${isCompleted ? 'text-gray-600 line-through' : 'text-gray-700'}`}>
                                {dayData.task}
                              </p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}

          {/* Tips Card */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">💡 Tips for Success</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-900 space-y-2 text-sm">
              <p>• Complete tasks together when possible for shared experience</p>
              <p>• Don't worry about perfection - consistency matters more</p>
              <p>• Use reflection prompts as conversation starters</p>
              <p>• Celebrate small wins along the way</p>
              <p>• Adjust the plan to fit your unique relationship needs</p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/simulator')}
              variant="outline"
              className="flex-1 py-6 text-lg"
            >
              Practice Conflict Skills
            </Button>
            <Button
              onClick={() => navigate('/rewards')}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-6 text-lg"
            >
              View Rewards
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

