import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { MessageCircle, Swords, Heart, ArrowRight } from 'lucide-react';

export default function ExplorationPrompts() {
  const [, setLocation] = useLocation();
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const prompts = [
    {
      id: 'communication',
      title: 'Communication Issues',
      icon: MessageCircle,
      description: 'Explore how to better understand each other',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      glowColor: '#00ffff'
    },
    {
      id: 'fights',
      title: 'Fights & Conflicts',
      icon: Swords,
      description: 'Navigate through disagreements and tensions',
      gradient: 'from-red-500 via-orange-500 to-yellow-500',
      glowColor: '#ff6b00'
    },
    {
      id: 'marriage',
      title: 'Decision About Marriage',
      icon: Heart,
      description: 'Explore the future of your commitment',
      gradient: 'from-pink-500 via-rose-500 to-purple-500',
      glowColor: '#ff00ff'
    }
  ];

  const handleContinue = () => {
    if (selectedPrompt) {
      setLocation('/welcome');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #00ffff, #ff00ff, #9d00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Welcome to The Multiverse of Us
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-3xl text-cyan-300/90 font-light mb-4"
          >
            Every relationship is a universe of possibilities.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-purple-300/80 font-light"
          >
            What part of yours would you like to explore today?
          </motion.p>
        </motion.div>

        {/* Prompt Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-12"
        >
          {prompts.map((prompt, index) => {
            const isSelected = selectedPrompt === prompt.id;
            const Icon = prompt.icon;

            return (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPrompt(prompt.id)}
                className="cursor-pointer"
              >
                <div
                  className={`relative h-80 rounded-3xl overflow-hidden border-4 transition-all duration-500 ${
                    isSelected
                      ? 'border-white/50 scale-105'
                      : 'border-purple-500/30 hover:border-purple-500/60'
                  }`}
                  style={{
                    background: isSelected
                      ? 'rgba(30, 15, 60, 0.95)'
                      : 'rgba(20, 10, 40, 0.7)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: isSelected ? `0 0 50px ${prompt.glowColor}` : 'none'
                  }}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${prompt.gradient} opacity-${isSelected ? '30' : '20'} transition-opacity duration-500`}
                  />

                  {/* Animated particles for selected card */}
                  {isSelected && (
                    <div className="absolute inset-0">
                      {[...Array(10)].map((_, i) => (
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
                  )}

                  {/* Content */}
                  <div className="relative h-full p-8 flex flex-col items-center justify-center text-center">
                    {/* Icon */}
                    <motion.div
                      className={`mb-6 p-6 rounded-full bg-gradient-to-br ${prompt.gradient}`}
                      style={{
                        boxShadow: isSelected ? `0 0 30px ${prompt.glowColor}` : `0 0 15px ${prompt.glowColor}40`
                      }}
                      animate={isSelected ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icon className="w-12 h-12 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3
                      className={`text-3xl font-bold mb-4 transition-all duration-300 ${
                        isSelected ? 'text-white' : 'text-gray-200'
                      }`}
                      style={{
                        textShadow: isSelected ? `0 0 20px ${prompt.glowColor}` : 'none'
                      }}
                    >
                      {prompt.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-lg ${isSelected ? 'text-gray-200' : 'text-gray-400'} transition-colors duration-300`}>
                      {prompt.description}
                    </p>

                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center bg-white"
                        style={{
                          boxShadow: `0 0 20px ${prompt.glowColor}`
                        }}
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedPrompt}
            className={`w-full py-6 text-xl font-bold rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 ${
              selectedPrompt
                ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:scale-105'
                : 'bg-gray-700 opacity-50 cursor-not-allowed'
            }`}
            style={{
              border: selectedPrompt ? '3px solid rgba(255, 255, 255, 0.3)' : '3px solid rgba(100, 100, 100, 0.3)',
              boxShadow: selectedPrompt ? '0 0 40px rgba(147, 51, 234, 0.6)' : 'none',
              textShadow: selectedPrompt ? '0 0 10px rgba(255, 255, 255, 0.8)' : 'none'
            }}
          >
            {selectedPrompt ? (
              <>
                <span>CONTINUE</span>
                <ArrowRight className="w-6 h-6" />
              </>
            ) : (
              <span>SELECT AN EXPLORATION AREA</span>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

