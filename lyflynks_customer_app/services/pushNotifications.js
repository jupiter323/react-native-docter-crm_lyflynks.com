import { Permissions, Notifications } from "expo";
import { AsyncStorage } from "react-native";
import { pushNotifications } from "../api/LyfLynks_API";

export async function registerForPushNotifications() {
  const pushNotificationToken = await AsyncStorage.getItem("pushNotificationToken");
  console.log("existing", pushNotificationToken);
  if (pushNotificationToken) {
    debugger;
    return;
  }
  console.log(3);
  const hasPermissionForPushNotificationsBeenAskedBefore = await AsyncStorage.getItem(
    "hasPermissionForPushNotificationsBeenAskedBefore"
  );
  console.log(
    "hasPermissionForPushNotificationsBeenAskedBefore",
    hasPermissionForPushNotificationsBeenAskedBefore
  );
  debugger;
  const { status: existingPermissionStatus } = await Permissions.getAsync(
    Permissions.REMOTE_NOTIFICATIONS
  );
  console.log("existingPermissionStatus", existingPermissionStatus);
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

export const sendPushNotificationToken = async userToken => {
  debugger;
  let pushNotificationToken = await AsyncStorage.getItem("pushNotificationToken");
  console.log("user Token", userToken);
  console.log("device token", pushNotificationToken);
  pushNotifications
    .postDeviceToken(pushNotificationToken, userToken)
    .then(function(response) {
      console.log("response", response);
    })
    .catch(function(errors) {
      console.log("errors", errors);
    });
};

// let previousToken = await AsyncStorage.gketItem("pushtoken");
// console.log(previousToken);
// if (previousToken) {
//   return;
// } else {
//   let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
//   if (status != "granted") {
//     return;
//   }
//   let token = await Notifications.getExpoPushTokenAsync();
//   console.log(token);
//   body = { token: { token } };

//   let response = await fetch(PUSH_ENDPOINT, {
//     method: "POST",
//     body: JSON.stringify(body)
//   });
//   AsyncStorage.setItem("pushtoken", token);
// }

// export const generatePushNotificationToken = async () => {
//   const isPushNotificationsPermissionGranted = await AsyncStorage.getItem("PushNotificationsPermission");
//   debugger;
//   console.log("PushNotificationsPermission", isPushNotificationsPermissionGranted);
//   if (isPushNotificationsPermissionGranted != "granted") {
//     return null;
//   }
//   let previousToken = await AsyncStorage.getItem("PushNotificationToken");
//   console.log("previousToken", previousToken);
//   if (previousToken) {
//     return null;
//   }
//   let token = await Notifications.getExpoPushTokenAsync();
//   console.log("Newtoken", token);
//   AsyncStorage.setItem("PushNotificationToken", token);
//   return token;
// };
