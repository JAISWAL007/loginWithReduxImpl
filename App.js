// In App.js in a new project

import * as React from 'react';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import store from './src/redux/store';
import Navigation from './src/route';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Navigation />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    </>
  );
};

export default App;
