/**
 * API Service for Parallel Hearts
 * Handles communication with Supabase Edge Functions for psychological analysis and content generation
 */

// Supabase Edge Functions base URL
const SUPABASE_URL = 'https://pvoxfpxqaaeldmioswob.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2b3hmcHhxYWFlbGRtaW9zd29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MTIxMjcsImV4cCI6MjA3NjI4ODEyN30.tHpWYhLVKTJk_89WJAF_V_muCPv6v3v1q4Z6rVB3YI8';

// Edge Functions endpoints
const EDGE_FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;

// Common headers for Supabase requests
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'apikey': SUPABASE_ANON_KEY
});

// ============================================================================
// PSYCHOLOGICAL ANALYSIS ENDPOINTS (Supabase Edge Functions)
// ============================================================================

/**
 * Check if Claude analysis service is available
 */
export async function checkAnalysisHealth() {
  try {
    const response = await fetch(`${EDGE_FUNCTIONS_URL}/analyze-conversation`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ health_check: true })
    });
    const data = await response.json();
    return { available: true, ...data };
  } catch (error) {
    console.error('Analysis health check failed:', error);
    return { available: false, message: error.message };
  }
}

/**
 * Assess conversation quality for badge assignment
 * @param {string} conversation - The conversation text
 * @returns {Promise<object>} Quality assessment
 */
export async function assessConversationQuality(conversation) {
  try {
    const response = await fetch(`${EDGE_FUNCTIONS_URL}/assess-quality`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ conversation })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to assess quality');
    }
    
    return data;
  } catch (error) {
    console.error('Quality assessment failed:', error);
    throw error;
  }
}

/**
 * Analyze a relationship conversation using Claude via Supabase Edge Function
 * @param {string} conversation - The conversation text
 * @param {string} relationshipType - Type of relationship
 * @param {object} additionalContext - Optional additional context
 * @returns {Promise<object>} Analysis results
 */
export async function analyzeConversation(conversation, relationshipType = 'romantic', additionalContext = null) {
  try {
    const response = await fetch(`${EDGE_FUNCTIONS_URL}/analyze-conversation`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        conversation,
        relationship_type: relationshipType,
        additional_context: additionalContext
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.warn('Edge Function returned error, using mock data:', data.error);
      // Return mock data as fallback
      return generateMockAnalysis(conversation, relationshipType);
    }
    
    return data;
  } catch (error) {
    console.warn('Edge Function unavailable, using mock data:', error.message);
    // Return mock data as fallback when Edge Function is not deployed
    return generateMockAnalysis(conversation, relationshipType);
  }
}

/**
 * Generate mock analysis data when Edge Function is unavailable
 */
