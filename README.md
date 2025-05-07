# Journal Native

Journal Native is a hobby project turned public, offering a secure, mobile-only platform for journaling. With its sleek, modern UI, the app makes it easy to write and store your personal entries, allowing you to relive cherished memories whenever you want. Built with care, it ensures your thoughts are safely preserved and accessible on the go.

## Features

- **Secure Storage**: Journal entries are safely stored in a secure cloud.
- **Mobile-Only Experience**: Optimized for iOS and Android with a modern UI.
- **User Authentication**: Log in to protect and access your personal journals.
- **Haptic Feedback**: Enhances interaction with tactile responses.
- **Journal Management**: Easily create, store, and retrieve entries to revisit memories.

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: Tailwind CSS (NativeWind), GlueStack UI
- **Navigation**: Expo Router
- **Build Tools**: Expo CLI, Metro Bundler
- **Haptic Feedback**: expo Haptics

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/04amanrajj/journal-native.git
   cd journal-native
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the App**:

   ```bash
   npx expo start
   ```

4. **Build for Production**:
   Use EAS for building and deploying:
   ```bash
   eas build -p android
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for bug fixes, features, or improvements. Ensure code follows the existing TypeScript and Tailwind conventions.

## Upcoming features

🔹 Simple Features

- Search Journals – Allow users to search their past entries by keyword or date.

- Dark Mode Toggle – For better reading/writing comfort at night.

- Auto-save Drafts – Saves the journal even if the app is accidentally closed.

- Date Picker – Let users pick a past date to write or edit an entry.

- Mood Tagging – Add a dropdown or icons (happy, sad, neutral) for daily mood.

- Word Count/Character Count – Display live count at the bottom of the text input.

- Edit/Delete Entries – Basic entry management options.

- Loading Skeletons or Spinners – Improves UI/UX while data is being fetched.

🔸 Medium Complexity Features

- User Authentication with Token Expiry Notification – Improve session handling and UX.

- Reminders/Notifications – Ask user: “Did you journal today?” at custom times.

- Export to PDF or TXT – Let users export selected journal entries.

- Media Attachments – Allow attaching images or audio recordings to an entry.

- Offline Support – Store data locally with sync when back online (using AsyncStorage or SQLite)

- Sentiment Analysis (Optional API) – Analyze the mood of a journal using AI.

- Pull to Refresh – On entry list screens.

🔺 Advanced Features

- Markdown Support – Let users format their entries (bold, italic, headers).

- Encrypted Storage – Secure entries with device-based encryption.

- Streak Tracker / Progress Calendar – Like GitHub contributions chart.

- Voice-to-Text – Let users dictate their journal entries.

- Multi-device Sync – Save and sync data using your backend + JWT auth.

- Theme Customizer – Let users pick fonts, sizes, and colors for writing comfort.

## Credits

**Made by Aman with ❤️**
