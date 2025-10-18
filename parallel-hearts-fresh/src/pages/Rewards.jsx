import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Trophy, Star, Award, Sparkles, Download, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

const badges = [
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first assessment',
    icon: '🎯',
    criteria: 'Complete 1 assessment',
    unlocked: true,
    rarity: 'common'
  },
  {
    id: 'data_detective',
    name: 'Data Detective',
    description: 'Upload and analyze your first conversation',
    icon: '🔍',
    criteria: 'Import WhatsApp chat',
    unlocked: true,
    rarity: 'common'
  },
  {
    id: 'self_aware',
    name: 'Self-Aware',
    description: 'Complete all psychology assessments',
    icon: '🧠',
    criteria: 'Complete all 4 assessments',
    unlocked: true,
    rarity: 'uncommon'
  },
  {
    id: 'future_thinker',
    name: 'Future Thinker',
    description: 'Explore all relationship scenarios',
    icon: '🔮',
    criteria: 'View all scenarios',
    unlocked: false,
    rarity: 'uncommon'
  },
  {
    id: 'action_hero',
    name: 'Action Hero',
    description: 'Start your 30-day action plan',
    icon: '🦸',
    criteria: 'Begin action plan',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Complete a full week of your action plan',
    icon: '⚔️',
    criteria: 'Complete 7 consecutive days',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'conflict_master',
    name: 'Conflict Master',
    description: 'Successfully de-escalate 3 fight simulations',
    icon: '🕊️',
    criteria: 'Get grade A in 3 simulations',
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'journey_complete',
    name: 'Journey Complete',
    description: 'Finish your entire 30-day action plan',
    icon: '🏆',
    criteria: 'Complete all 30 days',
    unlocked: false,
    rarity: 'legendary'
  },
  {
    id: 'relationship_scholar',
    name: 'Relationship Scholar',
    description: 'Unlock all other badges',
    icon: '📚',
    criteria: 'Collect all badges',
    unlocked: false,
    rarity: 'legendary'
  }
]

const achievements = [
  { title: 'Completed First Assessment', date: '2 days ago', xp: 50 },
  { title: 'Imported WhatsApp Chat', date: '2 days ago', xp: 75 },
  { title: 'Viewed Relationship Map', date: '1 day ago', xp: 100 },
  { title: 'Started Action Plan', date: 'Today', xp: 150 }
]

export default function Rewards({ userData, setUserData }) {
  const navigate = useNavigate()
  const [showCertificate, setShowCertificate] = useState(false)

  const currentLevel = userData?.level || 1
  const currentXP = userData?.xp || 350
  const xpForNextLevel = currentLevel * 1000
  const xpProgress = (currentXP % 1000) / 10

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500'
      case 'uncommon': return 'from-green-400 to-green-600'
      case 'rare': return 'from-blue-400 to-blue-600'
      case 'epic': return 'from-purple-400 to-purple-600'
      case 'legendary': return 'from-yellow-400 to-orange-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const getRarityBorder = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-300'
      case 'uncommon': return 'border-green-300'
      case 'rare': return 'border-blue-300'
      case 'epic': return 'border-purple-300'
      case 'legendary': return 'border-yellow-300'
      default: return 'border-gray-300'
    }
  }

  const unlockedBadges = badges.filter(b => b.unlocked)
  const lockedBadges = badges.filter(b => !b.unlocked)

  const handleDownloadCertificate = () => {
    alert('Certificate download would be triggered here (PDF generation)')
  }

  const handleShareProgress = () => {
    alert('Share functionality would open here')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Rewards & Progress
            </h1>
            <p className="text-gray-600 text-lg">
              Track your achievements and celebrate your growth
            </p>
          </div>

          {/* Level & XP Card */}
          <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                    {currentLevel}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Level {currentLevel}</CardTitle>
                    <CardDescription className="text-base">
                      {currentXP} / {xpForNextLevel} XP to next level
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-600">{currentXP}</div>
                  <div className="text-sm text-gray-600">Total XP</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={xpProgress} className="h-4" />
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-purple-600" />
                  Badges Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-purple-600">
                  {unlockedBadges.length}/{badges.length}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Star className="w-5 h-5 mr-2 text-blue-600" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">
                  🔥 7 days
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-green-600" />
                  Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600">
                  45%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Unlocked Badges */}
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Unlocked Badges ({unlockedBadges.length})
              </CardTitle>
              <CardDescription>Badges you've earned on your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {unlockedBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative group cursor-pointer`}
                  >
                    <div className={`border-4 ${getRarityBorder(badge.rarity)} rounded-xl p-4 bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                      <div className={`w-full aspect-square bg-gradient-to-br ${getRarityColor(badge.rarity)} rounded-lg flex items-center justify-center text-5xl mb-3`}>
                        {badge.icon}
                      </div>
                      <h3 className="font-semibold text-sm text-center mb-1">{badge.name}</h3>
                      <p className="text-xs text-gray-600 text-center line-clamp-2">{badge.description}</p>
                      <div className="mt-2 text-center">
                        <span className={`text-xs font-semibold uppercase ${
                          badge.rarity === 'legendary' ? 'text-orange-600' :
                          badge.rarity === 'epic' ? 'text-purple-600' :
                          badge.rarity === 'rare' ? 'text-blue-600' :
                          badge.rarity === 'uncommon' ? 'text-green-600' :
                          'text-gray-600'
                        }`}>
                          {badge.rarity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Locked Badges */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-700">
                <Trophy className="w-5 h-5 mr-2" />
                Locked Badges ({lockedBadges.length})
              </CardTitle>
              <CardDescription>Keep going to unlock these achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {lockedBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50 opacity-60">
                      <div className="w-full aspect-square bg-gray-300 rounded-lg flex items-center justify-center text-5xl mb-3 grayscale">
                        {badge.icon}
                      </div>
                      <h3 className="font-semibold text-sm text-center mb-1 text-gray-600">{badge.name}</h3>
                      <p className="text-xs text-gray-500 text-center line-clamp-2">{badge.criteria}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{achievement.title}</div>
                        <div className="text-sm text-gray-600">{achievement.date}</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-blue-600">+{achievement.xp} XP</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certificate Section */}
          <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <Award className="w-6 h-6 mr-2" />
                Relationship Growth Certificate
              </CardTitle>
              <CardDescription className="text-purple-700">
                Complete your 30-day journey to earn your certificate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white rounded-lg p-6 border-2 border-purple-200">
                <div className="text-center space-y-2">
                  <div className="text-6xl">🎓</div>
                  <h3 className="text-xl font-bold text-gray-800">Certificate of Completion</h3>
                  <p className="text-gray-600">Available after completing all 30 days</p>
                  <div className="pt-4">
                    <Progress value={45} className="h-3" />
                    <p className="text-sm text-gray-600 mt-2">13 of 30 days completed</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleDownloadCertificate}
                  variant="outline"
                  className="flex-1"
                  disabled
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
                <Button
                  onClick={handleShareProgress}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

