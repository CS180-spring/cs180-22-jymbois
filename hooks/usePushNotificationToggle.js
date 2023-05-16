import { useState } from 'react';

export const usePushNotificationToggle = (initialValue = false) => {
  const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] = useState(initialValue);

  const togglePushNotifications = () => {
    setIsPushNotificationsEnabled(!isPushNotificationsEnabled);
  };

  return [isPushNotificationsEnabled, togglePushNotifications];
};