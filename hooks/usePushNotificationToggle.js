import { useState } from 'react';
import { retrieveIsPush, writeIsPush } from './databaseQueries';

export const usePushNotificationToggle = (initialValue) => {
  const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] = useState(initialValue);

  const togglePushNotifications = () => {
    setIsPushNotificationsEnabled(!isPushNotificationsEnabled);
  };

  return [isPushNotificationsEnabled, togglePushNotifications];
};