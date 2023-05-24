import {NavigationContainer} from '@react-navigation/native'
import LoginNavigator from './LoginNavigator';
import { ThemeProvider } from './hooks/ThemeContext'; 

export default function App() {
  return (
    <NavigationContainer>
        <LoginNavigator/>
    </NavigationContainer>
  );
}
