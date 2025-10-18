// 12 Realms of Relational Self - Assessment Questions
// Based on Jungian psychology, attachment theory, Enneagram, and OCEAN model

export const assessmentIntro = {
  title: "The 12 Realms of Relational Self",
  subtitle: "A guided mirror of your conscious and unconscious ways of loving",
  description: `Step into The 12 Realms — a game that helps you understand how you feel and connect in relationships.`,
  emoji: "🪞"
}

export const realms = [
  {
    id: 1,
    name: "Realm of Archetypes",
    emoji: "🪞",
    theme: "Your unconscious love persona",
    description: "Jungian Shadow & Persona",
    color: "#ff00ff",
    questions: [
      {
        id: "archetypes_1",
        text: "In love, you often feel like:",
        type: "choice",
        options: [
          { value: "protector", label: "🦁 The Protector", emoji: "🦁" },
          { value: "free_spirit", label: "🦋 The Free Spirit", emoji: "🦋" },
          { value: "warrior", label: "⚔️ The Warrior", emoji: "⚔️" },
          { value: "healer", label: "🕊 The Healer", emoji: "🕊" },
          { value: "mystic", label: "🔮 The Mystic", emoji: "🔮" },
          { value: "rebel", label: "🐍 The Rebel", emoji: "🐍" }
        ]
      },
      {
        id: "archetypes_2",
        text: "Your shadow fear in love:",
        type: "choice",
        options: [
          { value: "losing_control", label: "Losing control" },
          { value: "being_invisible", label: "Being invisible" },
          { value: "being_trapped", label: "Being trapped" },
          { value: "being_abandoned", label: "Being abandoned" },
          { value: "being_wrong", label: "Being wrong" },
          { value: "being_too_much", label: "Being too much" }
        ]
      },
      {
        id: "archetypes_3",
        text: "Which image feels like your dynamic with a partner?",
        type: "visual",
        options: [
          { value: "entwined_vines", label: "Two entwined vines", emoji: "🌿" },
          { value: "dancing_flames", label: "Two flames dancing apart", emoji: "🔥" },
          { value: "tree_and_bird", label: "A tree and a bird", emoji: "🌳" },
          { value: "facing_mirrors", label: "Two mirrors facing each other", emoji: "🪞" }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Realm of Attachment",
    emoji: "💗",
    theme: "How you seek safety and closeness",
    description: "Attachment patterns and security needs",
    color: "#ff1493",
    questions: [
      {
        id: "attachment_1",
        text: "When your partner withdraws, your first impulse:",
        type: "choice",
        options: [
          { value: "pursue", label: "Pursue them" },
          { value: "withdraw", label: "Withdraw too" },
          { value: "freeze", label: "Freeze or go numb" },
          { value: "reflect", label: "Reflect and wait" }
        ]
      },
      {
        id: "attachment_2",
        text: "When conflict arises, what feels worst?",
        type: "choice",
        options: [
          { value: "disconnection", label: "Disconnection" },
          { value: "criticism", label: "Criticism" },
          { value: "pressure", label: "Pressure" },
          { value: "silence", label: "Silence" }
        ]
      },
      {
        id: "attachment_3",
        text: "Pick the image that feels most like home:",
        type: "visual",
        options: [
          { value: "cozy_cabin", label: "Cozy cabin", emoji: "🏡" },
          { value: "open_meadow", label: "Open meadow", emoji: "🌾" },
          { value: "locked_fortress", label: "Locked fortress", emoji: "🏰" },
          { value: "floating_island", label: "Floating island", emoji: "🏝️" }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Realm of Communication",
    emoji: "💬",
    theme: "How you express needs and handle conflict",
    description: "Gottman-style communication patterns",
    color: "#00ffff",
    questions: [
      {
        id: "communication_1",
        text: "When stressed, you tend to:",
        type: "choice",
        options: [
          { value: "criticize", label: "Criticize" },
          { value: "defend", label: "Defend" },
          { value: "shut_down", label: "Shut down" },
          { value: "appease", label: "Appease" },
          { value: "listen_reflect", label: "Listen & reflect" }
        ]
      },
      {
        id: "communication_2",
        text: "During arguments, what's your tone?",
        type: "choice",
        options: [
          { value: "passionate_intense", label: "Passionate & intense" },
          { value: "calm_detached", label: "Calm but detached" },
          { value: "warm_anxious", label: "Warm but anxious" },
          { value: "silent_resentful", label: "Silent & resentful" }
        ]
      },
      {
        id: "communication_3",
        text: "Which image feels like your typical fight?",
        type: "visual",
        options: [
          { value: "storm_lightning", label: "Storm & lightning", emoji: "⛈️" },
          { value: "ice_wall", label: "Ice wall", emoji: "🧊" },
          { value: "candles_wind", label: "Two candles in wind", emoji: "🕯️" },
          { value: "river_flow", label: "River finding flow", emoji: "🌊" }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Realm of Emotions",
    emoji: "🔥",
    theme: "Emotional literacy and regulation",
    description: "How you process and express feelings",
    color: "#ff6600",
    questions: [
      {
        id: "emotions_1",
        text: "How do you handle intense emotions?",
        type: "choice",
        options: [
          { value: "feel_fully", label: "Feel them fully" },
          { value: "rationalize", label: "Rationalize them" },
          { value: "suppress", label: "Suppress them" },
          { value: "express_art", label: "Express through art/action" }
        ]
      },
      {
        id: "emotions_2",
        text: "Which emotion dominates your relationships?",
        type: "choice",
        options: [
          { value: "longing", label: "Longing" },
          { value: "anger", label: "Anger" },
          { value: "fear", label: "Fear" },
          { value: "joy", label: "Joy" },
          { value: "guilt", label: "Guilt" }
        ]
      },
      {
        id: "emotions_3",
        text: "Choose an image that feels like your heart:",
        type: "visual",
        options: [
          { value: "ocean_wave", label: "Ocean wave", emoji: "🌊" },
          { value: "burning_sun", label: "Burning sun", emoji: "☀️" },
          { value: "mirror_lake", label: "Mirror lake", emoji: "🏞️" },
          { value: "locked_chest", label: "Locked chest", emoji: "🔒" }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Realm of Beliefs",
    emoji: "🧠",
    theme: "Core relationship scripts",
    description: "Your unconscious beliefs about love",
    color: "#9d00ff",
    questions: [
      {
        id: "beliefs_1",
        text: "Love means...",
        type: "choice",
        options: [
          { value: "safety", label: "Safety" },
          { value: "freedom", label: "Freedom" },
          { value: "growth", label: "Growth" },
          { value: "duty", label: "Duty" },
          { value: "passion", label: "Passion" }
        ]
      },
      {
        id: "beliefs_2",
        text: "The more I love someone...",
        type: "choice",
        options: [
          { value: "lose_myself", label: "...the more I lose myself." },
          { value: "become_stronger", label: "...the stronger I become." },
          { value: "they_leave", label: "...the more they'll leave." },
          { value: "grow_together", label: "...the more we'll grow together." }
        ]
      },
      {
        id: "beliefs_3",
        text: "Conflict means...",
        type: "choice",
        options: [
          { value: "danger", label: "Danger" },
          { value: "discovery", label: "Discovery" },
          { value: "distance", label: "Distance" },
          { value: "passion", label: "Passion" }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Realm of Values",
    emoji: "💎",
    theme: "What you protect and prioritize",
    description: "Your core relational values",
    color: "#00ff80",
    questions: [
      {
        id: "values_1",
        text: "Rank these from most to least important in love:",
        type: "ranking",
        options: [
          { value: "freedom", label: "Freedom" },
          { value: "loyalty", label: "Loyalty" },
          { value: "growth", label: "Growth" },
          { value: "peace", label: "Peace" },
          { value: "adventure", label: "Adventure" },
          { value: "stability", label: "Stability" }
        ]
      },
      {
        id: "values_2",
        text: "If forced to choose:",
        type: "choice",
        options: [
          { value: "truth_over_harmony", label: "Truth over harmony" },
          { value: "harmony_over_truth", label: "Harmony over truth" }
        ]
      }
    ]
  },
  {
    id: 7,
    name: "Realm of Identity",
    emoji: "🧩",
    theme: "Who you think you must be to be loved",
    description: "Your relational identity patterns",
    color: "#ff00ff",
    questions: [
      {
        id: "identity_1",
        text: "To be loved, I must be...",
        type: "choice",
        options: [
          { value: "strong", label: "Strong" },
          { value: "needed", label: "Needed" },
          { value: "perfect", label: "Perfect" },
          { value: "peaceful", label: "Peaceful" },
          { value: "inspiring", label: "Inspiring" },
          { value: "easygoing", label: "Easygoing" }
        ]
      },
      {
        id: "identity_2",
        text: "When I feel unseen, I...",
        type: "choice",
        options: [
          { value: "try_harder", label: "Try harder" },
          { value: "withdraw", label: "Withdraw" },
          { value: "get_angry", label: "Get angry" },
          { value: "go_quiet", label: "Go quiet" },
          { value: "create_drama", label: "Create drama" }
        ]
      }
    ]
  },
  {
    id: 8,
    name: "Realm of Purpose",
    emoji: "💫",
    theme: "Direction and growth in love",
    description: "Love's role in your life journey",
    color: "#00ffff",
    questions: [
      {
        id: "purpose_1",
        text: "Love's role in my life is to...",
        type: "choice",
        options: [
          { value: "ground_me", label: "Ground me" },
          { value: "awaken_me", label: "Awaken me" },
          { value: "heal_me", label: "Heal me" },
          { value: "challenge_me", label: "Challenge me" },
          { value: "inspire_me", label: "Inspire me" }
        ]
      },
      {
        id: "purpose_2",
        text: "Pick your path image:",
        type: "visual",
        options: [
          { value: "lighthouse", label: "Lighthouse", emoji: "🗼" },
          { value: "campfire", label: "Campfire", emoji: "🔥" },
          { value: "bridge", label: "Bridge", emoji: "🌉" },
          { value: "forest_trail", label: "Forest trail", emoji: "🌲" },
          { value: "sunrise", label: "Sunrise", emoji: "🌅" }
        ]
      }
    ]
  },
  {
    id: 9,
    name: "Realm of Love Language",
    emoji: "💞",
    theme: "How you express and receive love",
    description: "Your primary love languages",
    color: "#ff1493",
    questions: [
      {
        id: "love_language_1",
        text: "You feel most loved when your partner:",
        type: "choice",
        options: [
          { value: "touches_you", label: "Touches you" },
          { value: "listens_deeply", label: "Listens deeply" },
          { value: "helps_you", label: "Helps you" },
          { value: "gives_thoughtful", label: "Gives you something thoughtful" },
          { value: "spends_time", label: "Spends time with you" }
        ]
      },
      {
        id: "love_language_2",
        text: "You show love mostly by:",
        type: "choice",
        options: [
          { value: "doing_things", label: "Doing things for them" },
          { value: "affirmations", label: "Saying affirmations" },
          { value: "planning_experiences", label: "Planning experiences" },
          { value: "giving_affection", label: "Giving affection" }
        ]
      }
    ]
  },
  {
    id: 10,
    name: "Realm of Needs",
    emoji: "🧍",
    theme: "Fundamental emotional & relational needs",
    description: "Your core relationship needs",
    color: "#00ff80",
    questions: [
      {
        id: "needs_independence",
        text: "Need for independence",
        type: "slider",
        min: 1,
        max: 10,
        default: 5
      },
      {
        id: "needs_closeness",
        text: "Need for closeness",
        type: "slider",
        min: 1,
        max: 10,
        default: 5
      },
      {
        id: "needs_recognition",
        text: "Need for recognition",
        type: "slider",
        min: 1,
        max: 10,
        default: 5
      },
      {
        id: "needs_excitement",
        text: "Need for excitement",
        type: "slider",
        min: 1,
        max: 10,
        default: 5
      },
      {
        id: "needs_peace",
        text: "Need for peace",
        type: "slider",
        min: 1,
        max: 10,
        default: 5
      }
    ]
  },
  {
    id: 11,
    name: "Realm of Intelligences",
    emoji: "🪶",
    theme: "Dominant intelligence type in love",
    description: "How you process and express love",
    color: "#9d00ff",
    questions: [
      {
        id: "intelligences_1",
        text: "Pick what resonates most with how you love:",
        type: "choice",
        options: [
          { value: "verbal", label: "Verbal (words, conversation)" },
          { value: "emotional", label: "Emotional (feelings, empathy)" },
          { value: "bodily", label: "Bodily (touch, physical)" },
          { value: "musical", label: "Musical (rhythm, harmony)" },
          { value: "visual", label: "Visual (beauty, aesthetics)" },
          { value: "logical", label: "Logical (analysis, understanding)" },
          { value: "spiritual", label: "Spiritual (transcendence, meaning)" }
        ]
      }
    ]
  },
  {
    id: 12,
    name: "Realm of the Wounded Parts",
    emoji: "🌙",
    theme: "Healing the inner child & shadow",
    description: "Your childhood wounds and healing journey",
    color: "#ff00ff",
    questions: [
      {
        id: "wounded_1",
        text: "When a partner pulls away, the child inside you feels:",
        type: "choice",
        options: [
          { value: "scared", label: "Scared" },
          { value: "angry", label: "Angry" },
          { value: "empty", label: "Empty" },
          { value: "unworthy", label: "Unworthy" },
          { value: "calm", label: "Calm" }
        ]
      },
      {
        id: "wounded_2",
        text: "What hurt you most in childhood?",
        type: "choice",
        options: [
          { value: "rejection", label: "Rejection" },
          { value: "chaos", label: "Chaos" },
          { value: "control", label: "Control" },
          { value: "neglect", label: "Neglect" },
          { value: "invisibility", label: "Invisibility" }
        ]
      },
      {
        id: "wounded_3",
        text: "Choose an image that feels like your childhood home:",
        type: "visual",
        options: [
          { value: "warm_hearth", label: "Warm hearth", emoji: "🏠" },
          { value: "broken_window", label: "Broken window", emoji: "🪟" },
          { value: "empty_room", label: "Empty room", emoji: "🚪" },
          { value: "garden_wall", label: "Garden with high walls", emoji: "🏡" }
        ]
      }
    ]
  }
]

export const relationshipArchetypes = [
  {
    id: "phoenix_union",
    name: "The Phoenix Union",
    emoji: "🔥",
    theme: "Passion, transformation, rebirth",
    strengths: [
      "Magnetic chemistry, emotional depth, catalytic growth",
      "Brings unconscious material to light — both partners evolve rapidly"
    ],
    weaknesses: [
      "Cyclic volatility (breakup–makeup), emotional exhaustion",
      "Prone to power struggles and projection"
    ],
    conflictPoints: [
      "Fear of losing control vs. fear of abandonment",
      "Intensity mistaken for love"
    ],
    resolutionPath: [
      "Ground the fire with rituals of calm and routine",
      "Learn to express vulnerability without drama",
      "Transform through integration, not destruction"
    ]
  },
  {
    id: "garden_partnership",
    name: "The Garden Partnership",
    emoji: "🌿",
    theme: "Nurturing, safety, steady growth",
    strengths: [
      "Secure attachment, reliability, loyalty",
      "Excellent teamwork and mutual care"
    ],
    weaknesses: [
      "Risk of complacency and emotional stagnation",
      "Avoids conflict to preserve peace"
    ],
    conflictPoints: [
      "Unspoken resentments build under the surface",
      "Fear of change vs. need for excitement"
    ],
    resolutionPath: [
      "Introduce novelty and shared adventures",
      "Communicate needs early, even if uncomfortable",
      "Remember: harmony isn't silence"
    ]
  },
  {
    id: "mirror_connection",
    name: "The Mirror Connection",
    emoji: "🪞",
    theme: "Reflection, self-awareness, projection",
    strengths: [
      "High psychological insight, honest reflection",
      "Deep empathy and capacity for growth"
    ],
    weaknesses: [
      "Overanalysis, blurred boundaries, emotional exhaustion",
      "Can fall into 'therapist–client' roles"
    ],
    conflictPoints: [
      "Each feels unseen while analyzing the other",
      "Mirror becomes magnifier for insecurities"
    ],
    resolutionPath: [
      "Shift from analyzing to experiencing love",
      "Affirm individuality — 'I see you' without fixing",
      "Balance inner work with play and joy"
    ]
  },
  {
    id: "alchemical_bond",
    name: "The Alchemical Bond",
    emoji: "⚗️",
    theme: "Growth through contrast",
    strengths: [
      "Dynamic synergy between opposites",
      "Sparks innovation, expansion, adventure"
    ],
    weaknesses: [
      "Frequent polarity clashes; power imbalance",
      "Hard to rest in harmony"
    ],
    conflictPoints: [
      "Competing needs for control vs. freedom",
      "Difference mistaken for incompatibility"
    ],
    resolutionPath: [
      "Celebrate contrast as complementary",
      "Practice conscious negotiation instead of compromise",
      "'We are two elements, not two enemies.'"
    ]
  },
  {
    id: "nomadic_union",
    name: "The Nomadic Union",
    emoji: "🌍",
    theme: "Freedom, exploration, movement",
    strengths: [
      "Independence, curiosity, continuous evolution",
      "Non-possessive love, mutual respect for autonomy"
    ],
    weaknesses: [
      "Avoids depth or emotional confrontation",
      "Can feel lonely even together"
    ],
    conflictPoints: [
      "One seeks closeness, the other space",
      "Restlessness mistaken for lack of love"
    ],
    resolutionPath: [
      "Define freedom as trust, not distance",
      "Create anchor points (rituals, check-ins)",
      "Learn the art of staying still sometimes"
    ]
  },
  {
    id: "sacred_companionship",
    name: "The Sacred Companionship",
    emoji: "🌙",
    theme: "Spiritual intimacy, shared purpose",
    strengths: [
      "Soulful connection, deep empathy, compassion",
      "Shared mission or vision strengthens the bond"
    ],
    weaknesses: [
      "Can neglect physical and practical aspects of life",
      "Tendency to spiritualize conflict or bypass emotions"
    ],
    conflictPoints: [
      "Idealizing each other, disappointment when 'human' flaws appear",
      "Escaping pain with 'love and light' language"
    ],
    resolutionPath: [
      "Ground spirituality in embodiment",
      "Allow shadow and divinity to coexist",
      "Practice forgiveness as a sacred act"
    ]
  },
  {
    id: "artisan_pairing",
    name: "The Artisan Pairing",
    emoji: "🎨",
    theme: "Creativity, play, emotional expression",
    strengths: [
      "Inspires artistry, passion, spontaneity",
      "Brings color, laughter, and experimentation"
    ],
    weaknesses: [
      "Emotional volatility, unpredictability",
      "Difficulty maintaining consistency"
    ],
    conflictPoints: [
      "Chaos vs. containment",
      "Overexpression mistaken for authenticity"
    ],
    resolutionPath: [
      "Create creative containers (shared projects, rituals)",
      "Learn emotional regulation as artistic discipline",
      "Stability supports creativity, not hinders it"
    ]
  },
  {
    id: "fortress_alliance",
    name: "The Fortress Alliance",
    emoji: "🛡",
    theme: "Loyalty, structure, security",
    strengths: [
      "Solid, dependable, enduring",
      "High trust and mutual protection"
    ],
    weaknesses: [
      "Emotional distance, rigidity",
      "Resistance to vulnerability or change"
    ],
    conflictPoints: [
      "Duty replacing intimacy",
      "Suppressed emotion leading to coldness"
    ],
    resolutionPath: [
      "Redefine strength as openness",
      "Practice emotional sharing intentionally",
      "Let love be safe and alive"
    ]
  },
  {
    id: "garden_flame",
    name: "The Garden & Flame",
    emoji: "🌹",
    theme: "Passion meets peace",
    strengths: [
      "Balances excitement with security",
      "Mutual learning between opposites"
    ],
    weaknesses: [
      "Misaligned pace (one intense, one calm)",
      "Cycles of push–pull dynamic"
    ],
    conflictPoints: [
      "Passionate partner feels rejected; peaceful one feels overwhelmed",
      "Closeness becomes suffocating"
    ],
    resolutionPath: [
      "Synchronize rhythms intentionally",
      "Alternate between excitement and rest",
      "See difference as rhythm, not rejection"
    ]
  },
  {
    id: "odyssey_relationship",
    name: "The Odyssey Relationship",
    emoji: "⛵️",
    theme: "Evolving together through life stages",
    strengths: [
      "Lifelong growth, resilience, shared history",
      "Mature love that adapts to change"
    ],
    weaknesses: [
      "Risk of drifting apart as individuals evolve",
      "Overfocus on logistics or goals"
    ],
    conflictPoints: [
      "Growth speeds misaligned (one evolves faster)",
      "Neglecting emotional connection amid routine"
    ],
    resolutionPath: [
      "Schedule 'soul updates' — intentional re-alignments",
      "Value each version of your partner",
      "Remember: evolution requires reintroduction"
    ]
  },
  {
    id: "labyrinth_love",
    name: "The Labyrinth Love",
    emoji: "🌀",
    theme: "Shadow work, emotional depth",
    strengths: [
      "Extreme intimacy, emotional courage, psychological transformation",
      "Can heal deep trauma through love"
    ],
    weaknesses: [
      "Obsession, co-dependency, intensity fatigue",
      "Pain becomes identity"
    ],
    conflictPoints: [
      "Power struggles, emotional testing",
      "Addiction to drama"
    ],
    resolutionPath: [
      "Set emotional boundaries",
      "Seek therapy or healing container beyond the relationship",
      "Learn that peace is also depth"
    ]
  },
  {
    id: "celestial_union",
    name: "The Celestial Union",
    emoji: "✨",
    theme: "Maturity, acceptance, wholeness",
    strengths: [
      "Balanced, calm, deeply respectful love",
      "High emotional intelligence and communication"
    ],
    weaknesses: [
      "Can feel 'too calm' or lacking spark",
      "Risk of emotional complacency"
    ],
    conflictPoints: [
      "Underexpressed desire",
      "Conflict avoidance for the sake of peace"
    ],
    resolutionPath: [
      "Reignite play and sensuality",
      "Allow passion within safety",
      "Remember: harmony includes contrast"
    ]
  },
  {
    id: "pact_architect",
    name: "The Pact / Architect Relationship",
    emoji: "⚖️",
    theme: "Structure, shared vision, practicality",
    strengths: [
      "Strategic collaboration, reliability, success-oriented",
      "Strong foundation for family or business"
    ],
    weaknesses: [
      "Emotional neglect, over-intellectualization",
      "Love becomes management"
    ],
    conflictPoints: [
      "Duty eclipses desire",
      "Over-planning replaces spontaneity"
    ],
    resolutionPath: [
      "Schedule unplanned joy",
      "Express feelings, not just plans",
      "Balance efficiency with intimacy"
    ]
  },
  {
    id: "sanctuary_relationship",
    name: "The Sanctuary Relationship",
    emoji: "🕊",
    theme: "Healing, gentleness, safety",
    strengths: [
      "Tenderness, emotional repair, deep listening",
      "Ideal for trauma recovery and secure attachment building"
    ],
    weaknesses: [
      "Risk of codependency or stagnation",
      "Overidentification with the 'healer' role"
    ],
    conflictPoints: [
      "One partner becomes caretaker, the other dependent",
      "Fear of conflict disrupting peace"
    ],
    resolutionPath: [
      "Foster mutual empowerment, not rescue",
      "Encourage individuality within safety",
      "Love heals most when it liberates"
    ]
  }
]

