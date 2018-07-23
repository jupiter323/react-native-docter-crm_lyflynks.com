import { Permissions, Notifications } from "expo";
import { AsyncStorage } from "react-native";
import { pushNotifications } from "../api/LyfLynks_API";
const PUSH_ENDPOINT = "http://rallycoding.herokuapp.com/api/tokens";

export const registerForPushNotifications = async () => {
  const isPushNotificationsPermissionGranted = await AsyncStorage.getItem("PushNotificationsPermission");
  if (isPushNotificationsPermissionGranted == undefined) {
    debugger;
    Permissions.askAsync(Permissions.NOTIFICATIONS).then(function({ status }) {
      debugger;
      AsyncStorage.setItem("PushNotificationsPermission", status);
    });
  }
};

export const generatePushNotificationToken = async () => {
  const isPushNotificationsPermissionGranted = await AsyncStorage.getItem("PushNotificationsPermission");
  debugger;
  console.log("PushNotificationsPermission", isPushNotificationsPermissionGranted);
  if (isPushNotificationsPermissionGranted != "granted") {
    return null;
  }
  let previousToken = await AsyncStorage.getItem("PushNotificationToken");
  console.log("previousToken", previousToken);
  if (previousToken) {
    return null;
  }
  let token = await Notifications.getExpoPushTokenAsync();
  console.log("Newtoken", token);
  AsyncStorage.setItem("PushNotificationToken", token);
  return token;
};

export const sendPushNotificationToken = async userToken => {
  debugger;
  let pushNotificationToken = await AsyncStorage.getItem("PushNotificationToken");
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

// let previousToken = await AsyncStorage.getItem("pushtoken");
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
