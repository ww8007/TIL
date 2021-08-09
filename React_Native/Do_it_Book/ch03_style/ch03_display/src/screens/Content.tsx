import React from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {Colors} from 'react-native-paper';
import * as D from '../data';

const avatars = D.makeArray(200).map(() => D.randomAvatarUrl());

export default function CopyMe() {
  const children = avatars.map((avatarUrl, index) => (
    <View key={index.toString()} style={style.avatarView}>
      <Image style={style.avatar} source={{uri: avatarUrl}} />
    </View>
  ));
  return (
    <ScrollView contentContainerStyle={[style.view]}>{children}</ScrollView>
  );
}

const style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    overflow: 'hidden',
    flexWrap: 'wrap',
    justifyContent: 'center',

    padding: 5,
    backgroundColor: Colors.blue500,
  },
  text: {fontSize: 20, color: 'white'},
  avatarView: {padding: 3},
  avatar: {width: 50, height: 50, borderRadius: 25},
});
