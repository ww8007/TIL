import React from 'react';
import {Image} from 'react-native';
import type {StyleProp, ImageStyle} from 'react-native';
import TouchableView, {TouchableViewProps} from './TouchableView';

export type AvatarProps = TouchableViewProps & {
  uri: string;
  size: number;
  imageStyle?: StyleProp<ImageStyle>;
};

export default function Avatar({
  size,
  uri,
  imageStyle,
  ...touchableViewProp
}: AvatarProps) {
  return (
    <TouchableView {...touchableViewProp}>
      <Image
        source={{uri}}
        style={[
          imageStyle,
          {width: size, height: size, borderRadius: size / 2},
        ]}
      />
    </TouchableView>
  );
}
