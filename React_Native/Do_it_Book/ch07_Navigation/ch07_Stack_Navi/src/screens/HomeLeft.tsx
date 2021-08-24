/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  SafeAreaView,
  View,
  Text,
  TopBar,
  UnderlineText,
} from '../theme/navigation';
import {useNavigation} from '@react-navigation/native';
import * as D from '../data';
const title = 'HomeLeft';
export default function CopyMe() {
  const navigation = useNavigation();
  const goBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack();
  }, []);
  const goRight = useCallback(() => {
    navigation.navigate('HomeRight', {id: D.randomId()});
  }, []);
  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <TopBar>
          <UnderlineText onPress={goBack} style={styles.text}>
            go back
          </UnderlineText>
          <UnderlineText
            onPress={goRight}
            style={[styles.text, {marginLeft: 10}]}>
            go Right
          </UnderlineText>
        </TopBar>
        <View style={[styles.content]}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
      <Text style={[styles.text]}>{title}</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  view: {flex: 1, padding: 5},
  text: {fontSize: 20},
  content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
