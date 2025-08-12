import PushNotification from "react-native-push-notification";
import { image } from "./base64Images";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

const notifiedOrders = new Set();

export const handleNotification = (message?: string, title?: string, orderId?: string) => {
    if (!orderId || notifiedOrders.has(orderId)) {
        return;
    }

    PushNotification.localNotification({
        channelId: 'teja-organics',
        message: message,
        title: title,
        smallIcon: "ic_launcher",
        repeatType: "day",
        invokeApp: true,
        vibrate: true,
        vibration: 200,
        image: 'base64Image',
        color: "green",
    });
};


export const scheduleNotification = (message?: string, title?: string, orderId?: string) => {
    if (!orderId || notifiedOrders.has(orderId)) {
        return;
    }
    PushNotificationIOS.scheduleLocalNotification({
        fireDate: new Date().getTime() + 3000,
        alertTitle: title,
        alertBody: message?.toString() ? message.toString() : '-',
        userInfo: { notificationId: orderId },
        image: "app_logo"
    });
};
export const handleCancelNotification = (message?: string, title?: string, orderId?: string) => {
    PushNotification.localNotification({
        channelId: 'channel_name',
        message: message,
        title: title,
        smallIcon: "ic_launcher",
        repeatType: "day",
        invokeApp: true,
        vibrate: true,
        vibration: 200,
        image: "app_logo",
        color: "green",
    });
};

export const scheduleIosNotification = (message?: string, title?: string, orderId?: string) => {
    PushNotificationIOS.scheduleLocalNotification({
        fireDate: new Date().getTime() + 1000,
        alertTitle: title,
        alertBody: message?.toString() ? message.toString() : '-',
        userInfo: { notificationId: orderId },
        image: "app_logo"
    });
};