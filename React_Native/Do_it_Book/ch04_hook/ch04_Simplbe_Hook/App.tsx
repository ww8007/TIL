import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
const time = new Date();
export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={[styles.digitFont, styles.time]}>
        {time.toLocaleTimeString()}
      </Text>
      <Text style={styles.digitFont}>{time.toLocaleDateString()}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  digitFont: {fontFamily: 'MajorMonoDisplay-Regular', fontWeight: '400'},
  time: {fontSize: 40},
});
