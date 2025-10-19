import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageSquare, Upload, ClipboardList, Sparkles, ChevronRight, Users, Briefcase, FileText, Home, PenTool } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Welcome() {
  const navigate = useNavigate()
  const location = useLocation()
  const relationshipType = location.state?.type || 'romantic'
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedSubType, setSelectedSubType] = useState(null)
  const [showSubTypeSelection, setShowSubTypeSelection] = useState(false)
  const [showConversationOptions, setShowConversationOptions] = useState(false)

  // Sub-type options for Family relationships
  const familySubTypes = [
    {
      id: 'sibling',
      title: 'You & Sibling',
      description: 'Explore parallel realities with your brother or sister',
      color: '#00ffff',
      icon: Users
    },
    {
      id: 'parent',
      title: 'You & Parent',
      description: 'Navigate futures with your mother or father',
      color: '#ff00ff',
      icon: Users
    },
    {
      id: 'child',
      title: 'You & Child',
      description: 'Discover possibilities with your son or daughter',
      color: '#00ff80',
      icon: Users
    }
  ]

  // Sub-type options for Business relationships
  const businessSubTypes = [
    {
      id: 'business_partner',
      title: 'You & Business Partner',
      description: 'Simulate futures with your co-founder or partner',
      color: '#00ffff',
      icon: Briefcase
    },
    {
      id: 'boss',
      title: 'You & Boss',
      description: 'Explore dynamics with your manager or supervisor',
      color: '#ff00ff',
      icon: Briefcase
    },
    {
      id: 'colleague',
      title: 'You & Colleague',
      description: 'Navigate workplace futures with your coworker',
      color: '#00ff80',
      icon: Briefcase
    },
    {
      id: 'reporter',
      title: 'You & Direct Report',
      description: 'Discover leadership scenarios with your team member',
      color: '#ff6600',
      icon: Briefcase
    }
  ]

  // Main 3 input options
  const mainOptions = [
    {
      id: 'conversations',
      title: 'Share the Conversations',
      description: 'Provide chat history for analysis',
      icon: MessageSquare,
      color: '#ff00ff',
      gradient: 'from-pink-500 via-magenta-500 to-purple-600'
    },
    {
      id: 'assessment',
      title: 'Answer Questions',
      description: 'Complete a comprehensive psychological questionnaire',
      icon: ClipboardList,
      color: '#00ff80',
      gradient: 'from-green-400 via-cyan-500 to-blue-500',
      route: '/assessments'
    }
  ]

  // Sub-options for "Share the Conversations"
  const conversationOptions = [
    {
      id: 'paste',
      title: 'Copy/Paste Text Conversation',
      description: 'Paste a recent conversation',
      icon: FileText,
      color: '#ff00ff',
      gradient: 'from-pink-500 via-magenta-500 to-purple-600',
      route: '/paste-conversation'
    },
    {
      id: 'upload',
      title: 'Upload .txt WhatsApp Conversation',
      description: 'Upload your exported WhatsApp chat',
      icon: Upload,
      color: '#00ffff',
      gradient: 'from-cyan-400 via-blue-500 to-purple-500',
      route: '/import'
    },
    {
      id: 'type',
      title: 'Type About Your Experience',
      description: 'Share your goals and experiences',
      icon: PenTool,
      color: '#00ff80',
      gradient: 'from-green-400 via-cyan-500 to-blue-500',
      route: '/paste-conversation'
    }
  ]

  const handleSubTypeSelect = (subTypeId) => {
    setSelectedSubType(subTypeId)
  }

  const handleSubTypeContinue = () => {
    if (selectedSubType) {
      setShowSubTypeSelection(true)
    }
  }

  const handleMainOptionSelect = (optionId) => {
    setSelectedOption(optionId)
    
    if (optionId === 'conversations') {
      setShowConversationOptions(true)
    } else {
      setShowConversationOptions(false)
    }
  }

  const handleConversationOptionSelect = (optionId) => {
    const option = conversationOptions.find(o => o.id === optionId)
    navigate(option.route, { 
      state: { 
        type: relationshipType,
        subType: selectedSubType 
      } 
    })
  }

  const handleContinue = () => {
    if (selectedOption && selectedOption !== 'conversations') {
      const option = mainOptions.find(o => o.id === selectedOption)
      navigate(option.route, { 
        state: { 
          type: relationshipType,
          subType: selectedSubType 
        } 
      })
    }
  }

  // Show sub-type selection for Family and Business (before showing input options)
  const shouldShowSubTypeFirst = (relationshipType === 'family' || relationshipType === 'business') && !showSubTypeSelection

  const subTypes = relationshipType === 'family' ? familySubTypes : businessSubTypes

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
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
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
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        
        {/* Icon Avatar Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="mb-12"
        >
          <div className="relative">
            {/* Outer glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,0,255,0.3) 0%, transparent 70%)',
                filter: 'blur(20px)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Icon Avatar Container */}
            <motion.div
              className="relative w-48 h-48 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #ff00ff, #00ffff, #9d00ff)',
                boxShadow: '0 0 60px rgba(255, 0, 255, 0.8), inset 0 0 40px rgba(0, 255, 255, 0.3)'
              }}
              animate={{
                rotate: [0, 360],
                boxShadow: [
                  '0 0 60px rgba(255, 0, 255, 0.8), inset 0 0 40px rgba(0, 255, 255, 0.3)',
                  '0 0 80px rgba(0, 255, 255, 0.8), inset 0 0 60px rgba(255, 0, 255, 0.3)',
                  '0 0 60px rgba(255, 0, 255, 0.8), inset 0 0 40px rgba(0, 255, 255, 0.3)'
                ]
              }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, boxShadow: { duration: 4, repeat: Infinity } }}
            >
              <Sparkles className="w-24 h-24 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mb-12 max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4"
            style={{
              background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(255, 0, 255, 0.8), 0 0 80px rgba(0, 255, 255, 0.6)',
              filter: 'drop-shadow(0 0 10px rgba(255, 0, 255, 0.9))'
            }}
          >
            {shouldShowSubTypeFirst 
              ? `Tell me about your ${relationshipType} relationship`
              : 'How would you like to share your story?'
            }
          </h1>
          <p className="text-lg text-gray-300">
            {shouldShowSubTypeFirst
              ? 'First, let me know who this relationship is with'
              : 'Choose the method that works best for you'
            }
          </p>
        </motion.div>

        {/* Sub-Type Selection (for Family/Business) */}
        {shouldShowSubTypeFirst && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="w-full max-w-4xl mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {subTypes.map((subType, index) => {
                const Icon = subType.icon
                const isSelected = selectedSubType === subType.id

                return (
                  <motion.div
                    key={subType.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSubTypeSelect(subType.id)}
                    className="cursor-pointer"
                  >
                    <Card
                      className={`relative overflow-hidden border-4 transition-all duration-300 ${
                        isSelected
                          ? 'neon-border scale-105'
                          : 'border-purple-500/30 hover:border-purple-500/60'
                      }`}
                      style={{
                        background: isSelected
                          ? 'rgba(30, 15, 60, 0.95)'
                          : 'rgba(20, 10, 40, 0.7)',
                        backdropFilter: 'blur(10px)',
                        borderColor: isSelected ? subType.color : undefined,
                        boxShadow: isSelected ? `0 0 30px ${subType.color}` : 'none'
                      }}
                    >
                      <div className="p-6 flex flex-col items-center text-center space-y-4">
                        <motion.div
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${subType.color}40, ${subType.color}20)`,
                            border: `3px solid ${subType.color}`,
                            boxShadow: isSelected ? `0 0 20px ${subType.color}` : 'none'
                          }}
                          animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Icon className="w-8 h-8" style={{ color: subType.color }} />
                        </motion.div>

                        <h3
                          className="text-xl font-bold"
                          style={{ color: isSelected ? subType.color : '#ffffff' }}
                        >
                          {subType.title}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {subType.description}
                        </p>

                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{
                              background: subType.color,
                              boxShadow: `0 0 15px ${subType.color}`
                            }}
                          >
                            <Sparkles className="w-4 h-4 text-black" />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            <Button
              onClick={handleSubTypeContinue}
              disabled={!selectedSubType}
              className={`w-full max-w-md mx-auto py-6 text-xl font-black rounded-xl flex items-center justify-center ${
                selectedSubType ? 'neon-border pulse-glow' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{
                background: selectedSubType
                  ? 'linear-gradient(135deg, #ff00ff, #00ffff)'
                  : 'rgba(100, 50, 150, 0.3)',
                border: selectedSubType ? '3px solid #ff00ff' : '3px solid rgba(157, 0, 255, 0.3)'
              }}
            >
              <span>CONTINUE</span>
              <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        )}

        {/* Main Options (shown for romantic or after sub-type selection) */}
        {(relationshipType === 'romantic' || showSubTypeSelection) && !showConversationOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full max-w-6xl mx-auto px-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8 max-w-5xl mx-auto" style={{ gridAutoRows: '1fr' }}>
              {mainOptions.map((option, index) => {
                const Icon = option.icon
                const isSelected = selectedOption === option.id

                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMainOptionSelect(option.id)}
                    className="cursor-pointer"
                  >
                    <Card
                      className={`relative overflow-hidden border-4 transition-all duration-500 h-full ${
                        isSelected
                          ? 'neon-border border-current scale-105'
                          : 'border-purple-500/30 hover:border-purple-500/60'
                      }`}
                      style={{
                        background: isSelected
                          ? 'rgba(30, 15, 60, 0.95)'
                          : 'rgba(20, 10, 40, 0.7)',
                        backdropFilter: 'blur(10px)',
                        borderColor: isSelected ? option.color : undefined,
                        boxShadow: isSelected ? `0 0 40px ${option.color}` : 'none',
                        minHeight: '350px'
                      }}
                    >
                      <div className={`absolute inset-0 opacity-20 ${isSelected ? 'holographic' : ''}`}></div>

                      <div className="relative z-10 p-8 flex flex-col items-center justify-center text-center space-y-6 h-full">
                        <motion.div
                          className={`w-24 h-24 rounded-full flex items-center justify-center ${
                            isSelected ? 'pulse-glow' : ''
                          }`}
                          style={{
                            background: `linear-gradient(135deg, ${option.color}40, ${option.color}20)`,
                            border: `3px solid ${option.color}`,
                            boxShadow: isSelected
                              ? `0 0 30px ${option.color}, inset 0 0 20px ${option.color}`
                              : `0 0 10px ${option.color}40`
                          }}
                          animate={
                            isSelected
                              ? {
                                  rotate: [0, 5, -5, 0],
                                  scale: [1, 1.1, 1]
                                }
                              : {}
                          }
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Icon
                            className="w-12 h-12"
                            style={{ color: option.color }}
                          />
                        </motion.div>

                        <h3
                          className={`text-2xl font-black ${isSelected ? 'glow-text' : ''}`}
                          style={{ color: isSelected ? option.color : '#ffffff' }}
                        >
                          {option.title}
                        </h3>

                        <p className="text-sm text-gray-300 font-light">
                          {option.description}
                        </p>

                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background: option.color,
                              boxShadow: `0 0 20px ${option.color}`
                            }}
                          >
                            <Sparkles className="w-5 h-5 text-black" />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {selectedOption && selectedOption !== 'conversations' && (
              <Button
                onClick={handleContinue}
                className="w-full max-w-md mx-auto py-6 text-xl font-black rounded-xl neon-border pulse-glow flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
                  border: '3px solid #ff00ff'
                }}
              >
                <span>CONTINUE</span>
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            )}
          </motion.div>
        )}

        {/* Conversation Sub-Options */}
        {showConversationOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-6xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {conversationOptions.map((option, index) => {
                const Icon = option.icon

                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleConversationOptionSelect(option.id)}
                    className="cursor-pointer"
                  >
                    <Card
                      className="relative overflow-hidden border-4 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 h-full"
                      style={{
                        background: 'rgba(20, 10, 40, 0.7)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <div className="relative z-10 p-8 flex flex-col items-center justify-center text-center space-y-6 h-full" style={{ minHeight: '280px' }}>
                        <motion.div
                          className="w-20 h-20 rounded-full flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${option.color}40, ${option.color}20)`,
                            border: `3px solid ${option.color}`,
                            boxShadow: `0 0 10px ${option.color}40`
                          }}
                          whileHover={{
                            boxShadow: `0 0 30px ${option.color}`,
                            scale: 1.1
                          }}
                        >
                          <Icon
                            className="w-10 h-10"
                            style={{ color: option.color }}
                          />
                        </motion.div>

                        <h3
                          className="text-xl font-bold"
                          style={{ color: '#ffffff' }}
                        >
                          {option.title}
                        </h3>

                        <p className="text-sm text-gray-300 font-light">
                          {option.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

