import React, {useEffect, useLayoutEffect, useCallback} from 'react';
import {Platform, StyleSheet, View, Text} from 'react-native';
import {Colors} from 'react-native-paper';
import type {LayoutChangeEvent} from 'react-native';

export default function LifeCycle() {
  useEffect(() => {
    console.log(Platform.OS, 'useEffect called');
    return () => console.log(Platform.OS, 'useEffect finished');
  }, []);
  useLayoutEffect(() => {
    console.log(Platform.OS, 'useLayoutEffect called');
    return () => console.log(Platform.OS, 'useLayoutEffect finished');
  }, []);
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const {layout} = e.nativeEvent;
    console.log(Platform.OS, 'onLayout called', layout);
  }, []);
  console.log(Platform.OS, 'render start');

  return (
    <View onLayout={onLayout} style={styles.view}>
      <Text style={styles.title}>LifeCycle</Text>
    </View>
  );
}
// prettier-ignore
const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', backgroundColor: Colors.blue100},
  title: {fontSize: 30, fontWeight: '600'},
  });
