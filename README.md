# Lendsqr News
The project includes a login page that requires users login with a Google account to access the news page, a sign up page for users who do not have an account, a news page with current news listings (a placeholder api was used because the provided rapidapi was no longer accessible) and a profile page that has details about the developer where users can also logout

## Steps in implementation
I created an error boundary screen that is displayed when the app crashes to improve user experience and also reported all crashes using Firebase Crashlytics.
I implemented Google signin with support of Firebase Authentication.
I used Firebase Performance to trace the slow rendering screens and api fetching performance.
I used Firebase Analytics to track user interactions and events around the application
I implemented Firebase messaging to send push notifications to users

## Technologies used
Firebase services including

# Getting Started

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
