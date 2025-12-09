# Media243 Mobile

Media243 Mobile is a premium streaming application built with React Native and Expo. While **Media243** is the platform brand, the app features a sleek, dark-themed UI and user experience inspired by industry leaders like Netflix. It delivers a high-quality, immersive mobile entertainment experience optimized for modern streaming.

## 📱 Features

### Core Experience
*   **Media Billboard**: An immersive hero section on the home screen featuring top trending content with a cinematic bottom-up gradient.
*   **Content Browsing**: Horizontal scrolling rows for different categories (Trending, Popular, Top 10) with clean media cards.
*   **Top 10 Badge**: A signature stylized "Top 10" ranking badge for popular content.

### Navigation & Discovery
*   **Home Tab**: The main feed for discovering new content.
*   **Search Tab**: A dedicated search experience featuring a "Top Searches" list for quick access and a grid layout for results.
*   **Detail View**: comprehensive info pages for movies and shows, including metadata (match %, year, rating), play/download actions, and a "More Like This" grid.

### Personalized Hub ("My Media243")
*   **Profile Screen**: A unified hub displaying user details, quick actions (Notifications, Downloads), and a preview of the personal watchlist ("My List").
*   **My List**: A dedicated screen to manage saved movies and shows, presented in a clean 3-column grid layout.

### Technical & UI Highlights
*   **Dark Mode First**: Built with a "True Black" background (#000000) for OLED optimization and reduced eye strain.
*   **Media243 Red**: Uses the signature #E50914 red for primary actions and accents (inspired by Netflix's color palette).
*   **Netflix-Inspired UI**: Clean, immersive interface patterns and interactions modeled after Netflix's mobile experience.
*   **Haptic Feedback**: Meaningful tactile feedback on interactions using `expo-haptics`.
*   **Custom Typography**: A carefully tuned type system for readability and brand consistency.

## 🛠 Tech Stack

*   **Framework**: [React Native](https://reactnative.dev/) with [Expo SDK](https://expo.dev/).
*   **Navigation**: [React Navigation](https://reactnavigation.org/) (Native Stack & Bottom Tabs).
*   **Styling**: `StyleSheet` with a custom Design System (Colors, Typography, Spacing constants).
*   **Icons**: `react-native-vector-icons` (Ionicons).
*   **Gradients**: `expo-linear-gradient`.
*   **Video**: `expo-av` for content playback.

## 🚀 Getting Started

### Prerequisites
*   Node.js installed.
*   Expo Go app installed on your physical device OR an Android/iOS emulator set up.

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project folder.

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npx expo start
    ```

4.  **Run the app**:
    *   **Physical Device**: Scan the QR code with the Expo Go app (Android) or Camera app (iOS).
    *   **Emulator**: Press `a` for Android or `i` for iOS in the terminal.

## 📂 Project Structure

```
src/
├── components/      # Reusable UI components (NetflixRow, Billboard, Button, etc.)
├── constants/       # Design tokens (colors.js, typography.js, spacing.js)
├── contexts/        # Global state (AuthContext, MediaContext)
├── navigation/      # Navigation configuration (AppNavigation, BottomTabNavigator)
├── screens/         # Screen components (Home, Search, Detail, Profile, MyList, Auth)
└── services/        # API calls and data fetching logic
```

## 🤝 Contributing

This is a proprietary project for Media243. Please ensure you follow the existing design guidelines and code style when contributing.

---
*Built for the love of cinema. 🍿*
