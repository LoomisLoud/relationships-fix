import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Heart, AlertTriangle, MessageSquare, Lightbulb, TrendingUp, Users, Brain } from 'lucide-react'

export default function EnhancedAnalysisView({ analysisData }) {
  if (!analysisData) return null

  const { conversation_analysis, relationship_dynamics, improvement_suggestions } = analysisData

  return (
    <div className="space-y-8 mt-12">
      {/* Emotions Analysis */}
      {analysisData.partner_1?.emotions && analysisData.partner_2?.emotions && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-purple-900/30 border-2 border-cyan-500 p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-cyan-300 mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8" />
              Emotional Landscape
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Person 1 Emotions */}
              <div>
                <h3 className="text-2xl font-bold text-magenta-300 mb-4 flex items-center gap-2">
                  {analysisData.partner_1.emoji} {analysisData.partner_1.name}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-cyan-300 font-semibold mb-2">PRIMARY EMOTIONS</p>
                    <div className="space-y-2">
                      {analysisData.partner_1.emotions.primary_emotions.map((emotion, i) => {
                        const intensity = analysisData.partner_1.emotions.emotion_intensities?.[emotion] || 5
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-white min-w-[120px]">{emotion}</span>
                            <div className="flex-1 h-3 bg-black/50 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${intensity * 10}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className="h-full bg-gradient-to-r from-magenta-500 to-pink-500 rounded-full"
                              />
                            </div>
                            <span className="text-magenta-400 font-bold min-w-[30px]">{intensity}/10</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  {analysisData.partner_1.emotions.hidden_emotions?.length > 0 && (
                    <div className="mt-4 p-4 bg-black/30 rounded-lg border border-magenta-500/30">
                      <p className="text-sm text-magenta-300 font-semibold mb-2">HIDDEN EMOTIONS</p>
                      <ul className="space-y-1">
                        {analysisData.partner_1.emotions.hidden_emotions.map((emotion, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-magenta-400">•</span>
                            {emotion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Person 2 Emotions */}
              <div>
                <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                  {analysisData.partner_2.emoji} {analysisData.partner_2.name}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-cyan-300 font-semibold mb-2">PRIMARY EMOTIONS</p>
                    <div className="space-y-2">
                      {analysisData.partner_2.emotions.primary_emotions.map((emotion, i) => {
                        const intensity = analysisData.partner_2.emotions.emotion_intensities?.[emotion] || 5
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-white min-w-[120px]">{emotion}</span>
                            <div className="flex-1 h-3 bg-black/50 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${intensity * 10}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                              />
                            </div>
                            <span className="text-cyan-400 font-bold min-w-[30px]">{intensity}/10</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  {analysisData.partner_2.emotions.hidden_emotions?.length > 0 && (
                    <div className="mt-4 p-4 bg-black/30 rounded-lg border border-cyan-500/30">
                      <p className="text-sm text-cyan-300 font-semibold mb-2">HIDDEN EMOTIONS</p>
                      <ul className="space-y-1">
                        {analysisData.partner_2.emotions.hidden_emotions.map((emotion, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-cyan-400">•</span>
                            {emotion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Topics Discussed */}
      {conversation_analysis?.topics_discussed?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-purple-900/30 border-2 border-purple-500 p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-purple-300 mb-6 flex items-center gap-3">
              <MessageSquare className="w-8 h-8" />
              Topics Discussed
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conversation_analysis.topics_discussed.map((topic, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 bg-black/30 rounded-lg border border-purple-500/30"
                >
                  <h4 className="text-lg font-bold text-white mb-2">{topic.topic}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Frequency:</span>
                      <span className="text-purple-300 font-semibold">{topic.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Emotional Charge:</span>
                      <span className="text-purple-300 font-semibold">{topic.emotional_charge}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`font-semibold ${
                        topic.resolution_status === 'resolved' ? 'text-green-400' :
                        topic.resolution_status === 'unresolved' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {topic.resolution_status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Conflicts */}
      {conversation_analysis?.conflicts?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-purple-900/30 border-2 border-red-500 p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-red-300 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              Conflicts Identified
            </h2>
            
            <div className="space-y-6">
              {conversation_analysis.conflicts.map((conflict, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="p-6 bg-black/30 rounded-lg border border-red-500/30"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-white flex-1">{conflict.conflict}</h4>
                    <span className="text-red-400 font-bold text-lg">Severity: {conflict.severity}/10</span>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-orange-400 font-semibold">Trigger:</span>
                      <p className="text-gray-300 mt-1">{conflict.trigger}</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-magenta-900/20 rounded border border-magenta-500/30">
                        <span className="text-magenta-300 font-semibold">{analysisData.partner_1.name}'s View:</span>
                        <p className="text-gray-300 mt-1">{conflict.person_1_perspective}</p>
                      </div>
                      <div className="p-3 bg-cyan-900/20 rounded border border-cyan-500/30">
                        <span className="text-cyan-300 font-semibold">{analysisData.partner_2.name}'s View:</span>
                        <p className="text-gray-300 mt-1">{conflict.person_2_perspective}</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-yellow-900/20 rounded border border-yellow-500/30">
                      <span className="text-yellow-300 font-semibold">Underlying Issue:</span>
                      <p className="text-gray-300 mt-1">{conflict.underlying_issue}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Root Causes */}
      {relationship_dynamics && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-purple-900/30 border-2 border-yellow-500 p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-yellow-300 mb-6 flex items-center gap-3">
              <Brain className="w-8 h-8" />
              Root Causes Analysis
            </h2>
            
            {relationship_dynamics.core_root_cause && (
              <div className="mb-6 p-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border-2 border-yellow-500">
                <h3 className="text-xl font-bold text-yellow-300 mb-3">🎯 Core Root Cause</h3>
                <p className="text-white text-lg leading-relaxed">{relationship_dynamics.core_root_cause}</p>
              </div>
            )}
            
            {relationship_dynamics.possible_root_causes?.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-yellow-300 mb-4">Contributing Factors</h3>
                <div className="space-y-3">
                  {relationship_dynamics.possible_root_causes.map((cause, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-black/30 rounded-lg border border-yellow-500/30"
                    >
                      <span className="text-yellow-400 font-bold text-lg">{i + 1}.</span>
                      <p className="text-gray-300 flex-1">{cause}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      )}

      {/* Key Differences */}
      {relationship_dynamics?.key_differences?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-purple-900/30 border-2 border-blue-500 p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center gap-3">
              <Users className="w-8 h-8" />
              Key Differences
            </h2>
            
            <div className="space-y-6">
              {relationship_dynamics.key_differences.map((diff, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-black/30 rounded-lg border border-blue-500/30"
                >
                  <h4 className="text-xl font-bold text-blue-300 mb-4">{diff.dimension}</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-magenta-900/20 rounded border border-magenta-500/30">
                      <p className="text-magenta-300 font-semibold mb-2">{analysisData.partner_1.name}</p>
                      <p className="text-gray-300">{diff.person_1}</p>
                    </div>
                    <div className="p-4 bg-cyan-900/20 rounded border border-cyan-500/30">
                      <p className="text-cyan-300 font-semibold mb-2">{analysisData.partner_2.name}</p>
                      <p className="text-gray-300">{diff.person_2}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-900/20 rounded border border-blue-500/30">
                    <p className="text-blue-300 font-semibold mb-2">Impact on Relationship</p>
                    <p className="text-gray-300">{diff.impact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Improvement Suggestions */}
      {improvement_suggestions && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-purple-900/30 border-2 border-green-500 p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8" />
              Path to Understanding
            </h2>
            
            {improvement_suggestions.understanding_bridges?.length > 0 && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg border-2 border-green-500">
                <h3 className="text-2xl font-bold text-green-300 mb-4">🌉 Understanding Bridges</h3>
                <div className="space-y-3">
                  {improvement_suggestions.understanding_bridges.map((bridge, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <TrendingUp className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-white text-lg">{bridge}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {improvement_suggestions.for_person_1?.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-magenta-300 mb-4">
                    For {analysisData.partner_1.name}
                  </h3>
                  <div className="space-y-4">
                    {improvement_suggestions.for_person_1.map((suggestion, i) => (
                      <div key={i} className="p-4 bg-magenta-900/20 rounded-lg border border-magenta-500/30">
                        <p className="text-magenta-300 font-semibold mb-2">{suggestion.area}</p>
                        <p className="text-gray-300 text-sm mb-2">{suggestion.suggestion}</p>
                        <p className="text-gray-400 text-xs italic">{suggestion.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {improvement_suggestions.for_person_2?.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-cyan-300 mb-4">
                    For {analysisData.partner_2.name}
                  </h3>
                  <div className="space-y-4">
                    {improvement_suggestions.for_person_2.map((suggestion, i) => (
                      <div key={i} className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
                        <p className="text-cyan-300 font-semibold mb-2">{suggestion.area}</p>
                        <p className="text-gray-300 text-sm mb-2">{suggestion.suggestion}</p>
                        <p className="text-gray-400 text-xs italic">{suggestion.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {improvement_suggestions.for_both?.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-green-300 mb-4">For Both of You</h3>
                <div className="space-y-4">
                  {improvement_suggestions.for_both.map((suggestion, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 bg-green-900/20 rounded-lg border border-green-500/30"
                    >
                      <h4 className="text-lg font-bold text-green-300 mb-2">{suggestion.area}</h4>
                      <p className="text-white mb-3">{suggestion.suggestion}</p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-green-400 font-semibold">Why:</span>
                          <p className="text-gray-300 mt-1">{suggestion.why}</p>
                        </div>
                        <div>
                          <span className="text-green-400 font-semibold">How:</span>
                          <p className="text-gray-300 mt-1">{suggestion.how}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  )
}

