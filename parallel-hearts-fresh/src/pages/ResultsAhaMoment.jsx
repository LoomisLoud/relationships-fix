import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Sparkles, Users, User, TrendingUp, TrendingDown, Minus, BookOpen, Film, FileText, X, Heart, Brain, Target, Lightbulb } from 'lucide-react'
import { generateScenarioVideo, pollVideoStatus, getScenarioIdFromTitle, getStoredAnalysis } from '../services/api'

export default function ResultsAhaMoment() {
  const navigate = useNavigate()
  const [selectedFuture, setSelectedFuture] = useState(null)
  const [viewMode, setViewMode] = useState(null) // 'story', 'video', 'book'
  const [generatingVideo, setGeneratingVideo] = useState(null)
  const [generatedVideos, setGeneratedVideos] = useState({})
  const [generatingBook, setGeneratingBook] = useState(null)
  const [generatedBooks, setGeneratedBooks] = useState({})
  const [analysisData, setAnalysisData] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Load Claude analysis results
  useEffect(() => {
    const stored = getStoredAnalysis()
    if (stored) {
      setAnalysisData(stored)
    } else {
      console.warn('No analysis data found, using enhanced mock data')
    }
  }, [])

  // Enhanced mock data with 14 archetypes framework
  const dataQuality = 'medium'
  const possibleFuturesCount = analysisData?.scenarios?.length || 5

  const coupleProfile = analysisData?.couple_profile ? {
    archetype: analysisData.couple_profile.archetype,
    icon: analysisData.couple_profile.archetype_emoji || '🌟',
    color: '#ff00ff',
    compatibility: analysisData.couple_profile.compatibility_score,
    stage: analysisData.couple_profile.relationship_stage,
    strengths: analysisData.couple_profile.strengths,
    challenges: analysisData.couple_profile.challenges,
    conflictPoints: analysisData.couple_profile.conflict_points || [],
    resolutionPath: analysisData.couple_profile.resolution_path || [],
    description: analysisData.couple_profile.description
  } : {
    archetype: '🌹 The Garden & Flame',
    icon: '🌹',
    color: '#ff00ff',
    compatibility: 78,
    stage: 'Growth & Integration Phase',
    strengths: ['Balances passion with peace', 'Mutual learning between opposites', 'Deep emotional honesty'],
    challenges: ['Misaligned pace (one intense, one calm)', 'Cycles of push-pull dynamic', 'Different needs for closeness'],
    conflictPoints: ['Passionate partner feels rejected; peaceful one feels overwhelmed', 'Closeness becomes suffocating at times'],
    resolutionPath: ['Synchronize rhythms intentionally', 'Alternate between excitement and rest', 'See difference as rhythm, not rejection'],
    description: 'A dynamic partnership where passion meets peace - you balance excitement with security and learn from your beautiful differences'
  }

  const partner1Profile = analysisData?.partner_1 ? {
    name: analysisData.partner_1.name,
    icon: analysisData.partner_1.emoji || '💫',
    color: '#00ffff',
    needs: analysisData.partner_1.needs || [],
    values: analysisData.partner_1.values || [],
    attachmentStyle: analysisData.partner_1.attachment_style,
    loveLanguage: analysisData.partner_1.love_language,
    personality: analysisData.partner_1.personality || {},
    emotions: analysisData.partner_1.emotions || {},
    communicationStyle: analysisData.partner_1.communication_style,
    goals: analysisData.partner_1.goals || [],
    subconsciousPatterns: analysisData.partner_1.subconscious_patterns || [],
    rootCauses: analysisData.partner_1.root_causes || [],
    strengths: analysisData.partner_1.strengths,
    growthAreas: analysisData.partner_1.growth_areas
  } : {
    name: 'Partner A',
    icon: '🔥',
    color: '#ff6600',
    needs: ['Emotional validation', 'Physical affection', 'Spontaneity'],
    values: ['Authenticity', 'Passion', 'Growth'],
    attachmentStyle: 'Anxious-Preoccupied',
    loveLanguage: 'Physical Touch',
    personality: {
      jungian_archetype: 'The Lover',
      enneagram_type: 'Type 4 (Individualist)',
      ocean_traits: {
        openness: 'High',
        conscientiousness: 'Medium',
        extraversion: 'High',
        agreeableness: 'High',
        neuroticism: 'Medium-High'
      }
    },
    emotions: {
      primary_emotions: ['Passion', 'Longing', 'Joy'],
      hidden_emotions: ['Fear of abandonment', 'Insecurity'],
      triggers: ['Perceived distance', 'Lack of responsiveness', 'Feeling unimportant']
    },
    communicationStyle: 'Expressive, emotional, seeks reassurance',
    goals: ['Deep emotional connection', 'Shared adventures', 'Feeling truly seen'],
    subconsciousPatterns: ['Seeks intensity to feel alive', 'Tests love through emotional expression'],
    rootCauses: ['Early experiences of inconsistent affection', 'Learned to express needs loudly to be heard'],
    strengths: ['Emotional depth', 'Passionate engagement', 'Brings excitement'],
    growthAreas: ['Self-soothing', 'Trusting without testing', 'Emotional regulation']
  }

  const partner2Profile = analysisData?.partner_2 ? {
    name: analysisData.partner_2.name,
    icon: analysisData.partner_2.emoji || '✨',
    color: '#00ff80',
    needs: analysisData.partner_2.needs || [],
    values: analysisData.partner_2.values || [],
    attachmentStyle: analysisData.partner_2.attachment_style,
    loveLanguage: analysisData.partner_2.love_language,
    personality: analysisData.partner_2.personality || {},
    emotions: analysisData.partner_2.emotions || {},
    communicationStyle: analysisData.partner_2.communication_style,
    goals: analysisData.partner_2.goals || [],
    subconsciousPatterns: analysisData.partner_2.subconscious_patterns || [],
    rootCauses: analysisData.partner_2.root_causes || [],
    strengths: analysisData.partner_2.strengths,
    growthAreas: analysisData.partner_2.growth_areas
  } : {
    name: 'Partner B',
    icon: '🌿',
    color: '#00ff80',
    needs: ['Personal space', 'Calm environment', 'Predictability'],
    values: ['Peace', 'Stability', 'Harmony'],
    attachmentStyle: 'Avoidant-Secure',
    loveLanguage: 'Quality Time',
    personality: {
      jungian_archetype: 'The Caregiver',
      enneagram_type: 'Type 9 (Peacemaker)',
      ocean_traits: {
        openness: 'Medium',
        conscientiousness: 'High',
        extraversion: 'Low-Medium',
        agreeableness: 'Very High',
        neuroticism: 'Low'
      }
    },
    emotions: {
      primary_emotions: ['Calm', 'Contentment', 'Care'],
      hidden_emotions: ['Overwhelm', 'Need for space'],
      triggers: ['Intense emotions', 'Feeling pressured', 'Conflict escalation']
    },
    communicationStyle: 'Calm, measured, seeks harmony',
    goals: ['Peaceful connection', 'Stable routine', 'Mutual respect'],
    subconsciousPatterns: ['Withdraws when overwhelmed', 'Prioritizes peace over expression'],
    rootCauses: ['Learned to be the calm one in chaotic environment', 'Developed self-sufficiency early'],
    strengths: ['Emotional stability', 'Patience', 'Creates safe space'],
    growthAreas: ['Expressing needs earlier', 'Staying present in intensity', 'Welcoming closeness']
  }

  const possibleFutures = analysisData?.scenarios?.map(s => ({
    id: s.id || s.scenario_id,
    title: s.title,
    probability: s.probability,
    trend: s.trend,
    color: s.trend === 'positive' ? '#00ff80' : s.trend === 'negative' ? '#ff0055' : '#00ffff',
    icon: s.trend === 'positive' ? '↑' : s.trend === 'negative' ? '↓' : '—',
    reasoning: s.reasoning,
    keyFactors: s.key_factors || [],
    recommendations: s.recommendations || [],
    timeline: s.timeline || 'Not specified'
  })) || [
    {
      id: 'deepening_connection',
      title: 'Deepening Connection',
      probability: 35,
      trend: 'positive',
      color: '#ff00ff',
      icon: '↑',
      reasoning: 'Your willingness to understand each other\'s rhythms and the complementary nature of your energies create strong potential for deeper intimacy',
      keyFactors: ['Mutual commitment to growth', 'Complementary attachment styles can balance', 'Shared values despite different expressions'],
      recommendations: ['Schedule weekly "rhythm check-ins" to sync your paces', 'Create rituals that honor both passion and peace', 'Practice expressing needs before they become overwhelming'],
      timeline: '3-6 months with consistent effort'
    },
    {
      id: 'comfortable_plateau',
      title: 'Comfortable Plateau',
      probability: 25,
      trend: 'neutral',
      color: '#00ffff',
      icon: '—',
      reasoning: 'Without intentional growth work, you may settle into a comfortable but emotionally distant pattern',
      keyFactors: ['Avoidance of difficult conversations', 'Routine becomes default', 'Individual growth without shared evolution'],
      recommendations: ['Introduce novelty regularly', 'Address small tensions before they accumulate', 'Maintain curiosity about each other'],
      timeline: '6-12 months if patterns continue'
    },
    {
      id: 'growth_through_challenge',
      title: 'Growth Through Challenge',
      probability: 20,
      trend: 'positive',
      color: '#9d00ff',
      icon: '↑',
      reasoning: 'Your differences, while challenging, can catalyze profound personal and relational transformation',
      keyFactors: ['Willingness to face discomfort', 'Seeking external support (therapy)', 'Commitment to understanding, not changing each other'],
      recommendations: ['Consider couples therapy focused on attachment', 'Read "Attached" by Amir Levine together', 'Practice non-violent communication'],
      timeline: '6-18 months with therapeutic support'
    },
    {
      id: 'gradual_drift',
      title: 'Gradual Drift',
      probability: 15,
      trend: 'negative',
      color: '#ff0055',
      icon: '↓',
      reasoning: 'If the push-pull dynamic intensifies without resolution, emotional distance may increase',
      keyFactors: ['Unaddressed attachment wounds', 'Repeated triggering without repair', 'Exhaustion from emotional labor'],
      recommendations: ['Immediate intervention needed', 'Individual therapy for attachment healing', 'Honest conversation about sustainability'],
      timeline: '3-9 months without intervention'
    },
    {
      id: 'transformation_renewal',
      title: 'Transformation & Renewal',
      probability: 5,
      trend: 'positive',
      color: '#ff6600',
      icon: '↑',
      reasoning: 'A breakthrough moment could catalyze rapid transformation and renewed commitment',
      keyFactors: ['Significant life event or crisis', 'Both partners doing deep inner work', 'Willingness to completely reimagine the relationship'],
      recommendations: ['Couples retreat or intensive', 'Shadow work individually and together', 'Create new relationship agreements from scratch'],
      timeline: '1-3 months during transformative period'
    }
  ]

  // Sort by probability
  const sortedFutures = [...possibleFutures].sort((a, b) => b.probability - a.probability)

  const handleViewFuture = (future, mode) => {
    setSelectedFuture(future)
    setViewMode(mode)
    setShowModal(true)

    if (mode === 'video' && !generatedVideos[future.id]) {
      handleGenerateVideo(future)
    }

    if (mode === 'book' && !generatedBooks[future.id]) {
      handleGenerateBook(future)
    }
  }

  const handleGenerateVideo = async (future) => {
    setGeneratingVideo(future.id)
    
    // Simulate video generation (replace with actual VEO API call)
    setTimeout(() => {
      setGeneratedVideos(prev => ({
        ...prev,
        [future.id]: 'https://example.com/video/' + future.id
      }))
      setGeneratingVideo(null)
    }, 3000)
  }

  const handleGenerateBook = async (future) => {
    setGeneratingBook(future.id)
    
    // Simulate book generation with Gemini (replace with actual API call)
    setTimeout(() => {
      setGeneratedBooks(prev => ({
        ...prev,
        [future.id]: generateBookContent(future)
      }))
      setGeneratingBook(null)
    }, 2000)
  }

  const generateBookContent = (future) => {
    return {
      title: `Your Journey: ${future.title}`,
      chapters: [
        {
          title: 'Chapter 1: Where You Are Now',
          content: `Your relationship stands at a crossroads. ${coupleProfile.description}. With a compatibility score of ${coupleProfile.compatibility}%, you have a strong foundation, but growth requires intention.`
        },
        {
          title: 'Chapter 2: Understanding Your Dance',
          content: `${partner1Profile.name}, you bring ${partner1Profile.emotions.primary_emotions.join(', ')} to the relationship. Your ${partner1Profile.attachmentStyle} attachment style means you ${partner1Profile.subconsciousPatterns[0]}.\n\n${partner2Profile.name}, you offer ${partner2Profile.emotions.primary_emotions.join(', ')}. Your ${partner2Profile.attachmentStyle} attachment creates a complementary dynamic.`
        },
        {
          title: 'Chapter 3: The Path Forward',
          content: `${future.reasoning}\n\nKey factors that will shape this reality:\n${future.keyFactors.map((f, i) => `${i + 1}. ${f}`).join('\n')}`
        },
        {
          title: 'Chapter 4: Your Action Plan',
          content: `To manifest this reality, focus on:\n\n${future.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n\n')}\n\nTimeline: ${future.timeline}`
        },
        {
          title: 'Chapter 5: The Future You',
          content: `In this reality, you will have learned to ${future.trend === 'positive' ? 'embrace your differences as strengths' : 'recognize when patterns no longer serve you'}. Your relationship will ${future.trend === 'positive' ? 'deepen into mature, conscious love' : 'teach you valuable lessons about yourself'}.`
        }
      ]
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedFuture(null)
    setViewMode(null)
  }

  const getTrendIcon = (trend) => {
    if (trend === 'positive') return <TrendingUp className="w-5 h-5" />
    if (trend === 'negative') return <TrendingDown className="w-5 h-5" />
    return <Minus className="w-5 h-5" />
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
      {/* Cosmic background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black"></div>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Aha Moment Header */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-magenta-500 to-cyan-500 mb-6 relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="text-6xl"
            >
              💡
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 30px 10px rgba(255, 0, 255, 0.5)',
                  '0 0 60px 20px rgba(0, 255, 255, 0.5)',
                  '0 0 30px 10px rgba(255, 0, 255, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-magenta-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            YOUR AHA MOMENT
          </h1>
          <p className="text-xl text-cyan-300">Deep Psychological Insights Revealed</p>
        </motion.div>

        {/* Couple Profile - Large Featured Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-purple-900/30 border-2 border-magenta-500 p-8 backdrop-blur-sm relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-magenta-500/10 to-cyan-500/10"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="text-6xl"
                >
                  {coupleProfile.icon}
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-magenta-300 mb-2">{coupleProfile.archetype}</h2>
                  <p className="text-lg text-gray-300">{coupleProfile.description}</p>
                </div>
              </div>

              {/* Compatibility Score */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-cyan-300">COMPATIBILITY SCORE</span>
                  <span className="text-3xl font-bold text-magenta-400">{coupleProfile.compatibility}%</span>
                </div>
                <div className="h-4 bg-black/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${coupleProfile.compatibility}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-magenta-500 to-cyan-500 rounded-full"
                  />
                </div>
              </div>

              {/* Relationship Stage */}
              <div className="mb-6 p-4 bg-black/30 rounded-lg border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-magenta-400" />
                  <span className="text-sm font-semibold text-cyan-300">RELATIONSHIP STAGE</span>
                </div>
                <p className="text-lg text-white">{coupleProfile.stage}</p>
              </div>

              {/* Strengths & Challenges */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {coupleProfile.strengths.map((strength, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{strength}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Growth Areas
                  </h3>
                  <ul className="space-y-2">
                    {coupleProfile.challenges.map((challenge, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <span className="text-orange-400 mt-1">→</span>
                        <span>{challenge}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Conflict Points & Resolution Path */}
              {coupleProfile.conflictPoints.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                    <h3 className="text-sm font-semibold text-red-400 mb-2">CONFLICT POINTS</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {coupleProfile.conflictPoints.map((point, i) => (
                        <li key={i}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <h3 className="text-sm font-semibold text-green-400 mb-2">RESOLUTION PATH</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {coupleProfile.resolutionPath.map((step, i) => (
                        <li key={i}>{i + 1}. {step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Individual Partner Profiles - Side by Side */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Partner 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500 p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl"
                >
                  {partner1Profile.icon}
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-orange-300">{partner1Profile.name}</h3>
                  <p className="text-sm text-gray-400">{partner1Profile.attachmentStyle}</p>
                </div>
              </div>

              {/* Personality Framework */}
              {partner1Profile.personality.jungian_archetype && (
                <div className="mb-4 p-3 bg-black/30 rounded-lg border border-orange-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-semibold text-orange-300">PSYCHOLOGICAL PROFILE</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-400">Jungian:</span> <span className="text-white">{partner1Profile.personality.jungian_archetype}</span></p>
                    <p><span className="text-gray-400">Enneagram:</span> <span className="text-white">{partner1Profile.personality.enneagram_type}</span></p>
                    <p><span className="text-gray-400">Love Language:</span> <span className="text-white">{partner1Profile.loveLanguage}</span></p>
                  </div>
                </div>
              )}

              {/* OCEAN Traits */}
              {partner1Profile.personality.ocean_traits && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-orange-300 mb-2">PERSONALITY TRAITS (OCEAN)</h4>
                  <div className="space-y-1 text-xs">
                    {Object.entries(partner1Profile.personality.ocean_traits).map(([trait, level]) => (
                      <div key={trait} className="flex justify-between">
                        <span className="text-gray-400 capitalize">{trait}:</span>
                        <span className="text-white">{level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Needs & Values */}
              {partner1Profile.needs.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-orange-300 mb-2">CORE NEEDS</h4>
                  <div className="flex flex-wrap gap-2">
                    {partner1Profile.needs.map((need, i) => (
                      <span key={i} className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full border border-orange-500/30">
                        {need}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Emotions */}
              {partner1Profile.emotions.primary_emotions && (
                <div className="mb-4 p-3 bg-black/30 rounded-lg">
                  <h4 className="text-xs font-semibold text-orange-300 mb-2">EMOTIONAL LANDSCAPE</h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-gray-400">Primary:</span>
                      <p className="text-white">{partner1Profile.emotions.primary_emotions.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Hidden:</span>
                      <p className="text-white">{partner1Profile.emotions.hidden_emotions.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Triggers:</span>
                      <p className="text-white">{partner1Profile.emotions.triggers.join(', ')}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Subconscious Patterns */}
              {partner1Profile.subconsciousPatterns.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-orange-300 mb-2 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" />
                    SUBCONSCIOUS PATTERNS
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {partner1Profile.subconsciousPatterns.map((pattern, i) => (
                      <li key={i}>• {pattern}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Strengths & Growth */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h4 className="text-xs font-semibold text-green-400 mb-2">Strengths</h4>
                  {partner1Profile.strengths.map((s, i) => (
                    <span key={i} className="block text-xs text-gray-300 mb-1">✓ {s}</span>
                  ))}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-yellow-400 mb-2">Growth</h4>
                  {partner1Profile.growthAreas.map((g, i) => (
                    <span key={i} className="block text-xs text-gray-300 mb-1">→ {g}</span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Partner 2 - Similar structure */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500 p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="text-5xl"
                >
                  {partner2Profile.icon}
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-green-300">{partner2Profile.name}</h3>
                  <p className="text-sm text-gray-400">{partner2Profile.attachmentStyle}</p>
                </div>
              </div>

              {/* Same structure as Partner 1 with green theme */}
              {partner2Profile.personality.jungian_archetype && (
                <div className="mb-4 p-3 bg-black/30 rounded-lg border border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-semibold text-green-300">PSYCHOLOGICAL PROFILE</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-400">Jungian:</span> <span className="text-white">{partner2Profile.personality.jungian_archetype}</span></p>
                    <p><span className="text-gray-400">Enneagram:</span> <span className="text-white">{partner2Profile.personality.enneagram_type}</span></p>
                    <p><span className="text-gray-400">Love Language:</span> <span className="text-white">{partner2Profile.loveLanguage}</span></p>
                  </div>
                </div>
              )}

              {partner2Profile.personality.ocean_traits && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-green-300 mb-2">PERSONALITY TRAITS (OCEAN)</h4>
                  <div className="space-y-1 text-xs">
                    {Object.entries(partner2Profile.personality.ocean_traits).map(([trait, level]) => (
                      <div key={trait} className="flex justify-between">
                        <span className="text-gray-400 capitalize">{trait}:</span>
                        <span className="text-white">{level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {partner2Profile.needs.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-green-300 mb-2">CORE NEEDS</h4>
                  <div className="flex flex-wrap gap-2">
                    {partner2Profile.needs.map((need, i) => (
                      <span key={i} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">
                        {need}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {partner2Profile.emotions.primary_emotions && (
                <div className="mb-4 p-3 bg-black/30 rounded-lg">
                  <h4 className="text-xs font-semibold text-green-300 mb-2">EMOTIONAL LANDSCAPE</h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-gray-400">Primary:</span>
                      <p className="text-white">{partner2Profile.emotions.primary_emotions.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Hidden:</span>
                      <p className="text-white">{partner2Profile.emotions.hidden_emotions.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Triggers:</span>
                      <p className="text-white">{partner2Profile.emotions.triggers.join(', ')}</p>
                    </div>
                  </div>
                </div>
              )}

              {partner2Profile.subconsciousPatterns.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-green-300 mb-2 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" />
                    SUBCONSCIOUS PATTERNS
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {partner2Profile.subconsciousPatterns.map((pattern, i) => (
                      <li key={i}>• {pattern}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h4 className="text-xs font-semibold text-green-400 mb-2">Strengths</h4>
                  {partner2Profile.strengths.map((s, i) => (
                    <span key={i} className="block text-xs text-gray-300 mb-1">✓ {s}</span>
                  ))}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-yellow-400 mb-2">Growth</h4>
                  {partner2Profile.growthAreas.map((g, i) => (
                    <span key={i} className="block text-xs text-gray-300 mb-1">→ {g}</span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Possible Futures Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
            {possibleFuturesCount} Parallel Realities Discovered
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Based on your psychological profiles and current dynamics
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFutures.map((future, index) => (
              <motion.div
                key={future.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Card 
                  className="bg-gradient-to-br from-purple-900/40 to-black border-2 p-6 cursor-pointer hover:scale-105 transition-all duration-300 h-full flex flex-col"
                  style={{ borderColor: future.color }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{future.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-4xl font-bold" style={{ color: future.color }}>
                          {future.probability}%
                        </span>
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold"
                          style={{ 
                            backgroundColor: `${future.color}20`,
                            color: future.color,
                            border: `1px solid ${future.color}40`
                          }}
                        >
                          {getTrendIcon(future.trend)}
                          <span className="capitalize">{future.trend}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-4 flex-1">{future.reasoning}</p>

                  <div className="mb-4 p-3 bg-black/40 rounded-lg text-xs">
                    <p className="text-gray-400">Timeline: <span className="text-white">{future.timeline}</span></p>
                  </div>

                  {/* 3 Viewing Mode Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      onClick={() => handleViewFuture(future, 'story')}
                      className="flex flex-col items-center gap-1 py-3 bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/50 text-cyan-300"
                    >
                      <FileText className="w-5 h-5" />
                      <span className="text-xs">Story</span>
                    </Button>
                    <Button
                      onClick={() => handleViewFuture(future, 'video')}
                      className="flex flex-col items-center gap-1 py-3 bg-magenta-600/20 hover:bg-magenta-600/40 border border-magenta-500/50 text-magenta-300"
                      disabled={generatingVideo === future.id}
                    >
                      <Film className="w-5 h-5" />
                      <span className="text-xs">
                        {generatingVideo === future.id ? 'Generating...' : 'Video'}
                      </span>
                    </Button>
                    <Button
                      onClick={() => handleViewFuture(future, 'book')}
                      className="flex flex-col items-center gap-1 py-3 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/50 text-purple-300"
                      disabled={generatingBook === future.id}
                    >
                      <BookOpen className="w-5 h-5" />
                      <span className="text-xs">
                        {generatingBook === future.id ? 'Writing...' : 'Book'}
                      </span>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Modal for viewing futures */}
        {showModal && selectedFuture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-900 to-black border-2 border-magenta-500 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-magenta-300">{selectedFuture.title}</h2>
                <Button
                  onClick={closeModal}
                  className="bg-red-600/20 hover:bg-red-600/40 border border-red-500"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Mode Selector */}
              <div className="flex gap-4 mb-6">
                <Button
                  onClick={() => setViewMode('story')}
                  className={`flex-1 ${viewMode === 'story' ? 'bg-cyan-600 border-cyan-400' : 'bg-cyan-600/20 border-cyan-500/50'}`}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Story
                </Button>
                <Button
                  onClick={() => setViewMode('video')}
                  className={`flex-1 ${viewMode === 'video' ? 'bg-magenta-600 border-magenta-400' : 'bg-magenta-600/20 border-magenta-500/50'}`}
                >
                  <Film className="w-5 h-5 mr-2" />
                  Video
                </Button>
                <Button
                  onClick={() => setViewMode('book')}
                  className={`flex-1 ${viewMode === 'book' ? 'bg-purple-600 border-purple-400' : 'bg-purple-600/20 border-purple-500/50'}`}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Book
                </Button>
              </div>

              {/* Content based on mode */}
              <div className="prose prose-invert max-w-none">
                {viewMode === 'story' && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-cyan-300">Your Story</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedFuture.reasoning}</p>
                    
                    <div className="bg-black/40 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-magenta-300 mb-2">Key Factors</h4>
                      <ul className="space-y-2">
                        {selectedFuture.keyFactors.map((factor, i) => (
                          <li key={i} className="text-gray-300">• {factor}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-black/40 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-green-300 mb-2">Recommendations</h4>
                      <ol className="space-y-2">
                        {selectedFuture.recommendations.map((rec, i) => (
                          <li key={i} className="text-gray-300">{i + 1}. {rec}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="bg-gradient-to-r from-purple-900/40 to-magenta-900/40 p-4 rounded-lg border border-magenta-500/30">
                      <p className="text-sm text-gray-400">Timeline: <span className="text-white font-semibold">{selectedFuture.timeline}</span></p>
                    </div>
                  </div>
                )}

                {viewMode === 'video' && (
                  <div className="text-center">
                    {generatingVideo === selectedFuture.id ? (
                      <div className="py-12">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-16 h-16 border-4 border-magenta-500 border-t-transparent rounded-full mx-auto mb-4"
                        />
                        <p className="text-magenta-300 text-lg">Generating your cinematic reality...</p>
                        <p className="text-gray-400 text-sm mt-2">This may take 1-2 minutes</p>
                      </div>
                    ) : generatedVideos[selectedFuture.id] ? (
                      <div>
                        <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                          <p className="text-gray-400">Video player would display here</p>
                          <p className="text-xs text-gray-500 mt-2">{generatedVideos[selectedFuture.id]}</p>
                        </div>
                        <Button className="bg-magenta-600 hover:bg-magenta-700">
                          <Play className="w-5 h-5 mr-2" />
                          Play Reality
                        </Button>
                      </div>
                    ) : (
                      <div className="py-12">
                        <Film className="w-16 h-16 text-magenta-400 mx-auto mb-4" />
                        <p className="text-gray-300 mb-4">Video generation ready</p>
                        <Button
                          onClick={() => handleGenerateVideo(selectedFuture)}
                          className="bg-magenta-600 hover:bg-magenta-700"
                        >
                          Generate Video
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {viewMode === 'book' && (
                  <div>
                    {generatingBook === selectedFuture.id ? (
                      <div className="text-center py-12">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
                        />
                        <p className="text-purple-300 text-lg">Writing your personalized book...</p>
                      </div>
                    ) : generatedBooks[selectedFuture.id] ? (
                      <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-purple-300 text-center mb-6">
                          {generatedBooks[selectedFuture.id].title}
                        </h3>
                        {generatedBooks[selectedFuture.id].chapters.map((chapter, i) => (
                          <div key={i} className="bg-black/40 p-6 rounded-lg border border-purple-500/30">
                            <h4 className="text-xl font-bold text-purple-300 mb-3">{chapter.title}</h4>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{chapter.content}</p>
                          </div>
                        ))}
                        <div className="text-center pt-6">
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Download Full Book
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                        <p className="text-gray-300 mb-4">Generate a personalized book about this reality</p>
                        <Button
                          onClick={() => handleGenerateBook(selectedFuture)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Generate Book
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

