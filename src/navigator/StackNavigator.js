import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';
import { NewTodo } from '../pages/NewTodo';
import { TodoDetails } from '../pages/TodoDetails';


const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent'
        },
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name="Login" options={{ headerShown: false }} component={ Login } />
      <Stack.Screen name="Register" options={{ headerShown: false }} component={ Register } />
      <Stack.Screen name="Home" component={ Home } />
      <Stack.Screen name="NewTodo" component={ NewTodo } />
      <Stack.Screen name="TodoDetails" component={ TodoDetails } />
    </Stack.Navigator>
  );
}