import React, {useState, useRef} from 'react';
import {Text, Pressable, TextInput} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Strings from '../Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

var specialCharactorRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

const SignUp = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMObileNumber] = useState('');
  const [userDetails, setUserDetails] = useState('');

  const ref_email = useRef();
  const ref_password = useRef();
  const ref_confirmPassword = useRef();
  const ref_mobileNumber = useRef();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('loginCredentials');
      jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log('JsonValue', jsonValue);
      if (jsonValue) {
        setUserDetails(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.log('error1');
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const passwordMatch = () => {
    if (password !== confirmPassword) {
      return Toast.show({
        type: 'error',
        text1: 'Password mis-match',
      });
    }
    return true;
  };
  const emailRegex = (val) => {
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (pattern.test(val || email)) {
      Toast.show({
        type: 'success',
        text1: 'Correct',
      });
      return true;
    }
    Toast.show({
      type: 'error',
      text1: 'Please enter valid email',
    });
    return false;
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('loginCredentials', jsonValue);
    } catch (e) {
      alert('Something went wrong');
    }
  };

  const onSignUp = () => {
    if (
      userName &&
      password &&
      passwordMatch() &&
      // emailRegex() &&
      mobileNumber
    ) {
      const userDetail = {
        userName: userName,
        password: password,
        email: email,
        mobileNumber: mobileNumber,
      };
      const addNewDetails =
        userDetails?.length > 0 ? userDetails.push(userDetail) : [userDetail];
      console.log(addNewDetails);
      storeData(userDetails || addNewDetails);
      navigation.navigate('Login');
    } else {
      Toast.show({
        type: 'error',
        text1: Strings.PLEASE_ADD_MaNDATORY_FIELD,
      });
    }
  };

  const onLoginPress = () => navigation.goBack();

  const userNameValidation = (data) => {
    if (!data) {
      return Toast.show({
        type: 'error',
        text1: 'Please enter username',
      });
    }
    setUserName(data);
  };

  const mobileValidation = (data) => {
    if (!data) {
      return Toast.show({
        type: 'error',
        text1: 'Please enter mobile',
      });
    }
    if (data.length < 10) {
      return Toast.show({
        type: 'error',
        text1: 'Please enter valid mobile number',
      });
    }
    Toast.show({
      type: 'success',
      text1: 'Correct',
    });
    setMObileNumber(data);
  };

  const passwordValidation = (data) => {
    if (!data) {
      return Toast.show({
        type: 'error',
        text1: 'Please enter password',
      });
    }
    if (data.length < 6) {
      return Toast.show({
        type: 'error',
        text1: 'Password must be at least 6 characters long.',
      });
    }
    if (!specialCharactorRegex.test(data)) {
      return Toast.show({
        type: 'error',
        text1: 'Password must contain one special charactor',
      });
    }
    Toast.show({
      type: 'success',
      text1: 'Correct',
    });
    return setPassword(data);
  };

  const emailValidation = (data) => {
    if (!data) {
      return Toast.show({
        type: 'error',
        text1: 'Please enter email',
      });
    }
    if (emailRegex(data)) {
      Toast.show({
        type: 'success',
        text1: 'Correct',
      });
      return setEmail(data);
    }
  };

  return (
    <ScrollView style={styles.ParentBackgroundColor}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleStyle}>{Strings.SIGN_UP}</Text>
        <TextInput
          onChangeText={userNameValidation}
          placeholder={Strings.ENTER_USER_NAME_L}
          style={styles.inputStyle}
          returnKeyType="next"
          onSubmitEditing={( ) => {
            ref_email.current.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          ref={ref_email}
          onChangeText={emailValidation}
          placeholder={Strings.ENTER_EMAIL_ID}
          style={styles.inputStyle}
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => {
            ref_mobileNumber.current.focus();
            emailRegex();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          ref={ref_mobileNumber}
          onChangeText={mobileValidation}
          keyboardType="number-pad"
          maxLength={10}
          placeholder={Strings.ENTER_MOBILE}
          style={styles.inputStyle}
          returnKeyType="next"
          onSubmitEditing={() => {
            ref_password.current.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          ref={ref_password}
          onChangeText={passwordValidation}
          placeholder={Strings.ENTER_PASSWORD}
          style={styles.inputStyle}
          secureTextEntry
          returnKeyType="next"
          maxLength={16}
          onSubmitEditing={() => {
            ref_confirmPassword.current.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          ref={ref_confirmPassword}
          onChangeText={setconfirmPassword}
          placeholder={Strings.ENTER_CONFIRM_PASS}
          style={styles.inputStyle}
          maxLength={16}
          secureTextEntry
          onSubmitEditing={passwordMatch}
        />
        <Pressable
          onPress={onSignUp}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#A91004' : '#D31708',
            },
            styles.wrapperCustom,
          ]}>
          <Text style={styles.buttonTitleStyle}>{Strings.SIGN_UP}</Text>
        </Pressable>
        <Text style={styles.loginStyle}>
          {Strings.ALREADY_HAVE_A_C}{' '}
          <Text style={{color: '#0ED814'}} onPress={onLoginPress}>
            {Strings.LOGIN}
          </Text>
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = {
  ParentBackgroundColor: {
    backgroundColor: 'gray',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputStyle: {
    height: 50,
    borderWidth: 0,
    width: '100%',
    marginBottom: 10,
    paddingLeft: 20,
    borderColor: '#C7F5F3',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonTitleStyle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  wrapperCustom: {
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    padding: 6,
    marginVertical: 20,
  },
  loginStyle: {
    color: '#fff',
  },
};

export default SignUp;
