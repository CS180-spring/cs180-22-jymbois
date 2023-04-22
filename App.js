import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';
//import StackNavigator from '../StackNavigator';
import {NavigationContainer} from '@react-navigation/native'
import {auth} from './firebase'

export default function App() {

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Button 
        title = "Click me :)"
        onPress={() => 
          auth.createUserWithEmailAndPassword("godfreylozada3@gmail.com", "password123")
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          })
        }
        />
      </SafeAreaView>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 500,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
