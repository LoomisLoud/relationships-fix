import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mic, Square, Play, Pause, Upload, Sparkles, ChevronRight, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function VoiceMessage() {
  const navigate = useNavigate()
  const location = useLocation()
  const relationshipType = location.state?.type || 'romantic'
  const subType = location.state?.subType || null

  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const timerRef = useRef(null)
  const audioPlayerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
  }, [audioUrl])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })

      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setIsPaused(false)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)

    } catch (err) {
      console.error('Error accessing microphone:', err)
      setError('Unable to access microphone. Please grant permission and try again.')
    }
  }

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause()
      setIsPaused(true)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume()
      setIsPaused(false)
      
      // Resume timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }

  const resetRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioBlob(null)
    setAudioUrl(null)
    setRecordingTime(0)
    setIsPlaying(false)
    setError(null)
  }

  const togglePlayback = () => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause()
        setIsPlaying(false)
      } else {
        audioPlayerRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleSubmit = async () => {
    if (!audioBlob) return

    setIsProcessing(true)
    setError(null)

    try {
      // Convert blob to base64
      const reader = new FileReader()
      reader.readAsDataURL(audioBlob)
      
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1]

        // Call transcription Edge Function
        const { data, error: transcribeError } = await supabase.functions.invoke('transcribe-voice', {
          body: { 
            audio: base64Audio,
            relationshipType,
            subType
          }
        })

        if (transcribeError) {
          throw new Error(transcribeError.message || 'Failed to transcribe audio')
        }

        // Navigate to loading page with transcription for conversation analysis
        navigate('/loading-realities', {
          state: {
            type: relationshipType,
            subType,
            conversation: data.transcription,
            source: 'voice'
          }
        })
      }

      reader.onerror = () => {
        throw new Error('Failed to read audio file')
      }

    } catch (err) {
      console.error('Error processing voice message:', err)
      setError(err.message || 'Failed to process voice message. Please try again.')
      setIsProcessing(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated cosmic background */}
      <div className="absolute inset-0 cosmic-bg opacity-30"></div>
      
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
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-black mb-4 glow-text"
            style={{
              background: 'linear-gradient(135deg, #ff6600, #ff00ff, #00ffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            animate={{
              textShadow: [
                '0 0 40px rgba(255, 102, 0, 0.8)',
                '0 0 60px rgba(255, 0, 255, 0.8)',
                '0 0 40px rgba(0, 255, 255, 0.8)',
                '0 0 60px rgba(255, 102, 0, 0.8)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            SHARE YOUR STORY
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-xl md:text-2xl text-cyan-200 font-light"
          >
            Record a voice message about your relationship
          </motion.p>
        </motion.div>

        {/* Recording Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full max-w-2xl mb-8"
        >
          <Card
            className="relative overflow-hidden border-4 border-purple-500/30"
            style={{
              background: 'rgba(20, 10, 40, 0.8)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="p-12 flex flex-col items-center space-y-8">
              
              {/* Recording Visualizer */}
              <div className="relative w-64 h-64">
                {/* Outer pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4"
                  style={{
                    borderColor: isRecording ? '#ff6600' : '#9d00ff',
                    boxShadow: isRecording 
                      ? '0 0 40px #ff6600, inset 0 0 40px #ff6600'
                      : '0 0 20px #9d00ff'
                  }}
                  animate={isRecording && !isPaused ? {
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Middle ring */}
                <motion.div
                  className="absolute inset-8 rounded-full border-4"
                  style={{
                    borderColor: isRecording ? '#ff00ff' : '#00ffff',
                    boxShadow: isRecording 
                      ? '0 0 30px #ff00ff, inset 0 0 30px #ff00ff'
                      : '0 0 15px #00ffff'
                  }}
                  animate={isRecording && !isPaused ? {
                    rotate: 360
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Center microphone icon */}
                <motion.div
                  className="absolute inset-16 rounded-full flex items-center justify-center"
                  style={{
                    background: isRecording 
                      ? 'linear-gradient(135deg, #ff6600, #ff00ff)'
                      : 'linear-gradient(135deg, #9d00ff, #00ffff)',
                    boxShadow: isRecording
                      ? '0 0 50px rgba(255, 102, 0, 0.8)'
                      : '0 0 30px rgba(157, 0, 255, 0.5)'
                  }}
                  animate={isRecording && !isPaused ? {
                    scale: [1, 1.05, 1]
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Mic className="w-16 h-16 text-white" />
                </motion.div>

                {/* Recording indicator */}
                {isRecording && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-full">
                      <motion.div
                        className="w-3 h-3 bg-white rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-white font-bold text-sm">
                        {isPaused ? 'PAUSED' : 'RECORDING'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Timer */}
              <div className="text-center">
                <div 
                  className="text-5xl font-black tracking-wider"
                  style={{
                    color: isRecording ? '#ff6600' : '#00ffff',
                    textShadow: isRecording 
                      ? '0 0 20px #ff6600'
                      : '0 0 20px #00ffff'
                  }}
                >
                  {formatTime(recordingTime)}
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  {audioBlob ? 'Recording complete' : isRecording ? 'Recording in progress...' : 'Ready to record'}
                </p>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center space-x-4">
                {!audioBlob && !isRecording && (
                  <Button
                    onClick={startRecording}
                    className="w-20 h-20 rounded-full neon-border pulse-glow"
                    style={{
                      background: 'linear-gradient(135deg, #ff6600, #ff00ff)',
                      border: '3px solid #ff6600',
                      boxShadow: '0 0 30px #ff6600'
                    }}
                  >
                    <Mic className="w-10 h-10 text-white" />
                  </Button>
                )}

                {isRecording && !isPaused && (
                  <>
                    <Button
                      onClick={pauseRecording}
                      className="w-16 h-16 rounded-full"
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '2px solid #00ffff'
                      }}
                    >
                      <Pause className="w-8 h-8 text-cyan-400" />
                    </Button>
                    <Button
                      onClick={stopRecording}
                      className="w-20 h-20 rounded-full neon-border"
                      style={{
                        background: 'linear-gradient(135deg, #ff0000, #ff6600)',
                        border: '3px solid #ff0000',
                        boxShadow: '0 0 30px #ff0000'
                      }}
                    >
                      <Square className="w-10 h-10 text-white" />
                    </Button>
                  </>
                )}

                {isRecording && isPaused && (
                  <>
                    <Button
                      onClick={resumeRecording}
                      className="w-16 h-16 rounded-full neon-border"
                      style={{
                        background: 'linear-gradient(135deg, #00ff80, #00ffff)',
                        border: '2px solid #00ff80'
                      }}
                    >
                      <Mic className="w-8 h-8 text-white" />
                    </Button>
                    <Button
                      onClick={stopRecording}
                      className="w-20 h-20 rounded-full neon-border"
                      style={{
                        background: 'linear-gradient(135deg, #ff0000, #ff6600)',
                        border: '3px solid #ff0000',
                        boxShadow: '0 0 30px #ff0000'
                      }}
                    >
                      <Square className="w-10 h-10 text-white" />
                    </Button>
                  </>
                )}

                {audioBlob && (
                  <>
                    <Button
                      onClick={togglePlayback}
                      className="w-20 h-20 rounded-full neon-border pulse-glow"
                      style={{
                        background: 'linear-gradient(135deg, #00ffff, #9d00ff)',
                        border: '3px solid #00ffff',
                        boxShadow: '0 0 30px #00ffff'
                      }}
                    >
                      {isPlaying ? (
                        <Pause className="w-10 h-10 text-white" />
                      ) : (
                        <Play className="w-10 h-10 text-white" />
                      )}
                    </Button>
                    <Button
                      onClick={resetRecording}
                      className="w-16 h-16 rounded-full"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid #ff00ff'
                      }}
                    >
                      <RotateCcw className="w-8 h-8 text-magenta-400" />
                    </Button>
                  </>
                )}
              </div>

              {/* Hidden audio player */}
              {audioUrl && (
                <audio
                  ref={audioPlayerRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />
              )}

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full p-4 bg-red-500/20 border-2 border-red-500 rounded-lg"
                  >
                    <p className="text-red-300 text-center text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Instructions */}
              {!audioBlob && !isRecording && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center space-y-2"
                >
                  <p className="text-cyan-300 font-medium">
                    Click the microphone to start recording
                  </p>
                  <p className="text-gray-400 text-sm max-w-md">
                    Share your thoughts, feelings, and experiences about your relationship. 
                    The more details you provide, the better I can analyze and generate parallel realities.
                  </p>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Submit Button */}
        {audioBlob && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full py-8 text-2xl font-black tracking-wider rounded-2xl neon-border pulse-glow"
              style={{
                background: 'linear-gradient(135deg, #ff00ff, #00ffff, #9d00ff)',
                border: '3px solid #ff00ff',
                color: '#ffffff',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
                opacity: isProcessing ? 0.5 : 1
              }}
            >
              {isProcessing ? (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center justify-center space-x-3"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>PROCESSING...</span>
                  <Sparkles className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center justify-center space-x-3"
                >
                  <Upload className="w-6 h-6" />
                  <span>ANALYZE MY RELATIONSHIP</span>
                  <ChevronRight className="w-6 h-6" />
                </motion.span>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

