/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {useAutoFocus, AutoFocusProvider} from '../contexts';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// prettier-ignore
import {SafeAreaView, View, Text, TextInput, TouchableView, UnderlineText}
from '../theme';
import * as D from '../data';

const Login = () => {
  const [person, setPerson] = useState<D.IPerson>(D.createRandomPerson());

  const [password, setPassword] = useState<string>(
    D.random(10000, 1000000).toString(),
  );
  const focus = useAutoFocus();
  const navigation = useNavigation();
  const goHomeNavigator = useCallback(
    () => navigation.navigate('TabNavigator'),
    [],
  );
  const goSignUp = useCallback(() => navigation.navigate('SignUp'), []);

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        {/* <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}> */}
        <View style={[styles.textView]}>
          <Text style={[styles.text]}>ID</Text>
          <View border style={[styles.textInputView]}>
            <TextInput
              onFocus={focus}
              style={[styles.textInput]}
              value={person.email}
              onChangeText={email => setPerson(person => ({...person, email}))}
              placeholder="enter your ID"
            />
          </View>
        </View>
        <View style={[styles.textView]}>
          <Text style={[styles.text]}>password</Text>
          <View border style={[styles.textInputView]}>
            <TextInput
              secureTextEntry
              onFocus={focus}
              style={[styles.textInput]}
              value={password}
              onChangeText={setPassword}
              placeholder="enter your password"
            />
          </View>
        </View>
        <TouchableView
          notification
          style={[styles.touchableView]}
          onPress={goHomeNavigator}>
          <Text style={[styles.text]}>Login</Text>
        </TouchableView>
        <UnderlineText
          style={[styles.text, {marginTop: 15}]}
          onPress={goSignUp}>
          SignUp
        </UnderlineText>
        {/* </AutoFocusProvider> */}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  view: {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
  text: {fontSize: 20},
  keyboardAwareFocus: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {width: '100%', padding: 5, marginBottom: 10},
  textInput: {fontSize: 24, padding: 10},
  textInputView: {marginTop: 5, borderRadius: 10},
  touchableView: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
