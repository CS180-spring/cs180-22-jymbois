import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import {NavigationContainer} from '@react-navigation/native'
import { AuthProvider } from './hooks/useAuth';
import AuthNavigator from './AuthNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthNavigator/>
      </AuthProvider>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
