import React from 'react';
import {SafeAreaView, Alert, Button} from 'react-native';
import {TouchableOpacity, TouchableHighlight, Text} from 'react-native';

const onPress = () => Alert.alert('home pressed', 'message');

export default function App() {
  return (
    <SafeAreaView>
      <Button title="Home" onPress={onPress} />
      <TouchableOpacity onPress={onPress}>
        <Text>TouchableOpacity</Text>
      </TouchableOpacity>
      <TouchableHighlight onPress={onPress}>
        <Text>TouchableHighlight</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}