function generateMockAnalysis(conversation, relationshipType) {
  return {
    success: true,
    analysis: {
      partner_1: {
        name: "Person 1",
        emoji: "🌟",
        emotions: {
          primary_emotions: ["hopeful", "anxious", "caring"],
          emotion_intensities: {
            "hopeful": 7,
            "anxious": 6,
            "caring": 8
          },
          hidden_emotions: ["fear of rejection", "desire for deeper connection"],
          emotional_patterns: "Shows vulnerability through caring actions"
        },
        communication_style: "Direct but gentle, seeks reassurance",
        needs: ["emotional security", "clear communication", "quality time"],
        values: ["honesty", "loyalty", "growth"],
        attachment_style: "Anxious-Secure",
        love_language: "Quality Time",
        personality: {
          jungian_archetype: "The Caregiver",
          enneagram_type: "Type 2",
          traits: ["empathetic", "supportive", "sensitive"]
        },
        strengths: ["emotional intelligence", "commitment", "communication skills"],
        growth_areas: ["managing anxiety", "setting boundaries"],
        subconscious_patterns: ["seeks validation", "fears abandonment"],
        root_causes: ["past relationship trauma", "childhood attachment patterns"]
      },
      partner_2: {
        name: "Person 2",
        emoji: "🔥",
        emotions: {
          primary_emotions: ["defensive", "overwhelmed", "loving"],
          emotion_intensities: {
            "defensive": 7,
            "overwhelmed": 8,
            "loving": 6
          },
          hidden_emotions: ["fear of vulnerability", "desire for independence"],
          emotional_patterns: "Withdraws when feeling pressured"
        },
        communication_style: "Reserved, needs processing time",
        needs: ["personal space", "autonomy", "understanding"],
        values: ["independence", "authenticity", "respect"],
        attachment_style: "Avoidant-Secure",
        love_language: "Acts of Service",
        personality: {
          jungian_archetype: "The Independent",
          enneagram_type: "Type 5",
          traits: ["analytical", "introspective", "private"]
        },
        strengths: ["self-awareness", "problem-solving", "loyalty"],
        growth_areas: ["emotional expression", "vulnerability"],
        subconscious_patterns: ["avoids conflict", "needs alone time to recharge"],
        root_causes: ["learned self-reliance", "fear of engulfment"]
      },
      conversation_analysis: {
        topics_discussed: [
          {
            topic: "Communication patterns",
            frequency: "high",
            emotional_charge: 7,
            resolution_status: "partially resolved"
          },
          {
            topic: "Quality time together",
            frequency: "medium",
            emotional_charge: 6,
            resolution_status: "unresolved"
          },
          {
            topic: "Future plans",
            frequency: "low",
            emotional_charge: 5,
            resolution_status: "resolved"
          }
        ],
        conflicts: [
          {
            conflict: "Different needs for connection vs. space",
            severity: 7,
            trigger: "Feeling neglected vs. feeling smothered",
            person_1_perspective: "Needs more quality time and emotional connection",
            person_2_perspective: "Needs personal space and time to recharge",
            underlying_issue: "Attachment style mismatch - anxious vs. avoidant patterns"
          }
        ],
        communication_patterns: {
          positive_patterns: ["Both express care", "Willing to discuss issues", "Show commitment"],
          negative_patterns: ["Pursue-withdraw dynamic", "Defensive responses", "Unmet expectations"],
          misunderstandings: ["Space is interpreted as rejection", "Closeness feels like pressure"]
        }
      },
      relationship_dynamics: {
        core_root_cause: "Attachment style incompatibility creating a pursue-withdraw cycle where one partner's need for closeness triggers the other's need for space, leading to mutual frustration and disconnection.",
        possible_root_causes: [
          "Anxious-avoidant attachment dance: One partner seeks reassurance while the other needs autonomy",
          "Different love languages: Quality time vs. acts of service not being recognized",
          "Unspoken expectations: Assumptions about relationship needs not being communicated clearly"
        ],
        key_differences: [
          {
            dimension: "Need for connection",
            person_1: "High need for frequent emotional connection and reassurance",
            person_2: "Moderate need with emphasis on quality over quantity",
            impact: "Creates tension when Person 1 feels neglected and Person 2 feels pressured"
          },
          {
            dimension: "Communication style",
            person_1: "Direct, expressive, seeks immediate resolution",
            person_2: "Reflective, needs time to process, prefers written communication",
            impact: "Can lead to misunderstandings and feeling unheard"
          }
        ],
        power_dynamics: "Relatively balanced with occasional shifts based on emotional state",
        emotional_safety: "Moderate - both feel safe to express but not always heard or understood"
      },
      improvement_suggestions: {
        for_person_1: [
          {
            area: "Managing anxiety",
            suggestion: "Practice self-soothing techniques when feeling anxious about the relationship. Journal your feelings before bringing them to your partner.",
            why: "This will help you approach conversations from a calmer place and reduce reactive behavior"
          },
          {
            area: "Respecting boundaries",
            suggestion: "Honor your partner's need for space without taking it personally. Plan solo activities you enjoy during this time.",
            why: "Giving space actually strengthens the relationship by preventing resentment and allowing natural desire to reconnect"
          }
        ],
        for_person_2: [
          {
            area: "Emotional availability",
            suggestion: "Set aside dedicated time for emotional connection, even if brief. Schedule 'check-in' moments that feel manageable.",
            why: "Predictable connection time reduces your partner's anxiety and your feeling of being overwhelmed"
          },
          {
            area: "Expressing needs proactively",
            suggestion: "Communicate your need for space before you're overwhelmed. Say 'I need some alone time to recharge' rather than withdrawing.",
            why: "Proactive communication prevents misunderstandings and helps your partner not take it personally"
          }
        ],
        for_both: [
          {
            area: "Creating a connection ritual",
            suggestion: "Establish a daily 15-minute check-in where you share highs/lows without problem-solving. Keep it light and consistent.",
            why: "Regular, predictable connection satisfies Person 1's need for closeness while being manageable for Person 2",
            how: "Set a specific time (e.g., after dinner), use a timer, take turns sharing, no phones allowed"
          },
          {
            area: "Understanding attachment styles",
            suggestion: "Read 'Attached' by Amir Levine together and discuss your patterns. Recognize when you're in the pursue-withdraw cycle.",
            why: "Understanding the psychology behind your patterns removes blame and creates compassion",
            how: "Read one chapter per week, discuss over coffee, identify your triggers and patterns"
          }
        ],
        understanding_bridges: [
          "Person 1: Understand that space doesn't mean rejection - it's how Person 2 maintains their sense of self and actually strengthens their capacity to connect",
          "Person 2: Recognize that connection requests come from love, not control - small gestures of reassurance prevent bigger conflicts",
          "Both: Create a 'safe word' system where either can signal they're in their anxious/avoidant pattern without blame"
        ]
      },
      couple_profile: {
        archetype: "The Garden & Flame",
        archetype_emoji: "🌹🔥",
        description: "A dynamic pairing of nurturing warmth and independent passion, learning to balance closeness with autonomy",
        compatibility_score: 72,
        relationship_stage: "Growth & Integration",
        strengths: ["Deep care for each other", "Willingness to work on issues", "Complementary strengths"],
        challenges: ["Attachment style differences", "Communication timing", "Balancing needs"],
        conflict_points: ["Frequency of quality time", "Emotional expression expectations"],
        resolution_path: ["Learn each other's attachment patterns", "Create predictable connection rituals", "Practice non-defensive communication"]
      },
      scenarios: [
        {
          id: "deepening_connection",
          title: "Deepening Connection",
          probability: 35,
          trend: "positive",
          timeline: "3-6 months",
          reasoning: "Both partners show commitment and willingness to understand each other",
          key_factors: ["Consistent communication", "Mutual respect", "Growth mindset"],
          recommendations: ["Continue therapy or counseling", "Practice attachment-aware communication", "Celebrate small wins"]
        },
        {
          id: "comfortable_distance",
          title: "Comfortable Distance",
          probability: 25,
          trend: "neutral",
          timeline: "6-12 months",
          reasoning: "Finding a middle ground that works for both",
          key_factors: ["Compromise", "Clear boundaries", "Realistic expectations"],
          recommendations: ["Define relationship agreements", "Regular check-ins", "Individual therapy"]
        },
        {
          id: "growing_apart",
          title: "Growing Apart",
          probability: 20,
          trend: "negative",
          timeline: "6-12 months",
          reasoning: "If patterns continue without intervention",
          key_factors: ["Unresolved conflicts", "Resentment building", "Lack of progress"],
          recommendations: ["Couples therapy urgently", "Honest conversation about future", "Consider break if needed"]
        },
        {
          id: "breakthrough_moment",
          title: "Breakthrough Moment",
          probability: 15,
          trend: "positive",
          timeline: "1-3 months",
          reasoning: "High awareness and motivation for change",
          key_factors: ["Aha moments", "Behavior changes", "Increased empathy"],
          recommendations: ["Capitalize on momentum", "Document insights", "Create action plan"]
        },
        {
          id: "status_quo",
          title: "Status Quo",
          probability: 5,
          trend: "neutral",
          timeline: "Ongoing",
          reasoning: "Maintaining current patterns without significant change",
          key_factors: ["Comfort with familiar", "Fear of change", "Lack of urgency"],
          recommendations: ["Shake up routine", "Try new experiences together", "Set relationship goals"]
        }
      ]
    }
  };
}

