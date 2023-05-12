// web 943556470766-soma4dqnrlasa2qqk9i83iso76julvsm.apps.googleusercontent.com
// iOS 943556470766-ksv5flujgtpck547d777h1sgincc8n8e.apps.googleusercontent.com
// Android 943556470766-r23dsha7te4umbm6fg0fi7jd92nlea5f.apps.googleusercontent.com

import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View } from "react-native-web";
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    Button
  } from "react-native";


WebBrowser.maybeCompleteAuthSession();

export default function GoogleTest() {
    //  TESTING FOR GOOGLE SIGN IN
  const [userInfo, setUserInfo] = React.useState(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "943556470766-r23dsha7te4umbm6fg0fi7jd92nlea5f.apps.googleusercontent.com",
    iosClientId: "943556470766-ksv5flujgtpck547d777h1sgincc8n8e.apps.googleusercontent.com",
    webClientId: "943556470766-soma4dqnrlasa2qqk9i83iso76julvsm.apps.googleusercontent.com",
    expoClientId: "943556470766-soma4dqnrlasa2qqk9i83iso76julvsm.apps.googleusercontent.com"
  });

    <View style={styles.container}>
        <Text>Open!</Text>
        <Button title="Sigin With Google" onPress={promptAsync} />
        <StatusBar style="auto"/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        aliginItems: "center",
        justifyContent: "center"
    }
});


