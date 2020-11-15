// In App.js in a new project

import * as React from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import NetworkContext from './src/NetworkContext';
import Navigation from './src/route';

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
    <>
      <NetworkContext.Provider value={networkStatus}>
        <Navigation />
      </NetworkContext.Provider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;
