import React from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Colors} from 'react-native-paper';
import color from 'color';

const {width, height} = Dimensions.get('window');
export default function App() {
  return (
    <SafeAreaView style={[styles.safeAreaView]}>
      <Text style={[styles.text]}>os: {Platform.OS}</Text>
      <Text style={[styles.text]}>width : {width}</Text>
      <Text style={[styles.text]}>height : {height}</Text>

      <View style={[styles.box, {borderRadius: 10}]} />
      <View style={[styles.box, styles.border]} />
      <View style={[styles.box, styles.border, {borderRadius: 10}]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.blue500,
    flex: 1,
    paddingLeft: Platform.select({ios: 0, android: 20}),
  },
  text: {
    marginBottom: 10,
    marginLeft: 50,
    fontSize: 20,
    marginTop: 20,
    color: color(Colors.blue500).alpha(0.7).lighten(0.9).string(),
  },
  box: {
    width: '70%',
    height: 100,
    backgroundColor: Colors.lime500,
    marginBottom: 10,
    marginLeft: Platform.select({ios: 20, android: 0}),
  },
  border: {
    borderWidth: 10,
    borderColor: color('black').alpha(0.3).string(),
  },
});
