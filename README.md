# Life OS Gym — React Native App

A premium offline-first fitness tracking app built with React Native + Expo.

## Features
- 🏠 **Dashboard** — Streak, BMI, today's workout CTA, quick stats
- 💪 **Today** — Full workout logging with sets/reps/kg for strength; smart contextual fields for cardio (duration, speed, incline, pace, etc.)
- 📋 **Plan** — 4-week rotating program (Standard / Intense), Week A & B schedules
- 📚 **Library** — 30+ exercises with animated GIFs, muscle tags, step-by-step instructions, pro tips
- 🥗 **Nutrition** — Auto-calculated macros, meal timing, protein sources
- 📈 **Progress** — Weight logging, BMI tracking, visual bar chart
- 👤 **Profile** — Edit metrics, switch plans, reset data

## Cardio Exercise Smart Fields
Each cardio type shows contextual input fields:
- **Treadmill/Run** → Duration, Speed (km/h), Incline (%), Distance (km)
- **Cycling** → Duration, Cadence (rpm), Resistance, Distance (km)
- **HIIT / Battle Ropes** → Rounds, Work (sec), Rest (sec), Peak HR
- **Jump Rope** → Duration, Sets, Sec/Set, Style
- **Walk** → Duration, Distance, Pace (min/km), Steps
- **General** → Duration, Rounds, Rest, Notes

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (iOS / Android)

### Install
```bash
cd life-os-mobile
npm install
npx expo start
```

Scan the QR code with Expo Go to run on your device.

### Build for Production
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## Project Structure
```
life-os-mobile/
├── App.tsx                  # Root navigator + onboarding gate
├── app.json                 # Expo config
├── package.json
├── src/
│   ├── screens/
│   │   ├── DashboardScreen.js
│   │   ├── TodayScreen.js      ← Smart cardio fields
│   │   ├── PlanScreen.js
│   │   ├── LibraryScreen.js    ← Exercise images + details
│   │   ├── NutritionScreen.js
│   │   ├── ProgressScreen.js
│   │   └── ProfileScreen.js
│   ├── data/
│   │   ├── workouts.js         ← Workout programs + cardio field configs
│   │   └── library.js          ← 30+ exercises with GIF URLs + instructions
│   ├── hooks/
│   │   └── useAppState.js      ← Global state management
│   └── utils/
│       ├── storage.js          ← AsyncStorage helpers
│       └── theme.js            ← Colors, fonts, shared styles
└── assets/
    └── placeholder.png
```

## Tech Stack
- React Native + Expo SDK 50
- React Navigation (bottom tabs + stack)
- AsyncStorage for offline persistence
- Expo StatusBar, Expo Font

## Customisation
- **Add exercises**: Edit `src/data/library.js`
- **Add workout days**: Edit `src/data/workouts.js`
- **Add cardio types**: Add to `CARDIO_FIELDS` in `workouts.js` and `getCardioType()` function
- **Change theme**: Edit `src/utils/theme.js`
