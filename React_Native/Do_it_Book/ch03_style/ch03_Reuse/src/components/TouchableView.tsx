import React from 'react';
import type {ReactNode, ComponentProps} from 'react';
import {View, TouchableOpacity} from 'react-native';
import type {StyleProp, ViewStyle} from 'react-native';

type TouchableOpacityProps = ComponentProps<typeof TouchableOpacity>;

export type TouchableViewProps = TouchableOpacityProps & {
  children?: ReactNode;
  viewStyle?: StyleProp<ViewStyle>;
};

export default function TouchableView({
  children,
  viewStyle,
  ...touchableProps
}: TouchableViewProps) {
  return (
    <TouchableOpacity {...touchableProps}>
      <View style={[viewStyle]}>{children}</View>
    </TouchableOpacity>
  );
}
