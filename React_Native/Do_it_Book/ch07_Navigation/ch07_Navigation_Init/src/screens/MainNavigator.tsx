import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function MainNavigator() {
  return (
    <View style={[styles.view]}>
      <Text style={styles.text}>This is top text.</Text>
      <Text style={styles.text}>This is bottom text.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', justifyContent: 'space-between'},
  text: {color: 'black'},
});
