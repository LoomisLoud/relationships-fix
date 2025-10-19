import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export default function ArchetypeCardsView({ coupleProfile, partner1Profile, partner2Profile, possibleFuturesCount, onContinue }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-magenta-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          YOUR RELATIONSHIPS MULTIVERSE
        </motion.h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Relationship Archetype Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2"
          >
            <Card 
              className="relative overflow-hidden border-4 border-magenta-500 bg-gradient-to-br from-purple-900/50 to-black/80 backdrop-blur-md p-8"
              style={{
                boxShadow: '0 0 40px rgba(255, 0, 255, 0.4)'
              }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-magenta-500/10 to-cyan-500/10"
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                {/* Icon */}
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-8xl"
                >
                  {coupleProfile.icon}
                </motion.div>
                
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-4xl font-black text-magenta-300 mb-3">
                    {coupleProfile.archetype}
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {coupleProfile.description.split(' ').slice(0, 12).join(' ')}...
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Person 1 Archetype Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card 
              className="relative overflow-hidden border-4 border-cyan-500 bg-gradient-to-br from-cyan-900/30 to-black/80 backdrop-blur-md p-8 h-full"
              style={{
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"
                animate={{
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="text-7xl mb-4"
                >
                  {partner1Profile.icon}
                </motion.div>
                
                <h3 className="text-3xl font-black text-cyan-300 mb-3">
                  {partner1Profile.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  {partner1Profile.personality?.jungian_archetype || 'The Lover'}
                </p>
                <p className="text-base text-gray-300">
                  {partner1Profile.attachmentStyle} • {partner1Profile.loveLanguage}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Person 2 Archetype Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card 
              className="relative overflow-hidden border-4 border-purple-500 bg-gradient-to-br from-purple-900/30 to-black/80 backdrop-blur-md p-8 h-full"
              style={{
                boxShadow: '0 0 30px rgba(157, 0, 255, 0.3)'
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"
                animate={{
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                  className="text-7xl mb-4"
                >
                  {partner2Profile.icon}
                </motion.div>
                
                <h3 className="text-3xl font-black text-purple-300 mb-3">
                  {partner2Profile.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  {partner2Profile.personality?.jungian_archetype || 'The Sage'}
                </p>
                <p className="text-base text-gray-300">
                  {partner2Profile.attachmentStyle} • {partner2Profile.loveLanguage}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Possible Realities Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2"
          >
            <Card 
              className="relative overflow-hidden border-4 border-yellow-500 bg-gradient-to-br from-yellow-900/30 to-black/80 backdrop-blur-md p-8"
              style={{
                boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)'
              }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-7xl"
                  >
                    🔮
                  </motion.div>
                  
                  <div>
                    <h3 className="text-4xl font-black text-yellow-300 mb-2">
                      {possibleFuturesCount} Possible Realities
                    </h3>
                    <p className="text-lg text-gray-300">
                      Multiple futures detected and analyzed
                    </p>
                  </div>
                </div>
                
                <Button
                  onClick={onContinue}
                  className="px-8 py-6 text-xl font-black rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 border-4 border-yellow-400 flex items-center gap-3"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
                  }}
                >
                  <span>EXPLORE REALITIES</span>
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

