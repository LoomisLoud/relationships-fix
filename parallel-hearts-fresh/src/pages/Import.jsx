import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Upload, FileText, MessageSquare, TrendingUp, Heart, ArrowLeft, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { analyzeConversation, storeAnalysisResults } from '@/services/api'

export default function Import() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [error, setError] = useState(null)

  // Parse WhatsApp chat file
  const parseWhatsAppChat = (text) => {
    // WhatsApp format: [date, time] Contact: Message
    // Example: [1/15/24, 10:30:45 AM] John: Hello there!
    
    const lines = text.split('\n').filter(line => line.trim())
    let conversation = ''
    let messageCount = 0
    
    for (const line of lines) {
      // Match WhatsApp message pattern
      const match = line.match(/\[(.*?)\]\s*(.*?):\s*(.*)/)
      if (match) {
        const [, timestamp, contact, message] = match
        conversation += `${contact}: ${message}\n`
        messageCount++
      } else if (line.trim() && !line.startsWith('[')) {
        // Continuation of previous message
        conversation += `${line}\n`
      }
    }
    
    return {
      conversation: conversation.trim(),
      messageCount,
      charCount: conversation.length,
      wordCount: conversation.split(/\s+/).length
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.name.endsWith('.txt')) {
      setFile(selectedFile)
      setError(null)
    } else {
      setError('Please upload a .txt file')
    }
  }

  const analyzeWhatsAppChat = async () => {
    if (!file) return

    setAnalyzing(true)
    setProgress(0)
    setError(null)

    try {
      // Step 1: Read file
      setCurrentStep('Reading WhatsApp chat file...')
      setProgress(10)
      
      const text = await file.text()
      
      // Step 2: Parse WhatsApp format
      setCurrentStep('Parsing conversation...')
      setProgress(20)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const parsed = parseWhatsAppChat(text)
      
      if (!parsed.conversation || parsed.charCount < 50) {
        throw new Error('Could not parse WhatsApp chat. Please make sure you uploaded a valid WhatsApp export file.')
      }
      
      // Step 3: Analyze with Claude
      setCurrentStep('Analyzing psychological profiles...')
      setProgress(30)
      
      const relationshipType = sessionStorage.getItem('parallel_hearts_relationship_type') || 'romantic'
      
      const analysisResult = await analyzeConversation(
        parsed.conversation,
        relationshipType,
        null
      )
      
      setProgress(70)
      
      if (!analysisResult.success) {
        throw new Error(analysisResult.error || 'Analysis failed')
      }
      
      // Step 4: Store results
      setCurrentStep('Preparing your insights...')
      setProgress(90)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Store analysis in session
      storeAnalysisResults(analysisResult.analysis)
      
      // Store metadata
      sessionStorage.setItem('parallel_hearts_upload_stats', JSON.stringify({
        messageCount: parsed.messageCount,
        charCount: parsed.charCount,
        wordCount: parsed.wordCount,
        source: 'whatsapp_upload'
      }))
      
      setProgress(100)
      setCurrentStep('Complete!')
      
      // Navigate to results after brief delay
      await new Promise(resolve => setTimeout(resolve, 800))
      navigate('/loading-realities')
      
    } catch (err) {
      console.error('Analysis error:', err)
      setError(err.message || 'Failed to analyze conversation. Please try again.')
      setAnalyzing(false)
      setProgress(0)
      setCurrentStep('')
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cosmic background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.3), transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.3), transparent 50%)`
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/welcome')}
          className="mb-6 text-cyan-400 hover:text-cyan-300 hover:bg-purple-900/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-magenta-400 to-purple-400 bg-clip-text text-transparent">
              Upload Your Conversations
            </h1>
            <p className="text-cyan-200 text-lg">
              Upload WhatsApp chat export for deep psychological analysis
            </p>
          </div>

          <Card className="border-2 border-purple-500/50 bg-purple-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-300">
                <Upload className="w-5 h-5 mr-2" />
                Upload WhatsApp Chat
              </CardTitle>
              <CardDescription className="text-purple-200">
                Export your chat from WhatsApp (without media) and upload the .txt file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-purple-400/50 rounded-xl p-8 text-center hover:border-cyan-400 transition-colors bg-black/30">
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  disabled={analyzing}
                />
                <label 
                  htmlFor="file-upload"
                  className={`cursor-pointer flex flex-col items-center space-y-3 ${analyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-cyan-300">
                      {file ? file.name : 'Click to upload WhatsApp chat'}
                    </p>
                    <p className="text-sm text-purple-300">WhatsApp .txt export file</p>
                  </div>
                </label>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {analyzing && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cyan-300 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                      {currentStep}
                    </span>
                    <span className="font-semibold text-magenta-400">{progress}%</span>
                  </div>
                  <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 via-magenta-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-purple-300 text-center">
                    Processing with Claude AI for deep psychological insights...
                  </p>
                </div>
              )}

              <Button
                onClick={analyzeWhatsAppChat}
                disabled={!file || analyzing}
                className="w-full bg-gradient-to-r from-cyan-500 via-magenta-500 to-purple-500 hover:from-cyan-600 hover:via-magenta-600 hover:to-purple-600 text-white font-semibold py-6 text-lg shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzing ? (
                  <span className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Conversation'
                )}
              </Button>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-cyan-300">📱 How to export from WhatsApp:</p>
                <ol className="text-xs text-cyan-200 space-y-1 list-decimal list-inside">
                  <li>Open the chat in WhatsApp</li>
                  <li>Tap the three dots menu → More → Export chat</li>
                  <li>Choose "Without Media"</li>
                  <li>Save the .txt file and upload it here</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

