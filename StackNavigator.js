import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import GenderScreen from "./screens/GenderScreen";
import AgeScreen from "./screens/AgeScreen";
import HeightScreen from "./screens/HeightScreen";
import WeightScreen from "./screens/WeightScreen";
import PageDots from "./screens/PageDots";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator 
          screenOptions={{
            headerStyle: { backgroundColor: 'tan' }
          }}
        >
                <>
                    <Stack.Screen
					    name="Login"
					    component={LoginScreen}
                        options={{
                            headerTintColor: "#d2b48c",
                        }}
				    />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{
                            headerTintColor: "#d2b48c",
                        }}/>
                    <Stack.Screen name="Gender" component={GenderScreen} options={{
                            headerTintColor: "#d2b48c",
                        }}/>
                    <Stack.Screen name="Age" component={AgeScreen} options={{
                            headerTintColor: "#d2b48c",
                        }}/>
                    <Stack.Screen name="Height" component={HeightScreen} options={{
                            headerTintColor: "#d2b48c",
                        }}/>    
                    <Stack.Screen name="Weight" component={WeightScreen} options={{
                            headerTintColor: "#d2b48c",
                        }}/> 
                </>
                
        </Stack.Navigator>
    );
};

export default StackNavigator;


// 	const user = true; // placeholder for when we actually implement login
// 	return (
// 		<Stack.Navigator
// 			screenOptions={{
// 				headerStyle: { backgroundColor: "tan" },
// 			}}
// 		>
// 			{user ? (
// 				<>
// 					<Stack.Screen
// 						name="BottomTabNavigator"
// 						component={BottomTabNavigator}
// 						options={{ headerShown: false }}
// 					/>
// 				</>
// 			) : (
// 				<>
// 					<Stack.Screen
// 						name="Login"
// 						component={LoginScreen}
// 						options={{
// 							headerTintColor: "#ffff",
// 						}}
// 					/>
// 					<Stack.Screen
// 						name="Register"
// 						component={RegisterScreen}
// 						options={{
// 							headerTintColor: "#FFFF",
// 						}}
// 					/>
// 					<Stack.Screen
// 						name="Gender"
// 						component={GenderScreen}
// 						options={{
// 							headerTintColor: "#FFFF",
// 						}}
// 					/>
// 					<Stack.Screen
// 						name="Age"
// 						component={AgeScreen}
// 						options={{
// 							headerTintColor: "#FFFF",
// 						}}
// 					/>
// 					<Stack.Screen
// 						name="Height"
// 						component={HeightScreen}
// 						options={{
// 							headerTintColor: "#FFFF",
// 						}}
// 					/>
// 					<Stack.Screen
// 						name="Weight"
// 						component={WeightScreen}
// 						options={{
// 							headerTintColor: "#FFFF",
// 						}}
// 					/>
// 				</>
// 			)}
// 		</Stack.Navigator>
// 	);
// };

// export default StackNavigator;
