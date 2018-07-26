import { Permissions, Notifications } from "expo";
import { AsyncStorage } from "react-native";

export async function registerForPushNotifications() {
  const pushNotificationToken = await AsyncStorage.getItem("pushNotificationToken");
  if (pushNotificationToken) {
    return;
  }
  const hasPermissionForPushNotificationsBeenAskedBefore = await AsyncStorage.getItem(
    "hasPermissionForPushNotificationsBeenAskedBefore"
  );

  const { status: existingPermissionStatus } = await Permissions.getAsync(
    Permissions.REMOTE_NOTIFICATIONS
  );

  if (!hasPermissionForPushNotificationsBeenAskedBefore && existingPermissionStatus != "granted") {
    const { status } = await askForPermission();
    if (status != "granted") {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    AsyncStorage.setItem("hasPermissionForPushNotificationsBeenAskedBefore", "true");
    AsyncStorage.setItem("pushNotificationToken", token);
  }
}

export async function askForPermission() {
  return Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
}
