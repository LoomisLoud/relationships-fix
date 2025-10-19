import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, Heart, Brain, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStoredAnalysis } from '../services/api';

export default function Person2Detail() {
  const [, setLocation] = useLocation();
  const analysisData = getStoredAnalysis();
  const partner = analysisData?.partner_2 || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-pink-950 to-slate-950 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          onClick={() => setLocation('/results')}
          className="mb-8 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/50 text-pink-300"
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
          <div className="relative h-[500px] rounded-3xl overflow-hidden mb-8"
            style={{
              boxShadow: '0 0 80px rgba(236, 72, 153, 0.4)'
            }}
          >
            <img 
              src="/images/archetypes/ChatGPTImage18жовт.2025р.,14_51_47.png" 
              alt="Person B"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-pink-400 text-sm font-semibold tracking-wider mb-2 block">PERSON B</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {partner.name || "The Anchor"}
              </h1>
              <p className="text-2xl text-pink-300 mb-2">
                {partner.personality?.jungian_archetype || "The Grounded Nurturer"}
              </p>
              <p className="text-lg text-gray-300">
                {partner.emoji} {partner.personality?.enneagram_type || "Type 2 - The Helper"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Core Traits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-400/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-rose-400" />
              <h3 className="text-xl font-bold text-white">Love Language</h3>
            </div>
            <p className="text-2xl text-rose-300 font-semibold">
              {partner.love_language || "Acts of Service"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-400/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Attachment Style</h3>
            </div>
            <p className="text-2xl text-purple-300 font-semibold">
              {partner.attachment_style || "Anxious"}
            </p>
          </motion.div>
        </div>

        {/* Emotions */}
        {partner.emotions && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Emotional Landscape</h2>
            <div className="p-8 rounded-2xl bg-pink-500/10 border border-pink-400/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-pink-300 mb-3">Primary Emotions</h4>
                  <div className="space-y-2">
                    {(partner.emotions.primary_emotions || []).map((emotion, index) => {
                      const intensity = partner.emotions.emotion_intensities?.[emotion] || 5;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <span className="text-white flex-1">{emotion}</span>
                          <div className="flex-1 h-2 bg-pink-900/50 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-pink-400 to-rose-400"
                              style={{ width: `${intensity * 10}%` }}
                            />
                          </div>
                          <span className="text-pink-300 text-sm w-8">{intensity}/10</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-pink-300 mb-3">Hidden Emotions</h4>
                  <ul className="space-y-2">
                    {(partner.emotions.hidden_emotions || []).map((emotion, index) => (
                      <li key={index} className="text-gray-300 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-pink-400 mt-1 flex-shrink-0" />
                        <span>{emotion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Strengths</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(partner.strengths || ['Supportive', 'Practical', 'Reliable']).map((strength, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-6 rounded-xl bg-green-500/10 border border-green-400/30 text-center"
              >
                <p className="text-green-300 text-lg font-semibold">{strength}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Growth Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Growth Opportunities</h2>
          <div className="space-y-4">
            {(partner.growth_areas || ['Expressing needs', 'Trusting process']).map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-6 rounded-xl bg-orange-500/10 border border-orange-400/30 flex items-center gap-4"
              >
                <TrendingUp className="w-6 h-6 text-orange-400 flex-shrink-0" />
                <p className="text-orange-300 text-lg">{area}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

