import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Sparkles, Users, User } from 'lucide-react';

const ModernArchetypeCards = ({ analysisData }) => {
  const [, setLocation] = useLocation();

  const coupleImage = '/images/archetypes/beautifulcouplegirlandguyinthemagicalworld.webp';
  const person1Image = '/images/archetypes/ChatGPTImage18жовт.2025р.,15_00_47.png';
  const person2Image = '/images/archetypes/ChatGPTImage18жовт.2025р.,14_51_47.png';

  const realitiesCount = analysisData?.scenarios?.length || 12;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-20 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Your Relationships Multiverse
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-cyan-300/80 text-xl mb-16"
        >
          Explore the infinite dimensions of your connection
        </motion.p>

        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Relationship Card - Big */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setLocation('/multiverse/couple')}
            className="lg:col-span-3 cursor-pointer group"
          >
            <div className="relative h-96 rounded-3xl overflow-hidden border-4 border-transparent hover:border-cyan-400 transition-all duration-500"
              style={{
                boxShadow: '0 0 60px rgba(0, 255, 255, 0.3), inset 0 0 60px rgba(0, 255, 255, 0.1)'
              }}
            >
              <img 
                src={coupleImage} 
                alt="Relationship Archetype"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-8 h-8 text-cyan-400" />
                  <span className="text-cyan-400 text-sm font-semibold tracking-wider">RELATIONSHIP ARCHETYPE</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  {analysisData?.couple_profile?.archetype || "The Cosmic Dancers"}
                </h2>
                <p className="text-gray-300 text-lg max-w-3xl">
                  {analysisData?.couple_profile?.description || "Two souls intertwined in an eternal dance across dimensions"}
                </p>
                <div className="mt-4 inline-block px-6 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-sm">
                  Click to explore relationship dynamics
                </div>
              </div>
            </div>
          </motion.div>

          {/* Person 1 Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setLocation('/multiverse/person1')}
            className="lg:col-span-1 cursor-pointer group"
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden border-4 border-transparent hover:border-purple-400 transition-all duration-500"
              style={{
                boxShadow: '0 0 40px rgba(168, 85, 247, 0.3), inset 0 0 40px rgba(168, 85, 247, 0.1)'
              }}
            >
              <img 
                src={person1Image} 
                alt="Person 1"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-6 h-6 text-purple-400" />
                  <span className="text-purple-400 text-xs font-semibold tracking-wider">PERSON A</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {analysisData?.partner_1?.name || "The Dreamer"}
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  {analysisData?.partner_1?.personality?.jungian_archetype || "The Visionary Explorer"}
                </p>
                <div className="space-y-1 text-xs">
                  <div className="text-purple-300">
                    💜 {analysisData?.partner_1?.love_language || "Quality Time"}
                  </div>
                  <div className="text-purple-300">
                    🔗 {analysisData?.partner_1?.attachment_style || "Secure"}
                  </div>
                </div>
                <div className="mt-3 inline-block px-4 py-1 bg-purple-500/20 border border-purple-400/50 rounded-full text-purple-300 text-xs">
                  View full profile
                </div>
              </div>
            </div>
          </motion.div>

          {/* Person 2 Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => setLocation('/multiverse/person2')}
            className="lg:col-span-1 cursor-pointer group"
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden border-4 border-transparent hover:border-pink-400 transition-all duration-500"
              style={{
                boxShadow: '0 0 40px rgba(236, 72, 153, 0.3), inset 0 0 40px rgba(236, 72, 153, 0.1)'
              }}
            >
              <img 
                src={person2Image} 
                alt="Person 2"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-6 h-6 text-pink-400" />
                  <span className="text-pink-400 text-xs font-semibold tracking-wider">PERSON B</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {analysisData?.partner_2?.name || "The Anchor"}
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  {analysisData?.partner_2?.personality?.jungian_archetype || "The Grounded Nurturer"}
                </p>
                <div className="space-y-1 text-xs">
                  <div className="text-pink-300">
                    💗 {analysisData?.partner_2?.love_language || "Acts of Service"}
                  </div>
                  <div className="text-pink-300">
                    🔗 {analysisData?.partner_2?.attachment_style || "Anxious"}
                  </div>
                </div>
                <div className="mt-3 inline-block px-4 py-1 bg-pink-500/20 border border-pink-400/50 rounded-full text-pink-300 text-xs">
                  View full profile
                </div>
              </div>
            </div>
          </motion.div>

          {/* Possible Realities Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={() => setLocation('/multiverse/realities')}
            className="lg:col-span-1 cursor-pointer group"
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden border-4 border-transparent hover:border-yellow-400 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
                boxShadow: '0 0 60px rgba(255, 215, 0, 0.5), inset 0 0 60px rgba(255, 255, 255, 0.2)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 8s ease infinite'
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  className="mb-6"
                >
                  <Sparkles className="w-24 h-24 text-white drop-shadow-2xl" />
                </motion.div>
                
                <h3 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  {realitiesCount}
                </h3>
                <p className="text-2xl font-semibold text-white mb-2 drop-shadow-md">
                  Possible Realities
                </p>
                <p className="text-white/90 text-sm mb-6 max-w-xs">
                  Explore infinite futures across the multiverse
                </p>
                
                <div className="px-8 py-3 bg-white/30 backdrop-blur-md border-2 border-white/50 rounded-full text-white font-bold text-lg shadow-2xl group-hover:bg-white/40 transition-all">
                  EXPLORE ALL REALITIES
                </div>
              </div>

              {/* Floating particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default ModernArchetypeCards;

