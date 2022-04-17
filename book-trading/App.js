import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import { firebase } from './src/firebase/config'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  OpenSans_300Light_Italic,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold_Italic, } from '@expo-google-fonts/open-sans';

import BookSearchScreen from './src/screens/BookSearchScreen/BookSearchScreen.js';
import BookInfoScreen from './src/screens/BookInfoScreen/BookInfoScreen';
import MyBooksScreen from './src/screens/MyBooksScreen/MyBooksScreen';
import AddBookScreen from './src/screens/AddBookScreen/AddBookScreen.js';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen.js';
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const SearchStack = createStackNavigator();
const BookStack = createStackNavigator();

function MySearchStack({ userData }) {
  return (
    <SearchStack.Navigator screenOptions={{headerShown: false}}>
      <SearchStack.Screen name="BookBrowse">
        {props => <BookSearchScreen {...props} userData={userData} />}
      </SearchStack.Screen>
      <SearchStack.Screen name="BookInfo">
        {props => <BookInfoScreen {...props} userData={userData} />}
      </SearchStack.Screen>
    </SearchStack.Navigator>
  )
}
function MyBookStack({ userData }) {
  return (
    <BookStack.Navigator screenOptions={{headerShown: false}}>
      <BookStack.Screen name="BooksOwned">
        {props => <MyBooksScreen {...props} userData={userData} />}
      </BookStack.Screen>
      <BookStack.Screen name="AddBook">
        {props => <AddBookScreen {...props} userData={userData} />}
      </BookStack.Screen>
    </BookStack.Navigator>
  )
}

function MyTabs({ userData }) {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen name="BookSearch" options={{
        tabBarIcon: ({focused, color, size}) => (
          <Feather name="search" size={24} color={focused ? "black" : "rgba(0, 0, 0, 0.3)"} />
        )
      }}>
        {props => <MySearchStack {...props} userData={userData} />}
      </Tab.Screen>
      <Tab.Screen name="MyBookStack" options={{
        tabBarIcon: ({focused, color, size}) => (
          <Feather name="book" size={24} color={focused ? "black" : "rgba(0, 0, 0, 0.3)"} />
        )
      }}>
        {props => <MyBookStack {...props} userData={userData} />}
      </Tab.Screen>
      <Tab.Screen name="Profile" options={{
        tabBarIcon: ({focused, color, size}) => (
          <Feather name="user" size={24} color={focused ? "black" : "rgba(0, 0, 0, 0.3)"} />
        )
      }}>
        {props => <ProfileScreen {...props} userData={userData} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {

  let [ fontsLoaded ] = useFonts({
    Poppins_400Regular,
    // all open sans imports
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold_Italic
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (!fontsLoaded || loading) {
    console.log("return app loading");
    return <AppLoading />;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        { user ? (
          <>
            <Stack.Screen name="Book Beans">
              {props => <MyTabs {...props} userData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </> 
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});