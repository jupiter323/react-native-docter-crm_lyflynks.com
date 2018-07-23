import { domain, pushNotifications, makeRequest } from "./api";

const endPoint = domain + pushNotifications.root;

export default {
  postDeviceToken(pushNotificationToken, token) {
    debugger;
    return makeRequest([endPoint], "POST", { device_token: pushNotificationToken }, token);
  }
};
