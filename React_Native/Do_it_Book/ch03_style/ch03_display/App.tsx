import React from 'react';
import {SafeAreaView, View, StyleSheet, Platform} from 'react-native';
import {Colors} from 'react-native-paper';
import TopBar from './src/screens/TopBar';
import BottomBar from './src/screens/BottomBar';
import Content from './src/screens/Content';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App() {
  return (
    <>
      <SafeAreaView style={[styles.flex]}>
        <TopBar />
        <Content />
        <BottomBar />
      </SafeAreaView>
      <View style={styles.absoluteView}>
        <Icon name="feather" size={50} color="white" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: Colors.lightBlue100},
  absoluteView: {
    backgroundColor: Colors.purple900,
    position: 'absolute',
    right: 30,
    bottom: Platform.select({ios: 100, android: 80}),
    padding: 10,
    borderRadius: 35,
  },
});
