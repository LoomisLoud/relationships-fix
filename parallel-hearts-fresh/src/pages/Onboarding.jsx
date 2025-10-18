import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Onboarding({ setUserData }) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [partnerName, setPartnerName] = useState('')

  const handleStart = () => {
    if (name && email) {
      const user = {
        id: Date.now().toString(),
        name,
        email,
        partnerName: partnerName || 'Partner',
        xp: 0,
        level: 1,
        badges: [],
        createdAt: new Date().toISOString()
      }
      setUserData(user)
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6"
      >
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4"
          >
            <Heart className="w-10 h-10 text-white fill-white" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Parallel Hearts
          </h1>
          <p className="text-gray-600 text-lg">
            Transform your relationship through gamified growth
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Partner's Name (Optional)</label>
            <Input
              type="text"
              placeholder="Your partner's name"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <Button 
          onClick={handleStart}
          disabled={!name || !email}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Begin Your Journey
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy. 
          This app is not a substitute for professional therapy.
        </p>
      </motion.div>
    </div>
  )
}

