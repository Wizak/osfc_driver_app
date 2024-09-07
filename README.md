# OSFC Driver App

This is the official OSFC Driver App, built with React Native using Expo. The app helps drivers manage their tasks and routes efficiently.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Debugging Builds](#debugging-builds)
- [Preview Mode](#preview-mode)
- [Build & Deployment](#build--deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Requirements

To run and build the project, ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (`npm install -g expo-cli`)
- [npm](https://www.npmjs.com/)

For iOS development, you need:

- [Xcode](https://developer.apple.com/xcode/) (for running the iOS simulator)

For Android development, you need:

- [Android Studio](https://developer.android.com/studio) (for running the Android emulator)

### Additional Tools

- [Expo EAS CLI](https://docs.expo.dev/eas-update/getting-started/) (`npm install -g eas-cli`)
- [Expo Dev Client](https://docs.expo.dev/versions/latest/sdk/dev-client/) (`npx expo install expo-dev-client`)
- [expo-doctor](https://www.npmjs.com/package/expo-doctor) (`npm install -g expo-doctor`)

## Installation

1. Move to working dir:

   ```bash
   cd osfc_driver_app
   ```

2. Install dependencies using npm:

   ```bash
   npm install
   ```

3. Run `expo-doctor` to ensure your environment is correctly set up:

   ```bash
   npx expo-doctor
   ```

## Running the App

You can run the app on your local development environment either using physical devices or emulators/simulators.

### Running on an Android Emulator

1. Make sure you have Android Studio installed and set up.
2. Start the Android Emulator from Android Studio.
3. In the project root, run the following command:

   ```bash
   npx expo start --android
   ```

### Running on an iOS Simulator (Mac only)

1. Make sure you have Xcode installed.
2. Start the iOS Simulator from Xcode.
3. In the project root, run the following command:

   ```bash
   npx expo start --ios
   ```

### Running on a Physical Device

1. Install the Expo Go app from [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [Apple App Store](https://apps.apple.com/us/app/expo-go/id982107779).
2. Run the app on your device by scanning the QR code generated after running:

   ```bash
   npx expo start
   ```

## Debugging Builds

For debugging your builds, you can use Expo Dev Client and EAS:

1. Install the Expo Dev Client:

   ```bash
   eas build --profile development --platform <android|ios>
   ```

2. You can also use the Expo Dev Client for debugging specific builds locally:

   ```bash
   npx expo start --dev-client
   ```

3. For ensuring a correct setup across environments, you can use the `expo-doctor` command:

   ```bash
   npx expo-doctor
   ```

4. You can debug custom native code with the Expo Dev Client.

## Preview Mode

Preview Mode allows you to test the app as if it were in production. This can be done without needing to fully build or deploy the app.

1. Start your app in preview mode by running:

   ```bash
   expo start --no-dev --minify
   ```

2. This will disable development features such as error overlays and logs, giving you a better sense of how the app will behave in production.

## Build & Deployment

To build the project for production:

1. Build the Android APK or AAB:

   ```bash
   eas build --platform android
   ```

2. Build the iOS IPA (requires a macOS environment):

   ```bash
   eas build --platform ios
   ```

To publish the app, use the following command:

```bash
npx expo publish
```

## Project Structure

The project is structured as follows:

```
├── .expo               # Expo project settings
├── .vscode             # VSCode specific settings
├── %ProgramData%       # Windows program data
├── assets              # Static assets (images, fonts, etc.)
├── node_modules        # Project dependencies
├── scripts             # Helper and utility scripts
├── src                 # Source code (components, views, etc.)
├── translations        # Translation files
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── .prettierrc         # Prettier configuration file
├── App.js              # Main app entry point
├── app.json            # Expo configuration
├── babel.config.js     # Babel configuration
├── eas.json            # EAS configuration file
├── package-lock.json   # NPM lock file
├── package.json        # Project dependencies and scripts
```
