import React, {useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2450);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ImageBackground
        source={{
          uri: 'https://storage.googleapis.com/website-production/uploads/2016/05/splash-screen.jpg',
        }}
        style={{width: '100%', height: '100%'}}>
        <Animatable.Text
          style={{
            fontSize: 50,
            color: 'white',
            fontWeight: 'bold',
            alignItems: 'center',
            paddingLeft: 135,
          }}
          animation="fadeInDownBig"
          duration={2000}>
          Task
        </Animatable.Text>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;
