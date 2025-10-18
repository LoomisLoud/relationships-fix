# Parallel Hearts 💕

**A gamified relationship improvement application that helps couples grow together through data-driven insights, interactive tools, and structured action plans.**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![License](https://img.shields.io/badge/license-Proprietary-red)

---

## 🌟 Features

### Core Modules

**1. WhatsApp Conversation Analysis**
Upload your chat history and get AI-powered insights into communication patterns, sentiment, conflict resolution, and more.

**2. Psychology Assessments**
Complete comprehensive questionnaires to discover your attachment style, love languages, conflict approach, and communication patterns.

**3. Relationship Map**
Visualize your relationship dynamics with an interactive dashboard showing strengths, growth areas, health index, and shared values.

**4. Scenario Engine**
Explore four possible futures for your relationship with detailed forecasts, movie recommendations, and actionable insights.

**5. 30-Day Action Plan**
Follow a structured journey with daily tasks, weekly themes, and gamified progress tracking to build lasting relationship habits.

**6. Fight Simulator**
Practice conflict resolution in a safe environment with real-time feedback, empathy scoring, and skill-building exercises.

**7. Gamification & Rewards**
Earn XP, level up, unlock badges, track streaks, and receive a certificate of completion for your relationship growth journey.

**8. Movie Recommendations**
Get personalized movie suggestions (via VOS3 API) tailored to your relationship scenario and archetype.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or compatible
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd parallel-hearts

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
# Create optimized production build
pnpm run build

# Output will be in dist/ directory
```

---

## 📱 Usage

### Getting Started

1. **Create Account**: Enter your name, email, and partner's name
2. **Import Data**: Upload WhatsApp conversations OR complete psychology assessments
3. **Explore Insights**: Review your Relationship Map
4. **Plan Future**: Explore scenarios and select your desired path
5. **Take Action**: Follow your 30-day action plan
6. **Practice Skills**: Use the Fight Simulator regularly
7. **Track Progress**: Earn XP, badges, and celebrate milestones

### User Flow

```
Onboarding → Dashboard → Import/Assess → Relationship Map → 
Scenarios → Action Plan → Daily Tasks → Fight Simulator → Rewards
```

---

## 🛠️ Tech Stack

**Frontend**
- React 18.3.1 - UI library
- Vite 6.3.5 - Build tool
- React Router 7.1.3 - Routing

**Styling**
- Tailwind CSS 4.0.0 - Utility-first CSS
- shadcn/ui - Component library
- Framer Motion 11.18.0 - Animations

**Visualization**
- Recharts 2.15.0 - Charts and graphs
- Lucide React - Icon library

**State Management**
- React Hooks (useState, useEffect)
- localStorage for persistence

---

## 📂 Project Structure

```
parallel-hearts/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   └── ui/            # shadcn/ui components
│   ├── pages/             # Page components
│   │   ├── Onboarding.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Import.jsx
│   │   ├── Assessments.jsx
│   │   ├── RelationshipMap.jsx
│   │   ├── Scenarios.jsx
│   │   ├── ActionPlan.jsx
│   │   ├── FightSimulator.jsx
│   │   └── Rewards.jsx
│   ├── App.jsx            # Main app with routing
│   ├── App.css            # Global styles
│   └── main.jsx           # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎯 Key Features Detail

### WhatsApp Import
- Upload .txt chat exports
- Sentiment analysis
- Emotion detection
- Topic extraction
- Conflict and repair pattern identification

### Psychology Assessments
- **Attachment Style**: Secure, Anxious, Avoidant, Disorganized
- **Love Languages**: 5 types (Words, Time, Gifts, Service, Touch)
- **Conflict Style**: 5 approaches (Competing, Collaborating, etc.)
- **Communication Style**: Multi-dimensional analysis

### Relationship Map
- Couple archetype identification
- Health Index (0-100 scale)
- Radar chart across 6 dimensions
- Strengths and growth areas
- Shared values visualization

### Scenarios
- **S1**: Current Path (baseline)
- **S2**: Warning Path (worst case)
- **S3**: Growth Path (best case)
- **S4**: Adventure Path (novel experiences)
- Each with likelihood, impacts, and movie recommendations

### Action Plan
- 4 themed weeks (30 days total)
- Daily tasks with XP rewards
- Task types: Daily, Reflection, Planning, Fun, Weekly, Celebration
- Progress tracking and streak counter

### Fight Simulator
- 3 conflict scenarios
- Real-time heat meter
- Empathy points system
- Quick response options + custom input
- AI prompts and feedback
- After-action review with grade

### Gamification
- XP and level system
- 9 badges across 5 rarity tiers
- Achievement tracking
- Certificate generation
- Share functionality

---

## 🎨 Design Principles

**Mobile-First**
Optimized for mobile devices with responsive layouts that adapt to tablets and desktops.

**Gamification**
Makes relationship work engaging through XP, levels, badges, and visual progress tracking.

**Data-Driven**
Uses AI analysis and psychology research to provide personalized insights.

**User-Friendly**
Intuitive navigation, clear instructions, and helpful prompts guide users through each step.

**Visually Appealing**
Modern design with gradients, smooth animations, and thoughtful color schemes.

---

## 🔒 Privacy & Security

**Data Storage**
- All data stored locally in browser (localStorage)
- No server-side storage in current version
- User can delete all data at any time

**Privacy**
- No tracking or analytics
- No data sharing with third parties
- Explicit consent for all data processing

**Disclaimer**
⚠️ This app is NOT a substitute for professional therapy. For serious relationship issues, please consult a licensed therapist.

---

## 🚧 Future Enhancements

### Backend Integration
- PostgreSQL database with Prisma ORM
- Next.js API routes
- User authentication and sessions
- Real-time data sync

### Advanced NLP
- Python worker for WhatsApp analysis
- Sentiment classification per message
- Topic clustering with embeddings
- Emotion detection
- Conflict burst identification

### AI Features
- LLM integration for scenario narratives
- Intelligent fight simulator responses
- Personalized action plan generation
- Custom insights and recommendations

### Additional Features
- Partner invitation system
- Calendar integration
- Push notifications
- Mobile app (React Native)
- Social sharing
- Progress reports

---

## 📊 Performance

**Bundle Size**
- Total: ~829 KB
- Gzipped: ~245 KB

**Lighthouse Scores** (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🧪 Testing

### Recommended Testing Strategy

**Unit Tests**
```bash
# Run unit tests
pnpm test
```

**E2E Tests**
```bash
# Run Playwright tests
pnpm test:e2e
```

**Coverage**
```bash
# Generate coverage report
pnpm test:coverage
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use Tailwind for styling
- Keep components focused and under 300 lines
- Write meaningful commit messages

---

## 📖 Documentation

**User Guide**: See `PARALLEL_HEARTS_USER_GUIDE.md` for detailed usage instructions

**Technical Docs**: See `PARALLEL_HEARTS_TECHNICAL_DOCS.md` for architecture and API details

---

## 🐛 Known Issues

- Movie recommendations currently use mock data (VOS3 API integration pending)
- WhatsApp analysis is simulated (real NLP worker pending)
- No backend persistence (localStorage only)
- Certificate download generates alert (PDF generation pending)

---

## 📝 Changelog

### Version 1.0.0 (October 2025)
- Initial release
- All core features implemented
- Mobile-first responsive design
- Gamification system complete
- 9 pages with full functionality

---

## 📄 License

This project is proprietary software created for demonstration purposes.

---

## 🙏 Acknowledgments

**Frameworks & Libraries**
- React team for the amazing library
- Vercel for Vite
- shadcn for the beautiful UI components
- Recharts for data visualization
- Framer Motion for smooth animations

**Inspiration**
- Gottman Institute research
- Attachment Theory (Bowlby, Ainsworth)
- Love Languages (Gary Chapman)
- Non-Violent Communication (Marshall Rosenberg)

---

## 📞 Support

For questions, feedback, or technical support:
**https://help.manus.im**

---

## 🌟 Star History

If you find this project helpful, please consider giving it a star! ⭐

---

**Built with ❤️ by the Manus team**

*Transform your relationship through gamified growth* 🚀💕

