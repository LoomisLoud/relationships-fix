import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Heart, 
  Upload, 
  ClipboardList, 
  Map, 
  Lightbulb, 
  Calendar, 
  Swords, 
  Trophy,
  Sparkles,
  TrendingUp
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Dashboard({ userData, relationshipData }) {
  const navigate = useNavigate()

  const modules = [
    {
      icon: Upload,
      title: 'Import Conversations',
      description: 'Upload WhatsApp chats for AI analysis',
      path: '/import',
      color: 'from-blue-500 to-cyan-500',
      completed: relationshipData?.hasImport
    },
    {
      icon: ClipboardList,
      title: 'Psychology Assessments',
      description: 'Discover your attachment & communication styles',
      path: '/assessments',
      color: 'from-purple-500 to-pink-500',
      completed: relationshipData?.hasAssessments
    },
    {
      icon: Map,
      title: 'Relationship Map',
      description: 'Visualize your relationship dynamics',
      path: '/map',
      color: 'from-green-500 to-emerald-500',
      completed: relationshipData?.hasMap
    },
    {
      icon: Lightbulb,
      title: 'Scenario Explorer',
      description: 'Explore possible futures together',
      path: '/scenarios',
      color: 'from-yellow-500 to-orange-500',
      completed: relationshipData?.hasScenarios
    },
    {
      icon: Calendar,
      title: 'Action Plan',
      description: '30-day guided relationship journey',
      path: '/plan',
      color: 'from-indigo-500 to-purple-500',
      completed: relationshipData?.hasPlan
    },
    {
      icon: Swords,
      title: 'Fight Simulator',
      description: 'Practice conflict resolution skills',
      path: '/simulator',
      color: 'from-red-500 to-pink-500',
      completed: false
    },
    {
      icon: Trophy,
      title: 'Rewards & Progress',
      description: 'Track achievements and earn badges',
      path: '/rewards',
      color: 'from-amber-500 to-yellow-500',
      completed: false
    }
  ]

  const levelProgress = ((userData?.xp || 0) % 1000) / 10

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userData?.name}!</h1>
                <p className="text-sm text-gray-600">Continue your relationship growth journey</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Level {userData?.level || 1}</div>
                <div className="flex items-center space-x-2">
                  <Progress value={levelProgress} className="w-24 h-2" />
                  <span className="text-xs text-gray-500">{userData?.xp || 0} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">
                  {modules.filter(m => m.completed).length}/{modules.length}
                </div>
                <p className="text-sm text-gray-600 mt-1">Modules completed</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{userData?.xp || 0}</div>
                <p className="text-sm text-gray-600 mt-1">Total XP earned</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-amber-600" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">{userData?.badges?.length || 0}</div>
                <p className="text-sm text-gray-600 mt-1">Achievements unlocked</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Modules Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon
              return (
                <motion.div
                  key={module.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-purple-300"
                    onClick={() => navigate(module.path)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        {module.completed && (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-lg mt-4">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline">
                        {module.completed ? 'Review' : 'Start'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

