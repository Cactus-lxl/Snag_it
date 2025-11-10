import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigation/TabNavigator';
import SignupScreen from './src/screens/SignupScreen';
import SellerDashboardScreen from './src/screens/DashboardScreen-seller';
import SignupFormScreen from './src/screens/SignupFormScreen';
import SigninScreen from './src/screens/SigninScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import ItemRentalsScreen from './src/screens/ItemRentalsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ReviewBookingScreen from './src/screens/ReviewBookingScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import BookingSuccessScreen from './src/screens/BookingSuccessScreen';
import SearchScreen from './src/screens/SearchScreen';
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
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="SellerDashboard" component={SellerDashboardScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
          <Stack.Screen name="AddItem" component={AddItemScreen} />
          <Stack.Screen name="ItemRentals" component={ItemRentalsScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="ReviewBooking" component={ReviewBookingScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
