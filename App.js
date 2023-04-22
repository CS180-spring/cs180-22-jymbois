import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';
//import StackNavigator from '../StackNavigator';
import {NavigationContainer} from '@react-navigation/native'
<<<<<<< HEAD
import { AuthProvider } from './hooks/useAuth';
=======
import {auth} from './firebase'
>>>>>>> fed51485897ab1ee5313c9b4c0d7b0d8605372f7

export default function App() {

  return (
    <NavigationContainer>
<<<<<<< HEAD
      <AuthProvider>
        <StackNavigator/>
      </AuthProvider>
=======
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
>>>>>>> fed51485897ab1ee5313c9b4c0d7b0d8605372f7
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
