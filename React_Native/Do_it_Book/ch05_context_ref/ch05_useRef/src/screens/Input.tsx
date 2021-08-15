import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View, Text, TextInput, Keyboard} from 'react-native';
import {Switch} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {useToggleTheme} from '../contexts';
import * as D from '../data';

export default function CopyMe() {
  const [person, setPerson] = useState<D.IPerson>(D.createRandomPerson());
  const {dark, colors} = useTheme();
  const toggleTheme = useToggleTheme();
  const textInputRef = useRef<TextInput | null>(null);
  const setFocus = useCallback(
    () => textInputRef.current?.focus(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textInputRef.current],
  );
  return (
    <View style={[styles.view, {backgroundColor: colors.surface}]}>
      <View style={[styles.topBar, {backgroundColor: colors.accent}]}>
        <Text style={[styles.textButton]} onPress={setFocus}>
          focus
        </Text>
        <Text style={[styles.textButton]} onPress={Keyboard.dismiss}>
          dismiss keyboard
        </Text>
        <View style={{flex: 1}} />
        <Switch value={dark} onValueChange={toggleTheme} />
      </View>
      <View style={{flex: 1}} />
      <View style={[styles.textView]}>
        <Text style={[styles.textInput, {color: colors.text}]}>email</Text>
        <TextInput
          ref={textInputRef}
          style={[
            styles.textInput,
            {color: colors.text, borderColor: colors.placeholder},
          ]}
          value={person.email}
          placeholder="enter your email"
          onChangeText={email => setPerson(person => ({...person, email}))}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {flex: 1},
  topBar: {flexDirection: 'row', padding: 5},
  textButton: {marginLeft: 10, fontSize: 20},
  keyboardAvoidingView: {flex: 1, padding: 10},
  textView: {padding: 5},
  text: {fontSize: 20, color: 'white'},
  textInput: {fontSize: 24, borderWidth: 1, borderRadius: 5},
});
