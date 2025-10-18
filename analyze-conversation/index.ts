// Supabase Edge Function: Comprehensive Psychological Analysis with Claude
// Deploy to: https://pvoxfpxqaaeldmioswob.supabase.co/functions/v1/analyze-conversation
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
const CLAUDE_API_KEY = Deno.env.get('CLAUDE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
serve(async (req)=>{
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    // Parse request body
    const { conversation, relationship_type = 'romantic', additional_context } = await req.json();
    if (!conversation) {
      return new Response(JSON.stringify({
        success: false,
        error: 'conversation is required'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Build comprehensive Claude prompt
    const systemPrompt = `Act as a psychotherapist and life coach with many years of experience, knowing all the methodologies and modalities: subconscious mind therapy, psychoanalysis, internal family therapy, trauma therapy, PTSD, Jungian psychology, attachment theory, Enneagram, OCEAN personality model, etc.

You can understand what people feel and what is going on in their subconscious mind: what is their well-being state, what is it that they are missing in life, what are the triggers activated, what are the root causes of their behaviors, what can be past experiences that drive their thoughts and emotions, what are the different parts of the personality, etc.

Focus on the hidden information, not obvious from the first reading, hidden in their subconscious. Behave as Carl Jung and other experts in the subconscious mind.

Create a psychological profile using the "You" pronoun when addressing each partner directly in their individual sections.`;
    const userPrompt = `Analyze this ${relationship_type} relationship conversation and provide a comprehensive psychological profile.

CONVERSATION:
${conversation}

${additional_context ? `\nADDITIONAL CONTEXT:\n${Object.entries(additional_context).map(([q, a])=>`Q: ${q}\nA: ${a}`).join('\n\n')}` : ''}

Provide your analysis in the following JSON structure:

{
  "couple_profile": {
    "archetype": "Choose from: The Phoenix Union, The Garden Partnership, The Mirror Connection, The Alchemical Bond, The Nomadic Union, The Sacred Companionship, The Artisan Pairing, The Fortress Alliance, The Garden & Flame, The Odyssey Relationship, The Labyrinth Love, The Celestial Union, The Pact/Architect Relationship, or The Sanctuary Relationship",
    "archetype_emoji": "Matching emoji (🔥, 🌿, 🪞, ⚗️, 🌍, 🌙, 🎨, 🛡, 🌹, ⛵️, 🌀, ✨, ⚖️, or 🕊)",
    "compatibility_score": 0-100,
    "relationship_stage": "Current phase based on conversation",
    "description": "Brief description of their dynamic",
    "strengths": ["strength1", "strength2", "strength3"],
    "challenges": ["challenge1", "challenge2", "challenge3"],
    "conflict_points": ["point1", "point2"],
    "resolution_path": ["step1", "step2", "step3"]
  },
  "partner_1": {
    "name": "Partner A",
    "emoji": "emoji representing their energy",
    "needs": ["need1", "need2", "need3"],
    "values": ["value1", "value2", "value3"],
    "attachment_style": "Secure, Anxious, Avoidant, Disorganized, or combination",
    "love_language": "Primary love language",
    "personality": {
      "jungian_archetype": "e.g., The Warrior, The Lover, The Sage, etc.",
      "enneagram_type": "Type 1-9 with wing if applicable",
      "ocean_traits": {
        "openness": "High/Medium/Low",
        "conscientiousness": "High/Medium/Low",
        "extraversion": "High/Medium/Low",
        "agreeableness": "High/Medium/Low",
        "neuroticism": "High/Medium/Low"
      }
    },
    "emotions": {
      "primary_emotions": ["emotion1", "emotion2"],
      "hidden_emotions": ["emotion1", "emotion2"],
      "triggers": ["trigger1", "trigger2"]
    },
    "communication_style": "Detailed description",
    "goals": ["goal1", "goal2", "goal3"],
    "subconscious_patterns": ["pattern1", "pattern2"],
    "root_causes": ["cause1", "cause2"],
    "strengths": ["strength1", "strength2", "strength3"],
    "growth_areas": ["area1", "area2"]
  },
  "partner_2": {
    // Same structure as partner_1
  },
  "scenarios": [
    {
      "id": "deepening_connection",
      "title": "Deepening Connection",
      "probability": 35,
      "trend": "positive",
      "reasoning": "Why this is likely based on psychological patterns",
      "key_factors": ["factor1", "factor2"],
      "recommendations": ["rec1", "rec2"],
      "timeline": "Expected timeframe"
    },
    {
      "id": "comfortable_plateau",
      "title": "Comfortable Plateau",
      "probability": 25,
      "trend": "neutral",
      "reasoning": "...",
      "key_factors": [...],
      "recommendations": [...],
      "timeline": "..."
    },
    {
      "id": "growth_through_challenge",
      "title": "Growth Through Challenge",
      "probability": 20,
      "trend": "positive",
      "reasoning": "...",
      "key_factors": [...],
      "recommendations": [...],
      "timeline": "..."
    },
    {
      "id": "gradual_drift",
      "title": "Gradual Drift",
      "probability": 15,
      "trend": "negative",
      "reasoning": "...",
      "key_factors": [...],
      "recommendations": [...],
      "timeline": "..."
    },
    {
      "id": "transformation_renewal",
      "title": "Transformation & Renewal",
      "probability": 5,
      "trend": "positive",
      "reasoning": "...",
      "key_factors": [...],
      "recommendations": [...],
      "timeline": "..."
    }
  ],
  "communication_patterns": {
    "overall_quality": "High/Medium/Low",
    "positive_patterns": ["pattern1", "pattern2"],
    "concerning_patterns": ["pattern1", "pattern2"],
    "unconscious_dynamics": ["dynamic1", "dynamic2"]
  },
  "insights": {
    "key_insight": "Main psychological insight about the relationship",
    "biggest_strength": "Their biggest relational strength",
    "primary_challenge": "Main challenge to address",
    "immediate_recommendation": "What to do next",
    "long_term_vision": "Potential for growth",
    "shadow_work_needed": "Unconscious patterns to integrate"
  }
}

IMPORTANT GUIDELINES:
1. Use the 14 relationship archetypes as your framework
2. Apply Jungian psychology, attachment theory, Enneagram, and OCEAN model
3. Look for subconscious patterns, not just surface-level communication
4. Identify root causes, triggers, and hidden emotions
5. Be compassionate but honest about challenges
6. Provide actionable, specific recommendations
7. Consider past trauma and childhood patterns where evident
8. Address both individual and relational dynamics
9. Use "You" pronoun when writing partner profiles
10. Make probabilities realistic based on actual conversation content`;
    // Call Claude API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 8192,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    });
    if (!claudeResponse.ok) {
      const error = await claudeResponse.text();
      console.error('Claude API error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to analyze conversation'
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    const claudeData = await claudeResponse.json();
    const analysisText = claudeData.content[0].text;
    // Extract JSON from response
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Failed to extract JSON from Claude response');
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid analysis format'
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    const analysis = JSON.parse(jsonMatch[0]);
    // Save to Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    // Quality assessment
    const charCount = conversation.length;
    const wordCount = conversation.split(/\s+/).length;
    const lineCount = conversation.split('\n').length;
    let qualityBadge = 'novice';
    if (charCount >= 2000) qualityBadge = 'grandmaster';
    else if (charCount >= 1000) qualityBadge = 'master';
    else if (charCount >= 500) qualityBadge = 'adept';
    else if (charCount >= 200) qualityBadge = 'apprentice';
    // Insert conversation
    const { data: conversationData, error: convError } = await supabase.from('conversations').insert({
      text: conversation,
      quality_badge: qualityBadge,
      char_count: charCount,
      word_count: wordCount,
      line_count: lineCount,
      relationship_type,
      additional_context
    }).select().single();
    if (convError) {
      console.error('Error saving conversation:', convError);
    }
    const conversationId = conversationData?.id;
    // Insert psychological profile with enhanced fields
    let profileId = null;
    if (conversationId) {
      const { data: profileData, error: profileError } = await supabase.from('psychological_profiles').insert({
        conversation_id: conversationId,
        couple_archetype: analysis.couple_profile.archetype,
        couple_emoji: analysis.couple_profile.archetype_emoji,
        compatibility_score: analysis.couple_profile.compatibility_score,
        relationship_stage: analysis.couple_profile.relationship_stage,
        couple_description: analysis.couple_profile.description,
        couple_strengths: analysis.couple_profile.strengths,
        couple_challenges: analysis.couple_profile.challenges,
        conflict_points: analysis.couple_profile.conflict_points || [],
        resolution_path: analysis.couple_profile.resolution_path || [],
        partner1_name: analysis.partner_1.name,
        partner1_emoji: analysis.partner_1.emoji,
        partner1_needs: analysis.partner_1.needs || [],
        partner1_values: analysis.partner_1.values || [],
        partner1_attachment_style: analysis.partner_1.attachment_style,
        partner1_love_language: analysis.partner_1.love_language,
        partner1_personality: analysis.partner_1.personality || {},
        partner1_emotions: analysis.partner_1.emotions || {},
        partner1_communication_style: analysis.partner_1.communication_style,
        partner1_goals: analysis.partner_1.goals || [],
        partner1_subconscious_patterns: analysis.partner_1.subconscious_patterns || [],
        partner1_root_causes: analysis.partner_1.root_causes || [],
        partner1_strengths: analysis.partner_1.strengths,
        partner1_growth_areas: analysis.partner_1.growth_areas,
        partner2_name: analysis.partner_2.name,
        partner2_emoji: analysis.partner_2.emoji,
        partner2_needs: analysis.partner_2.needs || [],
        partner2_values: analysis.partner_2.values || [],
        partner2_attachment_style: analysis.partner_2.attachment_style,
        partner2_love_language: analysis.partner_2.love_language,
        partner2_personality: analysis.partner_2.personality || {},
        partner2_emotions: analysis.partner_2.emotions || {},
        partner2_communication_style: analysis.partner_2.communication_style,
        partner2_goals: analysis.partner_2.goals || [],
        partner2_subconscious_patterns: analysis.partner_2.subconscious_patterns || [],
        partner2_root_causes: analysis.partner_2.root_causes || [],
        partner2_strengths: analysis.partner_2.strengths,
        partner2_growth_areas: analysis.partner_2.growth_areas,
        communication_patterns: analysis.communication_patterns,
        insights: analysis.insights,
        model_used: 'claude-3-5-sonnet-20241022',
        tokens_used: {
          input: claudeData.usage.input_tokens,
          output: claudeData.usage.output_tokens
        }
      }).select().single();
      if (profileError) {
        console.error('Error saving profile:', profileError);
      } else {
        profileId = profileData?.id;
        // Insert scenarios with timeline
        if (profileId && analysis.scenarios) {
          const scenariosToInsert = analysis.scenarios.map((scenario)=>({
              profile_id: profileId,
              scenario_id: scenario.id,
              title: scenario.title,
              probability: scenario.probability,
              trend: scenario.trend,
              reasoning: scenario.reasoning,
              key_factors: scenario.key_factors,
              recommendations: scenario.recommendations,
              timeline: scenario.timeline || 'Not specified'
            }));
          const { error: scenariosError } = await supabase.from('scenarios').insert(scenariosToInsert);
          if (scenariosError) {
            console.error('Error saving scenarios:', scenariosError);
          }
        }
      }
    }
    // Return response
    return new Response(JSON.stringify({
      success: true,
      conversation_id: conversationId,
      profile_id: profileId,
      analysis,
      tokens_used: claudeData.usage,
      saved_to_database: !!conversationId
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});
