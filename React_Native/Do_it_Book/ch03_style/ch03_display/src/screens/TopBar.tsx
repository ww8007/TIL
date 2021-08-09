import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as D from '../data';

const name = D.randomName();
const avatarUrl = D.randomAvatarUrl(name);

export default function CopyMe() {
  return (
    <View style={[style.view]}>
      <Image style={style.avatar} source={{uri: avatarUrl}} />
      <View style={style.centerView}>
        <Text style={[style.text]}>{name}</Text>
      </View>
      <Icon name="menu" size={24} color="white" />
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    padding: 5,
    backgroundColor: Colors.blue900,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {fontSize: 20, color: 'white', textAlign: 'center'},
  avatar: {width: 40, height: 40, borderRadius: 20},
  centerView: {flex: 1},
});
