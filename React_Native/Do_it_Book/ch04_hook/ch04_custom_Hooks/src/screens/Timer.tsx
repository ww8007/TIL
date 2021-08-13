import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, Button} from 'react-native';
import {Colors} from 'react-native-paper';
import {useTimeout, useToggle} from '../hooks';

export default function Timer() {
  const [loading, toggleLoading] = useToggle(true);

  useTimeout(() => loading && toggleLoading(), 3000, [loading]);

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Timer</Text>
      <Text>loading: {loading.toString()}</Text>
      <Button
        onPress={toggleLoading}
        title={loading ? 'stop loading' : 'start loading'}
      />
      {loading && (
        <ActivityIndicator size="large" color={Colors.deepPurple700} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', backgroundColor: Colors.yellow300},
  title: {fontSize: 30, fontWeight: '600'},
});
