import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {SafeAreaView} from 'react-native-safe-area-context';

const MpinScreen = ({route}) => {
  const {title, path} = route.params || {
    title: 'Default Title',
    path: 'defaultPath',
  };

  const navigation = useNavigation();
  const [mpin, setMpin] = useState('');

  const onSubmit = async () => {
    if (path === 'create') {
      await handleAddMPin();
    }

    if (path === 'verify') {
      await handleVerifyMPin();
    }
  };

  const handleVerifyMPin = async () => {
    try {
      const verifyPin = await AsyncStorage.getItem('Mpin');
      if (verifyPin === mpin) {
        navigation.replace('Home');
      } else {
        Alert.alert('Invalid MPIN', 'Please try again', [{text: 'OK'}]);
        setMpin('');
      }
    } catch (error) {
      console.error('Error verifying MPIN:', error);
    }
  };

  const handleAddMPin = async () => {
    try {
      if (mpin.length !== 4) {
        Alert.alert('Invalid MPIN', 'MPIN must be 4 digits', [{text: 'OK'}]);
        return;
      }

      await AsyncStorage.setItem('Mpin', mpin);
      // Use setDoc to add or update the MPIN field in the user's document
      console.log('MPIN added successfully!');
      setMpin('');
      navigation.replace('Home');
    } catch (error) {
      console.error('Error adding MPIN:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#fff',
        }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 36, marginVertical: 60, color: '#111'}}>
            MpinScreen
          </Text>
          <Text style={{fontSize: 25, color: 'black'}}>{title}</Text>
          <View style={{width: '100%', paddingHorizontal: 22, marginTop: 30}}>
            <OtpInput
              numberOfDigits={4}
              onTextChange={text => setMpin(text)}
              focusColor={'#5566ee'}
              focusStickBlinkingDuration={400}
              theme={{
                pinCodecontainerStyle: {
                  backgroundColor: 'black',
                  width: 58,
                  height: 58,
                  borderRadius: 12,
                },
                textInputStyle: {
                  color: 'black', // Change text color here
                },
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <Pressable
        style={{
          backgroundColor: '#5566ee',
          width: '90%',
          marginTop: 'auto',
          alignItems: 'center',
          marginHorizontal: 30,
          height: 50,
          paddingVertical: 12,
          marginBottom: 30,
          borderRadius: 50,
        }}
        onPress={onSubmit}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MpinScreen;