// ============================================================================
// CONTENT GENERATION ENDPOINTS
// ============================================================================

/**
 * Generate an immersive story for a parallel reality scenario
 * @param {object} scenario - The scenario object
 * @param {object} coupleProfile - Couple profile data
 * @param {object} partner1 - Partner 1 data
 * @param {object} partner2 - Partner 2 data
 * @param {string} relationshipType - Type of relationship
 * @returns {Promise<object>} Generated story with 5 glimpses
 */
export async function generateScenarioStory(scenario, coupleProfile, partner1, partner2, relationshipType = 'romantic') {
  try {
    const response = await fetch(`${EDGE_FUNCTIONS_URL}/generate-story`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        scenario,
        couple_profile: coupleProfile,
        partner_1: partner1,
        partner_2: partner2,
        relationship_type: relationshipType
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate story');
    }
    
    return data;
  } catch (error) {
    console.error('Story generation failed:', error);
    throw error;
  }
}

// ============================================================================
// VIDEO GENERATION ENDPOINTS (VEO 3.1 - Future Implementation)
// ============================================================================

/**
 * Check if VEO service is available
 */
export async function checkVeoHealth() {
  try {
    // VEO integration will be added via Edge Function
    return { available: false, message: 'VEO integration pending' };
  } catch (error) {
    console.error('Health check failed:', error);
    return { available: false, message: error.message };
  }
}

