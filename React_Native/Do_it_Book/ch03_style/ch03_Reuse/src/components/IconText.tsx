import React, {ComponentProps} from 'react';
import {TextStyle, StyleProp, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TouchableView from './TouchableView';
import type {TouchableViewProps} from './TouchableView';

export type IconTextProps = TouchableViewProps &
  ComponentProps<typeof Icon> & {
    text: number | string;
    textStyle: StyleProp<TextStyle>;
  };

export default function IconText({
  name,
  size,
  color,
  textStyle,
  text,
  ...touchableView
}: IconTextProps) {
  return (
    <TouchableView {...touchableView}>
      <Icon name={name} size={size} color={color} />
      <Text style={textStyle}>{text}</Text>
    </TouchableView>
  );
}
