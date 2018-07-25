export function saveNotification(notification) {
  return {
    type: "save_notification",
    payload: notification
  };
}

export function reduceUnreadNotifications() {
  return {
    type: "reduce_unread_notifications"
  };
}
