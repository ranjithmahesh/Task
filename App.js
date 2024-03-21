import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from './scr/screen/HomeScreen';
import LoginScreen from './scr/screen/LoginScreen';
import MpinScreen from './scr/screen/MpinScreen';
import RegisterScreen from './scr/screen/RegisterScreen';
import SplashScreen from './scr/screen/SplashScree';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="splash">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="mpin" component={MpinScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
