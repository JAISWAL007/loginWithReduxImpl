// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screen/Login';
import FoodMenu from './src/screen/FoodMenu';
import NetInfo from '@react-native-community/netinfo';
import NetworkContext from './src/NetworkContext';

const Stack = createStackNavigator();

const App = () => {
  const [networkStatus, setNetworkStatus] = React.useState();

  React.useEffect(() => {
    NetInfo.addEventListener((state) => {
      setNetworkStatus(state.isConnected);
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
  }, []);

  return (
    <NetworkContext.Provider value={networkStatus}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="FoodMenu" component={FoodMenu} />
        </Stack.Navigator>
      </NavigationContainer>
    </NetworkContext.Provider>
  );
};

export default App;
