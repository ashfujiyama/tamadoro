export const createNotification = () => {
  chrome.notifications.create(
    "",
    {
      type: "basic",
      iconUrl: "cake.png",
      title: "Test Notification",
      message: "This is a test notification!",
    },
    (notificationId) => {
      console.log("Notification created with ID:", notificationId);
    }
  );
};
