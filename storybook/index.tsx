import React from 'react';
import {View, Text} from 'react-native';
import {AppRegistry} from 'react-native';
import {getStorybookUI, configure} from '@storybook/react-native';
import {addDecorator} from '@storybook/react';

import './rn-addons';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import rootReducer from '../src/redux/rootReducer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setTheme} from '../src/redux/globalSlice';

// import stories
configure(() => {
  require('../src/components/Resource.stories');
}, module);

const reduxStore = configureStore(rootReducer);

addDecorator((fn) => (
  <Provider store={reduxStore}>
    <TouchableOpacity
      onPress={() => {
        const state = reduxStore.getState();
        if (state.global.theme === 'light') {
          reduxStore.dispatch(setTheme('dark'));
        } else {
          reduxStore.dispatch(setTheme('light'));
        }
      }}>
      <Text>Toggle theme</Text>
    </TouchableOpacity>
    <View
      style={{
        paddingTop: 40,
        padding: 20,
        width: '100%',
      }}>
      {fn()}
    </View>
  </Provider>
));

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
