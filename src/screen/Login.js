import React, {useState, useRef} from 'react';
import {Text, Pressable, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {StackActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Strings from '../Constant';

const Login = ({navigation}) => {
  const storeUserName = useSelector((state) => state?.login?.username);
  const storePassword = useSelector((state) => state?.login?.password);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const ref_Password = useRef();

  const onPress = () => {
    if (userName && password) {
      if (userName === storeUserName) {
        if (password === storePassword) {
          navigation.dispatch(
            StackActions.replace('PostLogin', {
              screen: 'Dashboard',
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

  const onSignUp = () => {};

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
        keyboardType="email-address"
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
        <Text
          style={{color: '#A91004'}}
          onPress={() => alert(Strings.COMINGS_SOON)}>
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
