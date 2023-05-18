import { useEffect, useState } from 'react';
import { retrieveIsPush, writeIsPush } from './databaseQueries';
import { usePushRegister } from './usePushRegister';

export const usePushNotificationToggle = (initialValue) => {
  const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] = useState(initialValue);

  useEffect(() => {
    const fetchIsPush = async () => {
      try{
        const pushEnabled = await retrieveIsPush();
        setIsPushNotificationsEnabled(pushEnabled)
      } catch(error) {
        console.log("Error fetchIsDark: ", error);
        setIsPushNotificationsEnabled(false);
      }
    };

    fetchIsPush();
  }, []);

  const togglePushNotifications = () => {
    setIsPushNotificationsEnabled(!isPushNotificationsEnabled);
    writeIsPush(!isPushNotificationsEnabled);
  };

  return [isPushNotificationsEnabled, togglePushNotifications];
};