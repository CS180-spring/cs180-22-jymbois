import { View, Text, Image, StyleSheet, Switch } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useDark, usePushNotifications, useVacation } from '../hooks/useSwitch';

const SettingScreen = () => {
  const [isDark, toggleDark] = useDark(false);
  const [isVacation, toggleVacation] = useVacation(false);
  const [isPushNotifications, togglePushNotifications] = usePushNotifications(false);
  // still need to do this for the username and for photo uploads

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./images/default-profile.png")} />
      <View style={styles.editIconContainer}>
        <FontAwesome name="pencil" size={20} color="white" />
      </View>

      <Text style={{fontSize: 20, marginTop: 20}}>Welcome, <Text style={{fontWeight: 'bold' }}>User</Text></Text>

      {[
        ['Dark Mode', isDark, toggleDark],
        ['Vacation Mode', isVacation, toggleVacation],
        ['Push Notifications', isPushNotifications, togglePushNotifications],
      ].map(([label, value, toggle]) => (
        <View key={label} style={styles.notificationContainer}>
          <Text style={styles.notificationText}>{label}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#8B3A3A" }}
            thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggle}
            value={value}
          />
        </View>
      ))}
      <Image 
        style={ {width: 200, height: 200, marginTop: 20}}
        resizeMode='contain'
        source={require("./images/RealLogo.png")} />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  image: {
    width: '34%',
    height: '21%',
    borderRadius: 70,
  },
  editIconContainer: {
    backgroundColor: '#8B3A3A',
    padding: 8,
    borderRadius: 50,
    marginTop: -20,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  notificationText: {
    marginRight: 10,
    fontSize: 18,
  },
});
