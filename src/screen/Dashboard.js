import React from 'react';
import {View, Text} from 'react-native';

import Strings from '../Constant';

const Dashboard = ({navigation, route}) => {
  console.log('scs', navigation, route);
  const userData = route.params.data;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Strings.DASHBOARD}</Text>

      <View style={styles.userStyle}>
        <Text>{userData.userName}</Text>
        <Text>{userData.email}</Text>
        <Text>{userData.mobileNumber}</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F7F2F2',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  userStyle: {justifyContent: 'center', flex: 1, marginBottom: 100},
};

export default Dashboard;
