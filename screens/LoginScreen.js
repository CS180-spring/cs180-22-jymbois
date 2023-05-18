import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
	ScrollView,
	Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";	
import { auth,resetPassword } from "../configuration/firebaseConfig"; //	Firebase Operations

import { writeUserData, readData}  from "../hooks/databaseQueries";

import * as WebBrowser from "expo-web-browser"
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from 'expo-auth-session';


WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {

  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "943556470766-32jq43kig7eu5qoifilglj8siumuqcts.apps.googleusercontent.com",
    iosClientId: "943556470766-7rosssrctscblvb5tsnssqg7an1tp2tb.apps.googleusercontent.com",
    webClientId: "943556470766-h28njogtg43aulfh42v7k1t87bf6t5vu.apps.googleusercontent.com",
    expoClientId: "943556470766-h28njogtg43aulfh42v7k1t87bf6t5vu.apps.googleusercontent.com"
  })

  //  Trigger every time someone signs in with google
  React.useEffect(() => {
    handleSignUp();
    console.log("User Info: ")
    console.log(userInfo)

	

    if(userInfo)
    {
		if(auth.fetchSignInMethodsForEmail(userInfo.email).length > 0)
		{

			auth.signInWithEmailAndPassword(userInfo.email, userInfo.id)
          		.then((userCredential) => { //  Successful sign in
            	const user = userCredential.user;
            	console.log("Logged in with: ", userInfo.email);
				navigation.navigate("Home")	//	Navigate to User Home Page :)
          	}).catch((error) => { //  Error, set to send alert when error occurs

				//	Maybe set up message here instead of just an alert window?
            	const errorCode = error.code;
            	const errorMessage = error.message;
            	alert(error.message);
           })
		}
		else{
			console.log(userInfo)	//	For debugging
			navigation.navigate("Gender", {
				email: userInfo.email,
				username: userInfo.given_name,
				pw: userInfo.id,	//	Not sure what else to use here, we need a pw to sign in :/
			});
		}
    }


  }, [response])


  async function handleSignUp() {
    const user = await AsyncStorage.getItem("@user");
    if(!user){
      if(response?.type === "success"){
        await getUserInfo(response.authentication.accessToken)
      }
    }else {
      setUserInfo(JSON.parse(user))
    }
  }

  const getUserInfo = async (token) => 
  {
    //  return if there is no token
    if (!token) return;
    try {
      //  Respoonse contains info of user
      const response = await fetch (
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}`},
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      //  Update user state
      setUserInfo(user);
    }catch(error)
    {
      console.log(error);
    }
  }

	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);

	const [emailInputPosition, setEmailInputPosition] = useState({ x: 0, y: 0 });
	const [passwordInputPosition, setPasswordInputPosition] = useState({
		x: 0,
		y: 0,
	});

	const handleEmailLayout = (event) => {
		setEmailInputPosition({
			x: event.nativeEvent.layout.x,
			y: event.nativeEvent.layout.y,
		});
	};

	const handlePasswordLayout = (event) => {
		setPasswordInputPosition({
			x: event.nativeEvent.layout.x,
			y: event.nativeEvent.layout.y,
		});
	};

	const handleEmailFocus = () => {
		setIsEmailFocused(true);
		setTimeout(() => {
			scrollViewRef.current.scrollTo({
				x: 0,
				y: emailInputPosition.y - 100,
				animated: true,
			});
		}, 50);
	};

	const handleEmailBlur = () => setIsEmailFocused(false);

	const handlePasswordFocus = () => {
		setIsPasswordFocused(true);
		setTimeout(() => {
			scrollViewRef.current.scrollTo({
				x: 0,
				y: passwordInputPosition.y - 100,
				animated: true,
			});
		}, 50);
	};

	const handlePasswordBlur = () => setIsPasswordFocused(false);

	const handleLogin = () => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				//  Successful sign in
				const user = userCredential.user;
				console.log("Logged in with: ", email);
				navigation.navigate('Home'); //	Navigate to User Home Page :)
			})
			.catch((error) => {
				//  Error, set to send alert when error occurs

				//	Maybe set up message here instead of just an alert window?
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(error.message);
			});
	};

	const scrollViewRef = useRef(null);
	//github shits..
	const handleGithubLogout = async () => {
		await AsyncStorage.removeItem('@user');
		setGithubAccessToken('');
		AuthSession.dismiss
	  };
	AuthSession.dismiss();


	const githubClientId = "f5c15da3c245afa8bd09";
	const githubClientSecret = "6dfaa781dfd723c1639cd6b49a72fb6a794d8304";
	const [githubAccessToken, setGithubAccessToken] = useState("");

	const handleGithubSignIn = async () => {
		await AsyncStorage.removeItem("@user");
		const user = await AsyncStorage.getItem("@user");
	  
		try {
		  const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });
		  const authUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(redirectUrl)}`;
	  
		  const result = await AuthSession.startAsync({ authUrl });
	  
		  if (result.type === "success" && result.url) {
			const { params } = result;
	  
			const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
			  method: "POST",
			  headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({
				client_id: githubClientId,
				client_secret: githubClientSecret,
				code: params.code,
			  }),
			});
	  
			const tokenResult = await tokenResponse.json();
			const { access_token: accessToken } = tokenResult;
	  
			if (accessToken) {
			  setGithubAccessToken(accessToken);
	  
			  const userResponse = await fetch("https://api.github.com/user", {
				headers: {
				  Authorization: `Bearer ${accessToken}`,
				},
			  });
	  
			  const user = await userResponse.json();
			  await AsyncStorage.setItem("@user", JSON.stringify(user));
	  
			  // Handle user data here
			  console.log(user);
			  
			  if(auth.fetchSignInMethodsForEmail(user.login).length > 0)
			  {
				auth.signInWithEmailAndPassword(user.login, user.id.toString())
				  .then((userCredential) => {
					const user = userCredential.user;
					console.log("Logged in with: ", user.login);
					navigation.navigate("Home")
				  }).catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					alert(error.message);
				  })
			  }
			  else {
				navigation.navigate("Gender", {
				  email: user.login,
				  username: user.name,
				  pw: user.id.toString(),
				});
			  }
			}
		  }
		} catch (error) {
		  console.error("Error occurred during GitHub sign-in:", error);
		}
	  };
	  
	

	 

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			keyboardShouldPersistTaps="handled"
			onScroll={() => Keyboard.dismiss()}
			ref={scrollViewRef}
			scrollEventThrottle={16}
		>
			<View style={styles.content}>
				<Image source={require("./images/RealLogo.png")} style={styles.logo} />
				<View style={styles.inputContainer}>
					<Image
						source={require("./images/profilepic.jpeg")}
						style={styles.icon}
					/>
					<TextInput
						style={[
							styles.input,
							isEmailFocused || email
								? styles.inputFocused
								: styles.inputInactive,
						]}
						placeholder="Enter Username"
						value={email}	//	email var set here trhough textbox
						onChangeText={setEmail}
						onFocus={handleEmailFocus}
						onBlur={handleEmailBlur}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Image
						source={require("./images/passwordpic.png")}
						style={styles.icon}
					/>
					<TextInput
						style={[
							styles.input,
							isPasswordFocused || password
								? styles.inputFocused
								: styles.inputInactive,
						]}
						placeholder="Enter password"
						secureTextEntry
						value={password}
						onChangeText={setPassword}
						onFocus={handlePasswordFocus}
						onBlur={handlePasswordBlur}
					/>
				</View>
				<TouchableOpacity style={styles.button} onPress={handleLogin}>
					<Text style={styles.buttonText}>LOGIN</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.registerButton}
					onPress={() => navigation.navigate("Register")}
				>
					<Text style={styles.registerButtonText}>Don't have an account? <Text style={{color: 'black', fontWeight: 'bold'}}>Click here</Text></Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.registerButton}
					onPress={() => promptAsync()}
				>
					<Text style={{color: 'black', fontWeight: 'bold'}}>Sign In With Google</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.registerButton} onPress={async () => {
    				await handleGithubLogout();
   					handleGithubSignIn();
					}}>
    				<Text style={{ color: "black", fontWeight: "bold" }}>Sign In With GitHub</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#fff",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		width: 35,
		height: 35,
		marginRight: 15,
		marginBottom: 14,
	},
	logo: {
		width: 240,
		height: 240,
		marginTop: -190,
		marginBottom: 20,
	},
	heading: {
		fontSize: 24,
		marginBottom: 20,
		textAlign: "center",
		color: "white",
	},
	input: {
		justifyContent: "center",
		width: "65%",
		height: 50,

		paddingHorizontal: 1,
		marginBottom: 23,

		fontSize: 16,
		borderBottomWidth: 2,
		borderBottomColor: "#ccc",
		marginRight: 44,
	},
	inputInactive: {
		borderBottomColor: "#ccc",
	},
	inputFocused: {
		borderBottomColor: "#8BC34A",
	},

	button: {
		width: "70%",
		height: 50,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		marginBottom: 15,
		shadowColor: '#000',
  		shadowOffset: { width: 0, height: 2 },
  		shadowOpacity: 0.2,
  		shadowRadius: 2,
  		elevation: 2
	},
	buttonText: {
		color: "black",
		fontSize: 16,
		fontWeight: "bold",
	},
	registerButton: {
		width: "100%",
		height: 50,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
	registerButtonText: {
		color: "black",
		fontSize: 16,
	},
});

export default LoginScreen;
