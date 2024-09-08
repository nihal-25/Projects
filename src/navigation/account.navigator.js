import "react-native-gesture-handler";
import React from 'react';
import { colors } from '../utils/colors';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import Focus from '../features/Focus';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import TrackOrderScreen from '../screens/TrackOrderScreen';
import DrinksListScreen from '../screens/DrinksListScreen';
import CartScreen from '../screens/CartScreen';
import BreakfastListScreen from '../screens/BreakfastListScreen';
import SearchScreen from '../screens/SearchScreen';
import ChineseDishesScreen from '../screens/ChineseDishesScreen';
import ShortEatsScreen from '../screens/ShortEatsScreen';
import OnboardingScreen from '../screens/OnboardingScreen1';
import EditProfileScreen from '../screens/EditProfileScreen'; 
import PaymentConfirmationScreen from '../screens/PaymentConfirmationScreen'; // Import the new screen

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="Focus" component={Focus} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: "Main Screen",
          headerStyle: {
            backgroundColor: colors.pure,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: colors.pure,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: "About",
          headerStyle: {
            backgroundColor: colors.pure,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="TrackOrder"
        component={TrackOrderScreen}
        options={{
          title: "Track Order",
          headerStyle: {
            backgroundColor: colors.pure,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="DrinksList"
        component={DrinksListScreen}
        options={{
          title: "Drinks List",
          headerStyle: {
            backgroundColor: colors.pure,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Cart",
          headerStyle: {
            backgroundColor: colors.pure,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="BreakfastList"
        component={BreakfastListScreen}
        options={{
          title: "Breakfast List",
          headerStyle: {
            backgroundColor: colors.pure,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Search",
          headerStyle: {
            backgroundColor: colors.pure,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="ChineseDishes"
        component={ChineseDishesScreen}
        options={{
          title: "Chinese Dishes",
          headerStyle: {
            backgroundColor: colors.pure,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="ShortEats"
        component={ShortEatsScreen}
        options={{
          title: "Short Eats",
          headerStyle: {
            backgroundColor: colors.pure,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen} 
        options={{
          title: "Edit Profile",
          headerStyle: {
            backgroundColor: colors.pure,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="PaymentConfirmation"
        component={PaymentConfirmationScreen}
        options={{
          title: "Payment Confirmation",
          headerStyle: {
            backgroundColor: colors.pure,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
