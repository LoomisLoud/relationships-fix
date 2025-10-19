import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, X, TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStoredAnalysis } from '../services/api';

export default function RealitiesGallery() {
  const [, setLocation] = useLocation();
  const [selectedReality, setSelectedReality] = useState(null);
  const analysisData = getStoredAnalysis();
  const scenarios = analysisData?.scenarios || [];

  const getTrendIcon = (trend) => {
    if (trend === 'positive') return <TrendingUp className="w-5 h-5" />;
    if (trend === 'negative') return <TrendingDown className="w-5 h-5" />;
    return <Minus className="w-5 h-5" />;
  };

  const getTrendColor = (trend) => {
    if (trend === 'positive') return 'from-green-500 to-emerald-500';
    if (trend === 'negative') return 'from-red-500 to-orange-500';
    return 'from-yellow-500 to-amber-500';
  };

  const getGradientForIndex = (index) => {
    const gradients = [
      'from-cyan-500 via-blue-500 to-purple-500',
      'from-pink-500 via-rose-500 to-red-500',
      'from-green-500 via-emerald-500 to-teal-500',
      'from-yellow-500 via-orange-500 to-red-500',
      'from-purple-500 via-pink-500 to-rose-500',
      'from-blue-500 via-indigo-500 to-purple-500',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Button
            onClick={() => setLocation('/results')}
            className="mb-6 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/50 text-indigo-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Multiverse
          </Button>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
          >
            Explore All Realities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            {scenarios.length} possible futures detected across the multiverse
          </motion.p>
        </div>

        {/* Netflix-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedReality(scenario)}
              className="cursor-pointer group"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden border-2 border-transparent hover:border-white/30 transition-all duration-300"
                style={{
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradientForIndex(index)} opacity-80`} />
                
                {/* Animated particles */}
                <div className="absolute inset-0">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-between">
                  {/* Probability Badge */}
                  <div className="flex justify-between items-start">
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                      <span className="text-white font-bold text-lg">{scenario.probability}%</span>
                    </div>
                    <div className={`p-2 rounded-full bg-gradient-to-br ${getTrendColor(scenario.trend)}`}>
                      {getTrendIcon(scenario.trend)}
                    </div>
                  </div>

                  {/* Title & Timeline */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">
                      {scenario.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-3">
                      Timeline: {scenario.timeline}
                    </p>
                    <p className="text-white/70 text-sm line-clamp-2">
                      {scenario.reasoning}
                    </p>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    Explore This Reality
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedReality && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedReality(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-white/20"
                style={{
                  boxShadow: '0 0 100px rgba(99, 102, 241, 0.5)'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedReality(null)}
                  className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                        <span className="text-white font-bold text-2xl">{selectedReality.probability}%</span>
                      </div>
                      <div className={`px-6 py-3 rounded-full bg-gradient-to-br ${getTrendColor(selectedReality.trend)} flex items-center gap-2`}>
                        {getTrendIcon(selectedReality.trend)}
                        <span className="text-white font-semibold capitalize">{selectedReality.trend}</span>
                      </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                      {selectedReality.title}
                    </h2>
                    <p className="text-xl text-gray-300">
                      Timeline: {selectedReality.timeline}
                    </p>
                  </div>

                  {/* Reasoning */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Why This Reality</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {selectedReality.reasoning}
                    </p>
                  </div>

                  {/* Key Factors */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Key Factors</h3>
                    <div className="space-y-3">
                      {selectedReality.key_factors?.map((factor, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10"
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold mt-1">
                            {index + 1}
                          </div>
                          <p className="text-gray-300">{factor}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Recommendations</h3>
                    <div className="space-y-3">
                      {selectedReality.recommendations?.map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-green-500/10 rounded-xl border border-green-400/30"
                        >
                          <Sparkles className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                          <p className="text-green-300">{rec}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

