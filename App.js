import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './src/screens/SignupScreen';
import DashboardScreen from './src/screens/DashboardScreen-buyer';
import ChatScreen from './src/screens/ChatScreen';
import SellerDashboardScreen from './src/screens/DashboardScreen-seller';
import AccountScreen from './src/screens/AccountScreen';
import SignupFormScreen from './src/screens/SignupFormScreen';
import SigninScreen from './src/screens/SigninScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import ItemRentalsScreen from './src/screens/ItemRentalsScreen';
import { UserProvider } from './src/context/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Signup"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="SignupForm" component={SignupFormScreen} />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="SellerDashboard" component={SellerDashboardScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
          <Stack.Screen name="AddItem" component={AddItemScreen} />
          <Stack.Screen name="ItemRentals" component={ItemRentalsScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
