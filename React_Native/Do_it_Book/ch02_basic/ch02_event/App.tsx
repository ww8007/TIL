import React from 'react';
import {SafeAreaView, Alert} from 'react-native';
import {Text} from 'react-native';

const onPress = () => Alert.alert('home pressed', 'message');

export default function App() {
  return (
    <SafeAreaView>
      <Text onPress={onPress}>Press me</Text>
    </SafeAreaView>
  );
}
