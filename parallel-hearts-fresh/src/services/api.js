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
      throw new Error(data.error || 'Failed to analyze conversation');
    }
    
    return data;
  } catch (error) {
    console.error('Conversation analysis failed:', error);
    throw error;
  }
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

