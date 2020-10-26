import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Strings from './constant';

const Login = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('FoodMenu');
  };

  return (
    <View style={style.container}>
      <Pressable onPress={onPress}>
        <Text>{Strings.FIND_FOOD_MENU}</Text>
      </Pressable>
    </View>
  );
};

const style = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Login;
