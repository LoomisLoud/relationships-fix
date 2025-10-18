# VEO3 Video Generation Prompts for Parallel Realities

This document contains the cinematic video prompts used to generate visual representations of each possible relationship future using VEO3 AI video generation.

## Video Specifications
- **Duration**: 30 seconds
- **Aspect Ratio**: 16:9 (widescreen)
- **Style**: Cinematic
- **Resolution**: 1080p minimum
- **Mood**: Varies by scenario (see below)

---

## 1. Deepening Connection (35% Probability - Positive Trend)

### VEO3 Prompt:
```
A loving couple in their cozy home, having deep conversations over coffee, laughing together, holding hands while walking in a park at sunset, sharing intimate moments, growing closer over time. Warm lighting, romantic atmosphere, genuine connection visible in their eyes. Cinematic, heartwarming, uplifting mood.
```

### Visual Elements:
- Warm golden hour lighting
- Intimate close-ups of hands touching, eye contact
- Cozy home interior with soft lighting
- Park sunset scene with silhouettes
- Genuine smiles and laughter
- Progressive closeness throughout video

### Color Palette:
- Warm oranges and yellows
- Soft pinks and golds
- Natural earth tones

### Mood: Heartwarming, Uplifting, Romantic

---

## 2. Comfortable Plateau (25% Probability - Neutral Trend)

### VEO3 Prompt:
```
A couple in their daily routine, comfortable but predictable. Morning coffee, work, dinner, TV. Peaceful but lacking excitement. Neutral expressions, familiar patterns, stable but stagnant. Soft lighting, calm atmosphere, neither growing nor declining. Cinematic, contemplative mood.
```

### Visual Elements:
- Repetitive daily routines
- Side-by-side but not deeply engaged
- Comfortable but not passionate
- Neutral facial expressions
- Familiar domestic scenes
- Calm, predictable movements

### Color Palette:
- Muted blues and grays
- Soft neutrals
- Desaturated tones

### Mood: Contemplative, Calm, Stable

---

## 3. Growth Through Challenge (20% Probability - Positive Trend)

### VEO3 Prompt:
```
A couple facing challenges together - difficult conversations, moments of tension, but then breakthrough moments of understanding. Supporting each other through stress, celebrating small victories, emerging stronger. Dynamic lighting, emotional intensity, triumph over adversity. Cinematic, inspiring, powerful mood.
```

### Visual Elements:
- Dramatic lighting shifts (dark to light)
- Tense body language transitioning to embrace
- Difficult conversation scenes
- Support and comfort moments
- Victory celebrations (small but meaningful)
- Physical closeness after resolution

### Color Palette:
- Dramatic contrasts
- Dark blues and purples transitioning to warm yellows
- High contrast lighting

### Mood: Inspiring, Powerful, Triumphant

---

## 4. Gradual Drift (15% Probability - Negative Trend)

### VEO3 Prompt:
```
A couple growing distant over time. Sitting together but on separate phones, conversations becoming shorter, less eye contact, sleeping turned away from each other, separate activities. Cool lighting, melancholic atmosphere, visible emotional distance. Cinematic, somber, cautionary mood.
```

### Visual Elements:
- Physical distance increasing
- Screens creating barriers
- Averted gazes, no eye contact
- Separate beds or turned away
- Individual activities, no shared moments
- Increasing physical space between partners

### Color Palette:
- Cool blues and grays
- Desaturated colors
- Shadows and low light

### Mood: Somber, Melancholic, Cautionary

---

## 5. Transformation & Renewal (5% Probability - Positive Trend)

### VEO3 Prompt:
```
A couple experiencing transformation - attending therapy together, trying new activities, having breakthrough conversations, rediscovering each other, renewing vows or commitment. Dramatic lighting shift from dark to bright, metamorphosis theme, rebirth of love. Cinematic, hopeful, transformative mood.
```

### Visual Elements:
- Therapy/counseling scenes
- New shared activities (dancing, travel, hobbies)
- Breakthrough emotional moments
- Vow renewal or commitment ceremony
- Before/after contrast
- Metamorphosis visual metaphors (butterfly, sunrise)

### Color Palette:
- Dark to light progression
- Purple and magenta (transformation)
- Bright whites and golds (renewal)
- Rainbow gradients

### Mood: Hopeful, Transformative, Inspiring

---

## Technical Implementation

### API Integration Example:

```javascript
const generateVideo = async (futureScenario) => {
  const response = await fetch('https://api.veo3.ai/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${VEO3_API_KEY}`
    },
    body: JSON.stringify({
      prompt: futureScenario.videoPrompt,
      duration: 30,
      aspect_ratio: '16:9',
      style: 'cinematic',
      resolution: '1080p',
      fps: 24,
      seed: Math.floor(Math.random() * 1000000)
    })
  })
  
  const data = await response.json()
  return data.video_url
}
```

### Video Player Integration:

Videos should be displayed in a modal or dedicated player with:
- Full-screen capability
- Replay option
- Download option
- Share functionality
- Scenario title and description overlay

---

## Usage Notes

1. **Personalization**: These prompts can be customized based on:
   - Specific relationship details from conversation analysis
   - Cultural context
   - Age and life stage
   - Relationship type (romantic, family, business)

2. **Ethical Considerations**:
   - Videos should be presented as possibilities, not predictions
   - Include disclaimer about AI-generated content
   - Emphasize that outcomes depend on actions taken

3. **Performance**:
   - Generate videos on-demand (not pre-generated)
   - Cache generated videos for 24 hours
   - Show loading state during generation (3-5 minutes typical)

4. **Quality Control**:
   - Review generated videos for appropriateness
   - Regenerate if quality is poor
   - Allow users to request regeneration

---

## Future Enhancements

- Add user-specific details to prompts (names, locations, specific situations)
- Generate multiple video variations per scenario
- Create longer-form videos (60-90 seconds)
- Add voiceover narration
- Include interactive decision points
- Generate comparison videos showing different paths

---

*Last Updated: 2025-10-18*

