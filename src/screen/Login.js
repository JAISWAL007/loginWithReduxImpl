import React, {useState, useRef} from 'react';
import {Text, Pressable, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useIsFocused, StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Strings from '../Constant';

const Login = ({navigation}) => {
  const isFocused = useIsFocused();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userDetails, setUserDetails] = useState('');
  const ref_Password = useRef();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('loginCredentials');
      jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log('JsonValue', jsonValue);
      if (jsonValue) {
        setUserDetails(JSON.parse(jsonValue));
        console.log('jsonValue', jsonValue);
      }
    } catch (e) {
      // error reading value
      console.log('error1');
    }
  };

  React.useEffect(() => {
    getData();
  }, [isFocused]);

  const onPress = () => {
    if (userName && password) {
      if (
        userDetails.some(
          (val) => val.userName === userName || val.mobileNumber === userName,
        )
      ) {
        if (userDetails.some((val) => val.password === password)) {
          const user = userDetails.filter((val) => {
            if (val.userName === userName || val.mobileNumber === userName) {
              return val;
            }
          });
          navigation.dispatch(
            StackActions.replace('PostLogin', {
              screen: 'Dashboard',
              params: {data: user[0]},
            }),
          );
        } else {
          alert('username/ mobile or password are incorrect');
        }
      } else {
        alert('user not register please register first');
      }
    } else {
      Toast.show({
        type: 'error',
        text1: Strings.ERROR_LOGIN,
      });
    }
  };

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  const validateUserName = (name) => {
    if (name) {
      return setUserName(name);
    }
    setUserName('');
    return Toast.show({
      type: 'error',
      text1: Strings.ERROR_MSG_USER_NAME,
      position: 'top',
    });
  };

  const validatePassword = (pass) => {
    if (pass) {
      return setPassword(pass);
    }
    setPassword('');
    return Toast.show({
      type: 'error',
      text1: Strings.ERROR_MSG_PASSWORD,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleStyle}>{Strings.LOGIN}</Text>
      <TextInput
        onChangeText={validateUserName}
        placeholder={Strings.ENTER_USER_NAME}
        style={styles.inputStyle}
        returnKeyType="next"
        onSubmitEditing={() => {
          ref_Password.current.focus();
        }}
        blurOnSubmit={false}
      />
      <TextInput
        ref={ref_Password}
        onChangeText={validatePassword}
        placeholder={Strings.ENTER_PASSWORD}
        style={styles.inputStyle}
        secureTextEntry
      />
      <View style={styles.forgotPasswordWrapper}>
        <Text
          style={styles.forgotPasswordStyle}
          onPress={() => alert(Strings.COMINGS_SOON)}>
          {Strings.FORGOT_PASSWORD}
        </Text>
      </View>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#0CA610' : '#0ED814',
          },
          styles.wrapperCustom,
        ]}>
        <Text style={styles.buttonTitleStyle}>{Strings.LOGIN}</Text>
      </Pressable>
      <Text style={styles.forgotPasswordStyle}>
        {Strings.DONT_HAVE_ACCOUNT}{' '}
        <Text style={{color: '#A91004'}} onPress={onSignUp}>
          {Strings.SIGN_UP}
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'gray',
    justifyContent: 'center',
    paddingBottom: 50,
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
    marginBottom: 20,
  },
  forgotPasswordStyle: {
    color: '#fff',
    marginBottom: 20,
  },
  forgotPasswordWrapper: {
    alignItems: 'flex-end',
    width: '100%',
  },
};

export default Login;
