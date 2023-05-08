import { useEffect, useState, useRef } from 'react';
import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import database from "../configuration/firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../configuration/firebaseConfig"; 

const saveTokenToDatabase = async (token, isPushNotificationsEnabled) => {
  if(!isPushNotificationsEnabled) token = ""; 
  const user = auth.currentUser.uid;
  dbRef = ref(database, "users/" + user + "/pushToken");
  await set(dbRef, token);
};

export const usePushRegister = (isPushNotificationsEnabled) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      let token;
      if (Device.isDevice && isPushNotificationsEnabled) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          Alert.alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else if (!Device.isDevice){
        Alert.alert('Must use physical device for Push Notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      setExpoPushToken(token);
      saveTokenToDatabase(token, isPushNotificationsEnabled); // Save token to the database
    };

    registerForPushNotificationsAsync().then(() => {
      // Add notification listener
      notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

      // Add response listener
      responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    });

    return () => {
      // Clean up any subscriptions or resources here
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [isPushNotificationsEnabled]);

  return expoPushToken;
};

