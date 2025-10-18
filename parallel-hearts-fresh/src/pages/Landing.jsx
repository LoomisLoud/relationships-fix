import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Landing() {
  const navigate = useNavigate()
  const [selectedCard, setSelectedCard] = useState(null)

  const relationshipTypes = [
    {
      id: 'romantic',
      title: 'ROMANTIC',
      image: '/images/romantic-tv.png',
      imageScale: 1,
      imagePosition: 'center center',
      color: 'from-pink-500 via-magenta-500 to-purple-600',
      glowColor: '#ff00ff',
      description: 'Explore parallel realities with your partner'
    },
    {
      id: 'family',
      title: 'FAMILY',
      image: '/images/family-tv.png',
      imageScale: 1.08,
      imagePosition: '52% 56%',
      color: 'from-cyan-400 via-blue-500 to-purple-500',
      glowColor: '#00ffff',
      description: 'Navigate infinite family dynamics'
    },
    {
      id: 'business',
      title: 'BUSINESS',
      image: '/images/business-tv.png',
      imageScale: 1,
      imagePosition: 'center center',
      color: 'from-green-400 via-cyan-500 to-blue-500',
      glowColor: '#00ff80',
      description: 'Simulate professional relationship futures'
    }
  ]

  const handleSimulate = () => {
    if (selectedCard) {
      navigate('/welcome', { state: { type: selectedCard } })
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated cosmic background */}
      <div className="absolute inset-0 cosmic-bg opacity-30"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-4 glow-text"
            style={{
              background: 'linear-gradient(135deg, #00ffff, #ff00ff, #9d00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(255, 0, 255, 0.5)'
            }}
            animate={{
              textShadow: [
                '0 0 40px rgba(255, 0, 255, 0.5)',
                '0 0 60px rgba(0, 255, 255, 0.5)',
                '0 0 40px rgba(157, 0, 255, 0.5)',
                '0 0 60px rgba(255, 0, 255, 0.5)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Love in Parallel Realities
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-cyan-300 font-light tracking-wide"
          >
            Explore infinite futures for your relationships.
          </motion.p>
        </motion.div>

        {/* Relationship Type Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-6xl"
        >
          {relationshipTypes.map((type, index) => {
            const isSelected = selectedCard === type.id

            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCard(type.id)}
                className="cursor-pointer"
              >
                <Card
                  className={`relative overflow-hidden border-4 transition-all duration-500 ${
                    isSelected
                      ? 'neon-border border-current scale-105'
                      : 'border-purple-500/30 hover:border-purple-500/60'
                  }`}
                  style={{
                    background: isSelected
                      ? 'rgba(30, 15, 60, 0.95)'
                      : 'rgba(20, 10, 40, 0.7)',
                    backdropFilter: 'blur(10px)',
                    borderColor: isSelected ? type.glowColor : undefined,
                    boxShadow: isSelected ? `0 0 40px ${type.glowColor}` : 'none'
                  }}
                >
                  {/* Holographic overlay */}
                  <div
                    className={`absolute inset-0 opacity-20 ${
                      isSelected ? 'holographic' : ''
                    }`}
                  ></div>

                  <div className="relative z-10 p-6 flex flex-col items-center text-center space-y-4">
                    {/* Retro TV Image */}
                    <motion.div
                      className="w-full aspect-square rounded-xl overflow-hidden"
                      style={{
                        border: `3px solid ${type.glowColor}`,
                        boxShadow: isSelected
                          ? `0 0 30px ${type.glowColor}, inset 0 0 20px ${type.glowColor}40`
                          : `0 0 10px ${type.glowColor}40`
                      }}
                      animate={
                        isSelected
                          ? {
                              scale: [1, 1.02, 1],
                              boxShadow: [
                                `0 0 30px ${type.glowColor}`,
                                `0 0 50px ${type.glowColor}`,
                                `0 0 30px ${type.glowColor}`
                              ]
                            }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <img
                        src={type.image}
                        alt={`${type.title} relationship`}
                        className="w-full h-full object-cover"
                        style={{
                          filter: isSelected ? 'brightness(1.1) saturate(1.2)' : 'brightness(0.9)',
                          transition: 'filter 0.3s ease',
                          transform: `scale(${type.imageScale})`,
                          transformOrigin: type.imagePosition,
                          objectPosition: type.imagePosition
                        }}
                      />
                    </motion.div>

                    {/* Title */}
                    <h3
                      className={`text-3xl font-black tracking-wider ${
                        isSelected ? 'glow-text' : ''
                      }`}
                      style={{ color: isSelected ? type.glowColor : '#ffffff' }}
                    >
                      {type.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-300 font-light">
                      {type.description}
                    </p>

                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: type.glowColor,
                          boxShadow: `0 0 20px ${type.glowColor}`
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
        </motion.div>

        {/* Simulate Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Button
            onClick={handleSimulate}
            disabled={!selectedCard}
            className={`w-full py-8 text-2xl font-black tracking-wider rounded-2xl relative overflow-hidden transition-all duration-500 ${
              selectedCard
                ? 'neon-border pulse-glow'
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              background: selectedCard
                ? 'linear-gradient(135deg, #ff00ff, #9d00ff, #00ffff)'
                : 'rgba(100, 50, 150, 0.3)',
              border: selectedCard ? '3px solid #ff00ff' : '3px solid rgba(157, 0, 255, 0.3)',
              color: '#ffffff',
              textShadow: selectedCard ? '0 0 20px rgba(255, 255, 255, 0.8)' : 'none'
            }}
          >
            {selectedCard ? (
              <motion.span
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center justify-center space-x-3"
              >
                <Sparkles className="w-6 h-6" />
                <span>SIMULATE REALITIES</span>
                <Sparkles className="w-6 h-6" />
              </motion.span>
            ) : (
              <span>SELECT A REALITY TYPE</span>
            )}
          </Button>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-8 text-center text-purple-300 text-sm font-light tracking-wide"
        >
          Step into the multiverse of possibilities
        </motion.p>
      </div>
    </div>
  )
}

