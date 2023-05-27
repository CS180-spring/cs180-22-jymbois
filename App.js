import { NavigationContainer } from '@react-navigation/native';
import LoginNavigator from './LoginNavigator';
import { RefreshProvider } from './hooks/RefreshContext';
import React, { useState } from 'react';

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  
  return (
    <RefreshProvider value={{ refreshKey, setRefreshKey }}>
      <NavigationContainer>
        <LoginNavigator/>
      </NavigationContainer>
    </RefreshProvider>
  );
}