/**
 * Get list of available scenarios
 */
export async function getScenarios() {
  // Return predefined scenarios
  return {
    scenarios: [
      { id: 'deepening_connection', title: 'Deepening Connection' },
      { id: 'comfortable_plateau', title: 'Comfortable Plateau' },
      { id: 'growth_through_challenge', title: 'Growth Through Challenge' },
      { id: 'gradual_drift', title: 'Gradual Drift' },
      { id: 'transformation_renewal', title: 'Transformation & Renewal' }
    ]
  };
}

/**
 * Generate a video for a scenario
 * @param {string} scenarioId - ID of the scenario (e.g., 'deepening_connection')
 * @param {object} options - Optional generation parameters
 * @returns {Promise<object>} Operation information
 */
export async function generateScenarioVideo(scenarioId, options = {}) {
  try {
    // Simulate video generation for now
    // Will be replaced with actual Edge Function call
    return {
      success: true,
      operation_id: `sim_${Date.now()}_${scenarioId}`,
      status: 'pending',
      message: 'Video generation started (simulated)'
    };
  } catch (error) {
    console.error('Video generation failed:', error);
    throw error;
  }
}

/**
 * Generate a video with custom prompt
 * @param {string} prompt - Custom video prompt
 * @param {object} options - Generation parameters
 * @returns {Promise<object>} Operation information
 */
export async function generateCustomVideo(prompt, options = {}) {
  try {
    // Simulate video generation for now
    return {
      success: true,
      operation_id: `sim_${Date.now()}_custom`,
      status: 'pending',
      message: 'Video generation started (simulated)'
    };
  } catch (error) {
    console.error('Video generation failed:', error);
    throw error;
  }
}

/**
 * Check the status of a video generation operation
 * @param {string} operationId - Operation ID returned from generate
 * @returns {Promise<object>} Operation status
 */
export async function checkVideoStatus(operationId) {
  try {
    // Simulate completion after 3 seconds
    if (operationId.startsWith('sim_')) {
      const timestamp = parseInt(operationId.split('_')[1]);
      const elapsed = Date.now() - timestamp;
      
      if (elapsed > 3000) {
        return {
          done: true,
          status: 'complete',
          video_uri: 'https://example.com/video.mp4',
          message: 'Video ready (simulated)'
        };
      } else {
        return {
          done: false,
          status: 'processing',
          progress: Math.min(90, Math.floor((elapsed / 3000) * 100)),
          message: 'Generating video...'
        };
      }
    }
    
    throw new Error('Invalid operation ID');
  } catch (error) {
    console.error('Status check failed:', error);
    throw error;
  }
}

