import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/login'
import Produtos from './pages/produtos';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
      <Stack.Screen name="Produtos" component={Produtos} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}