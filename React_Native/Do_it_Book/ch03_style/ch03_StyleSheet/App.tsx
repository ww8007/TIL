import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';
import Color from 'color';

console.log(Colors.blue500);
console.log(Color(Colors.blue500).alpha(0.5).lighten(0.5).string());

export default function App() {
  return (
    <SafeAreaView style={[styles.safeAreaView]}>
      <Text style={[styles.text]}>Hello</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue500,
  },
  text: {
    fontSize: 20,
    color: Color(Colors.blue500).alpha(0.7).lighten(0.9).string(),
  },
});