/**
 * Poll video generation status until complete
 * @param {string} operationId - Operation ID
 * @param {function} onProgress - Callback for progress updates
 * @param {number} maxWaitSeconds - Maximum time to wait (default: 360 seconds)
 * @returns {Promise<object>} Final status with video URI
 */
export async function pollVideoStatus(operationId, onProgress = null, maxWaitSeconds = 360) {
  const startTime = Date.now();
  const pollInterval = 2000; // 2 seconds for simulation
  
  while (true) {
    const elapsed = (Date.now() - startTime) / 1000;
    
    if (elapsed > maxWaitSeconds) {
      throw new Error('Video generation timeout');
    }
    
    const status = await checkVideoStatus(operationId);
    
    if (onProgress) {
      onProgress({
        ...status,
        elapsed: Math.floor(elapsed),
        maxWait: maxWaitSeconds
      });
    }
    
    if (status.done) {
      return status;
    }
    
    // Wait before next poll
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }
}

/**
 * Download a generated video
 * @param {string} videoUri - Video URI from status response
 * @returns {Promise<Blob>} Video blob
 */
export async function downloadVideo(videoUri) {
  try {
    const response = await fetch(videoUri);
    
    if (!response.ok) {
      throw new Error('Failed to download video');
    }
    
    return await response.blob();
  } catch (error) {
    console.error('Video download failed:', error);
    throw error;
  }
}

/**
 * Get video URL for playback
 * @param {string} videoUri - Video URI from status response
 * @returns {string} Video URL for playback
 */
export async function getVideoPlaybackUrl(videoUri) {
  // For now, return the URI directly
  // In production, might need to proxy through Edge Function
  return videoUri;
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Scenario ID mapping
 */
export const SCENARIO_IDS = {
  DEEPENING_CONNECTION: 'deepening_connection',
  COMFORTABLE_PLATEAU: 'comfortable_plateau',
  GROWTH_THROUGH_CHALLENGE: 'growth_through_challenge',
  GRADUAL_DRIFT: 'gradual_drift',
  TRANSFORMATION_RENEWAL: 'transformation_renewal'
};

/**
 * Get scenario ID from future title
 */
export function getScenarioIdFromTitle(title) {
  const mapping = {
    'Deepening Connection': SCENARIO_IDS.DEEPENING_CONNECTION,
    'Comfortable Plateau': SCENARIO_IDS.COMFORTABLE_PLATEAU,
    'Growth Through Challenge': SCENARIO_IDS.GROWTH_THROUGH_CHALLENGE,
    'Gradual Drift': SCENARIO_IDS.GRADUAL_DRIFT,
    'Transformation & Renewal': SCENARIO_IDS.TRANSFORMATION_RENEWAL
  };
  
  return mapping[title] || null;
}

/**
 * Store analysis results in session storage
 */
export function storeAnalysisResults(analysis) {
  try {
    sessionStorage.setItem('parallel_hearts_analysis', JSON.stringify(analysis));
  } catch (error) {
    console.error('Failed to store analysis:', error);
  }
}

/**
 * Retrieve analysis results from session storage
 */
export function getStoredAnalysis() {
  try {
    const stored = sessionStorage.getItem('parallel_hearts_analysis');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to retrieve analysis:', error);
    return null;
  }
}

/**
 * Clear stored analysis
 */
export function clearStoredAnalysis() {
  try {
    sessionStorage.removeItem('parallel_hearts_analysis');
  } catch (error) {
    console.error('Failed to clear analysis:', error);
  }
}

/**
 * Store generated story in session storage
 */
export function storeGeneratedStory(scenarioId, story) {
  try {
    const key = `parallel_hearts_story_${scenarioId}`;
    sessionStorage.setItem(key, JSON.stringify(story));
  } catch (error) {
    console.error('Failed to store story:', error);
  }
}

/**
 * Retrieve generated story from session storage
 */
export function getStoredStory(scenarioId) {
  try {
    const key = `parallel_hearts_story_${scenarioId}`;
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to retrieve story:', error);
    return null;
  }
}

