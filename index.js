import { AppRegistry, Text, TextInput, PixelRatio } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";

// Disable font scaling
if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.maxFontSizeMultiplier = 1;

if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;
TextInput.defaultProps.maxFontSizeMultiplier = 1;

// 🔑 Prevent "Display size" from affecting text scaling
const defaultFontScale = PixelRatio.getFontScale();
if (defaultFontScale !== 1) {
  const _getFontScale = PixelRatio.getFontScale;
  PixelRatio.getFontScale = () => 1; // always return 1
}

// Foreground handler
messaging().onMessage(async (remoteMessage) => {
  PushNotification.localNotification({
    channelId: "praful_channel",
    title: remoteMessage.notification?.title,
    message: remoteMessage.notification?.body || "You have a new message",
  });
});

// Background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  PushNotification.localNotification({
    channelId: "praful_channel",
    title: remoteMessage.notification?.title,
    message: remoteMessage.notification?.body || "Background message",
  });
});

AppRegistry.registerComponent(appName, () => App);
