import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const iconSize = 30,
  iconColor = 'white';

const icons = [
  'home',
  'table-search',
  'face-profile-woman',
  'account-settings',
];

export default function CopyMe() {
  const children = icons.map(name => (
    <Icon key={name} name={name} size={iconSize} color={iconColor} />
  ));
  return <View style={[style.view]}>{children}</View>;
}

const style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: Colors.blue700,
  },
});
