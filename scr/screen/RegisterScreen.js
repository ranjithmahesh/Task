import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth, db, doc, setDoc} from '../firebase';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const register = () => {
    if (email === '' || password === '' || name === '') {
      Alert.alert(
        'Invalid Details',
        'Please fill all the details',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('user credential', userCredential);
        const user = userCredential._tokenResponse.email;
        const myUserUid = auth.currentUser.uid;
        setDoc(doc(db, 'users', `${myUserUid}`), {
          email: user,
          phone: phone,
          name: name,
        });

        const accessToken = userCredential.user.stsTokenManager.accessToken;

        console.log(accessToken);
        AsyncStorage.setItem('tokenUser', accessToken);

        setLoading(false);
        navigation.replace('mpin', {title: 'Create Your MPin', path: 'create'});
      })
      .catch(error => {
        console.error('Registration error:', error);
        setLoading(false);
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
      <KeyboardAvoidingView style={{flex: 1}}>
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
              Registration
            </Text>
          </View>
          <View>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={text => setName(text)}
              placeholderTextColor="black"
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 2,
                fontSize: 18,
                color: 'black',
                marginBottom: 20,
              }}
            />
            <TextInput
              placeholder="Email id"
              value={email}
              onChangeText={text => setEmail(text)}
              placeholderTextColor="black"
              autoCapitalize="none"
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 2,
                fontSize: 18,
                color: 'black',
                marginBottom: 20,
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
                fontSize: 18,
                color: 'black',
                marginBottom: 20,
              }}
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={register}
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
              Register
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{marginTop: 20}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              color: 'gray',
              fontWeight: '500',
            }}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
