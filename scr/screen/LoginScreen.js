import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TouchID from 'react-native-touch-id';
import Entypo from 'react-native-vector-icons/Entypo';
import {auth} from '../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const getMyObject = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('tokenUser');

        if (jsonValue) {
          handleBiometric();
          console.log('tokenUser is present');
        }
      } catch (e) {
        console.log(e);
      }
    };
    getMyObject();
  }, []);

  const handleBiometric = () => {
    TouchID.isSupported()
      .then(biometryType => {
        const authenticationType =
          biometryType === 'FaceID' ? 'FaceID' : 'TouchID';
        console.log(`${authenticationType} is supported.`);
        TouchID.authenticate('optionalConfigObject')
          .then(success => {
            navigation.replace('Home');
            console.log('Authentication success:', success);
          })
          .catch(error => {
            navigation.navigate('mpin', {
              title: 'Verify Your MPin',
              path: 'verify',
            });
            console.log(
              `${authenticationType} kjjjjjjauthentication failed:`,
              error,
            );
          });
      })
      .catch(error => {
        navigation.navigate('mpin', {
          title: 'Verify Your MPin',
          path: 'verify',
        });
        console.log('Biometric authentication is not supported:', error);
      });
  };

  const login = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        if (userCredential && userCredential.user) {
          console.log('User is logged in:', userCredential.user);

          const accessToken = userCredential.user.stsTokenManager.accessToken;
          AsyncStorage.setItem('tokenUser', accessToken);

          handleBiometric();
          navigation.replace('Home');
        } else {
          console.error('User login failed.');
        }
        setLoading(false); // Set loading to false after handling the response
      })
      .catch(error => {
        console.error('Login error:', error);
        setLoading(false); // Set loading to false on error
      });
  };
  return (
    <View style={{backgroundColor: '#f7f7f7', flex: 1}}>
      <SafeAreaView
        style={{
          backgroundColor: '#5566ee',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <View style={{paddingTop: 60, paddingBottom: 60, alignItems: 'center'}}>
          <Entypo name="tablet-mobile-combo" size={80} color={'white'} />
        </View>
      </SafeAreaView>
      <KeyboardAvoidingView>
        <View
          style={{
            marginHorizontal: 20,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            borderRadius: 15,
            marginTop: -60,
          }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: '#2d2d2d',
                paddingVertical: 20,
              }}>
              Login
            </Text>
          </View>
          <View>
            <TextInput
              placeholder="Email id"
              value={email}
              onChangeText={text => setEmail(text)}
              placeholderTextColor="black"
              autoCapitalize="none"
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 2,
                fontSize: email ? 18 : 18,
                color: 'black',
              }}
              autoCompleteType="email"
            />
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="black"
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 2,
                fontSize: password ? 18 : 18,
                paddingVertical: 20,
                color: 'black',
              }}
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={login}
          style={{
            width: 200,
            backgroundColor: '#5566ee',
            padding: 15,
            borderRadius: 7,
            marginVertical: 50,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}>
              Login
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('jkhg');
            navigation.navigate('Register');
          }}
          style={{marginTop: 20}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              color: 'gray',
              fontWeight: '500',
            }}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
