// Supabase Edge Function: Assess Conversation Quality
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
serve(async (req)=>{
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    const { conversation } = await req.json();
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
    const charCount = conversation.length;
    const wordCount = conversation.split(/\s+/).filter((w)=>w.length > 0).length;
    const lineCount = conversation.split('\n').filter((l)=>l.trim().length > 0).length;
    let badge = 'novice';
    let badgeColor = '#ff0055';
    let badgeMessage = 'Your conversation is too brief for deep analysis';
    let needsQuestions = true;
    if (charCount >= 2000) {
      badge = 'grandmaster';
      badgeColor = '#ff00ff';
      badgeMessage = 'Exceptional conversation depth!';
      needsQuestions = false;
    } else if (charCount >= 1000) {
      badge = 'master';
      badgeColor = '#00ffff';
      badgeMessage = 'Excellent conversation quality!';
      needsQuestions = false;
    } else if (charCount >= 500) {
      badge = 'adept';
      badgeColor = '#00ff80';
      badgeMessage = 'Great conversation depth!';
      needsQuestions = false;
    } else if (charCount >= 200) {
      badge = 'apprentice';
      badgeColor = '#ff6600';
      badgeMessage = 'Good start! A bit more context would help';
      needsQuestions = true;
    }
    return new Response(JSON.stringify({
      success: true,
      badge,
      badge_color: badgeColor,
      message: badgeMessage,
      needs_questions: needsQuestions,
      char_count: charCount,
      word_count: wordCount,
      line_count: lineCount
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
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
