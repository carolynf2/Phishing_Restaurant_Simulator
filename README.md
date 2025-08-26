# 🍽️ Phishing Restaurant Simulator

A fast-paced, colorful game where players manage a virtual restaurant serving "phishing emails" as suspicious dishes to customers (employees). Players must quickly identify which meals are safe to serve and which are poisoned with social engineering tactics.

## 🎮 Game Features

- **Fast-paced restaurant management** - Serve customers quickly before they get impatient
- **Email dishes system** - Phishing emails served as restaurant meals with different difficulty levels
- **Customer patience mechanic** - Each customer has limited patience, adding time pressure
- **Speed and accuracy scoring** - Earn points for correct decisions and speed bonuses
- **Progressive difficulty** - Easy, Medium, and Hard difficulty levels with different phishing ratios
- **Chef progression system** - Advance from Trainee to Master Chef based on performance
- **Achievement system** - Unlock achievements for various accomplishments

## 🚀 How to Play

1. Open `index.html` in your web browser
2. Click "START SHIFT" to begin your restaurant shift
3. Customers will order "email dishes" - read each email carefully
4. Decide quickly:
   - **SERVE** ✅ - If the email is legitimate and safe
   - **REJECT** 🚫 - If the email is a phishing attempt
5. Watch the customer patience bar - don't let them get too impatient!
6. Earn points for correct decisions with speed bonuses
7. Avoid mistakes - you only have 3 lives per shift!

## 🍳 Game Mechanics

### Scoring System
- **Correct Decision**: +10 points + speed bonus (up to +5)
- **Wrong Decision**: -5 points + lose a life
- **Timeout**: Lose a life when customer gets impatient

### Difficulty Levels
- **Easy Chef** 👶: 70% phishing emails (easier to spot)
- **Head Chef** 👨‍🍳: 50% phishing emails (balanced mix)
- **Master Chef** 👑: 30% phishing emails (more legitimate emails, harder to spot fakes)

### Speed Settings
- **Slow**: 8 seconds per customer
- **Normal**: 6 seconds per customer  
- **Fast**: 4 seconds per customer

## 🚨 Phishing Indicators to Watch For

- **Urgent or threatening language** - "Account will be closed!", "Immediate action required!"
- **Suspicious sender addresses** - Domains that don't match the claimed organization
- **Requests for personal information** - Passwords, SSNs, bank details
- **Too-good-to-be-true offers** - Lottery winnings, huge refunds
- **Poor grammar and spelling** - Unprofessional writing quality
- **Artificial deadlines** - Pressure to act within hours

## 🏆 Chef Progression

Advance through chef levels based on your best score:
- **Trainee** 👶 (0+ points)
- **Line Cook** 🍳 (100+ points)
- **Sous Chef** 🔥 (200+ points)
- **Head Chef** 👨‍🍳 (500+ points)
- **Master Chef** 👑 (1000+ points)

## 🎯 Sample "Dishes" (Email Types)

### Safe Emails 😊
- Company newsletters and announcements
- Meeting invitations from internal systems
- Legitimate IT maintenance notifications
- Official HR communications

### Phishing Emails ⚠️
- **Easy**: Obvious lottery scams, urgent account closures
- **Medium**: PayPal impersonations, fake security updates
- **Hard**: Sophisticated Microsoft/IRS impersonations with realistic details

## 🎨 Visual Design

- **Colorful restaurant theme** with bright, playful colors
- **Customer patience visualization** with animated progress bars
- **Immediate visual feedback** for correct/incorrect decisions
- **Achievement celebrations** with animated notifications
- **Responsive design** for desktop and mobile play

## 🔧 Technical Features

- Pure HTML, CSS, and JavaScript (no frameworks required)
- Local storage for game progress and statistics
- Configurable difficulty and speed settings
- Real-time scoring and accuracy tracking
- Pause/resume functionality

## 📁 File Structure

```
phishing-restaurant-simulator/
├── index.html          # Main game interface
├── css/
│   └── style.css       # Colorful restaurant styling
├── js/
│   └── game.js         # Game logic and mechanics
├── assets/             # (Future: images, sounds)
└── README.md           # This file
```

## 🎓 Educational Value

- **Teaches phishing recognition** through gamified repetition
- **Builds pattern recognition** for suspicious emails
- **Emphasizes speed and accuracy** like real-world email processing
- **Covers various attack types** from obvious to sophisticated
- **Reinforces cybersecurity awareness** in a fun, engaging way

## 🏅 Achievements

- **Service Star**: Serve 10+ customers in one shift
- **High Score**: Earn 200+ points in a single game
- **Accuracy Expert**: Maintain 90%+ accuracy with 5+ decisions
- **Speed Demon**: Serve 20+ customers in one shift

## 🔮 Future Enhancements

- **Multiplayer mode** - Compete with other chefs
- **Daily challenges** - Special themed email sets
- **More email types** - SMS, social media, instant messages
- **Restaurant upgrades** - Unlock new themes and customizations
- **Sound effects** - Kitchen sounds and customer reactions
- **Mobile app version** - Native iOS/Android versions

---

**Developed to make cybersecurity education fun and engaging through restaurant simulation gameplay!**