import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';

import Strings from '../Constant';

const Dashboard = () => {
  const employeeData = useSelector((state) => state.dashboard.user);
  const Item = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subTitle}>age: {item.age}</Text>
      <Text style={styles.subTitle}>gender: {item.gender}</Text>
      <Text style={styles.subTitle}>email: {item.email}</Text>
      <Text style={styles.subTitle}>mobile number: {item.phoneNo}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{Strings.DASHBOARD}</Text>
      <FlatList
        data={employeeData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default Dashboard;
