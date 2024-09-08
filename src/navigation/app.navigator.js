import "react-native-gesture-handler";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../utils/colors";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import MainScreen from "../screens/MainScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AboutScreen from "../screens/AboutScreen";
import TrackOrderScreen from "../screens/TrackOrderScreen";
import DrinksListScreen from "../screens/DrinksListScreen";
import CartScreen from "../screens/CartScreen";
import BreakfastListScreen from "../screens/BreakfastListScreen";
import SearchScreen from "../screens/SearchScreen";
import ChineseDishesScreen from "../screens/ChineseDishesScreen";
import ShortEatsScreen from "../screens/ShortEatsScreen";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "MainScreen" : "SignInScreen"}
      screenOptions={{ headerShown: false }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};
