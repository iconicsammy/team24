/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {

} from 'react-native/Libraries/NewAppScreen';
import AppProvider from 'context/AppProvider';
import Card from './src/components/Card/Card';



const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProvider>

      
      <ScrollView
      contentContainerStyle={{flex: 1}}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.mainBackground}>
       <Card/>
      </ScrollView>

    </AppProvider>
  );
};

const styles = StyleSheet.create({
  mainBackground: {
   backgroundColor: '#6cd8fc'
  }
});

export default App;
