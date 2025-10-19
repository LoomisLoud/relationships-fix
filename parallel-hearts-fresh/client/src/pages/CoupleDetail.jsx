import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, Heart, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStoredAnalysis } from '../services/api';

export default function CoupleDetail() {
  const [, setLocation] = useLocation();
  const analysisData = getStoredAnalysis();
  const coupleProfile = analysisData?.couple_profile || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          onClick={() => setLocation('/results')}
          className="mb-8 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Multiverse
        </Button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative h-96 rounded-3xl overflow-hidden mb-8"
            style={{
              boxShadow: '0 0 80px rgba(0, 255, 255, 0.4)'
            }}
          >
            <img 
              src="/images/archetypes/beautifulcouplegirlandguyinthemagicalworld.webp" 
              alt="Couple"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {coupleProfile.archetype || "The Cosmic Dancers"}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl">
                {coupleProfile.description || "Two souls intertwined in an eternal dance across dimensions"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Compatibility Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Compatibility Score</h2>
              <p className="text-gray-300">Overall relationship harmony</p>
            </div>
            <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {coupleProfile.compatibility_score || 85}%
            </div>
          </div>
        </motion.div>

        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-green-400" />
            <h2 className="text-3xl font-bold text-white">Relationship Strengths</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(coupleProfile.strengths || ['Deep emotional connection', 'Shared values', 'Mutual respect']).map((strength, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="p-6 rounded-xl bg-green-500/10 border border-green-400/30"
              >
                <p className="text-green-300 text-lg">{strength}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-8 h-8 text-orange-400" />
            <h2 className="text-3xl font-bold text-white">Growth Areas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(coupleProfile.challenges || ['Communication styles', 'Different pacing']).map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-6 rounded-xl bg-orange-500/10 border border-orange-400/30"
              >
                <p className="text-orange-300 text-lg">{challenge}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resolution Path */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">Path Forward</h2>
          </div>
          <div className="space-y-4">
            {(coupleProfile.resolution_path || ['Practice active listening', 'Schedule regular check-ins', 'Celebrate small wins']).map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-6 rounded-xl bg-yellow-500/10 border border-yellow-400/30 flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-300 font-bold">
                  {index + 1}
                </div>
                <p className="text-yellow-300 text-lg">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

