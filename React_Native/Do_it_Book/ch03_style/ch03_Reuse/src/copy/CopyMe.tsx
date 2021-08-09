import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

const title = 'CopyMe';
export default function CopyMe() {
  return (
    <View style={[style.view]}>
      <Text style={[style.text]}>{title}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  view: {padding: 5, backgroundColor: Colors.blue900},
  text: {fontSize: 20, color: 'white'},
});
