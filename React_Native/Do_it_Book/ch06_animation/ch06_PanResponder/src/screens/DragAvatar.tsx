import React, {useMemo} from 'react';
import type {FC} from 'react';
import {Animated, Platform} from 'react-native';
import type {
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import {Avatar} from '../components';
import * as D from '../data';
import {
  useAnimatedValueXY,
  useMonitorAnimatedValueXY,
  usePanResponder,
  useStyle,
  useTransformStyle,
} from '../hooks';
import {View, Text} from '../theme/paper';
import {useScrollEnabled} from '../contexts';
import {styles} from './Person.style';
import {tSParenthesizedType} from '@babel/types';

type Event = GestureResponderEvent;
type State = PanResponderGestureState;

const ios = Platform.OS === 'ios';

export type DragAvatarProps = {
  size: number;
  backgroundColor: string;
};

const DragAvatar: FC<DragAvatarProps> = ({size, backgroundColor}) => {
  const [scrollEnabled, setScrollEnabled] = useScrollEnabled();

  const animValueXY = useAnimatedValueXY();
  const realAnimValueXY = useMonitorAnimatedValueXY(animValueXY);

  const transformStyle = useTransformStyle({
    translateX: animValueXY.x,
    translateY: animValueXY.y,
  });
  const style = useStyle({
    backgroundColor,
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
  });
  const avatarUrl = useMemo(() => D.randomAvatarUrl(), []);
  const panResponder = usePanResponder({
    onPanResponderGrant() {
      ios && setScrollEnabled(false);
    },
    onPanResponderMove(e: Event, s: State) {
      const {dx, dy} = s;
      animValueXY.setValue({x: dx, y: dy});
    },
    onPanResponderRelease() {
      animValueXY.extractOffset();
      ios && setScrollEnabled(true);
    },
  });

  return (
    <View>
      <Text style={[styles.text]}>
        {JSON.stringify(realAnimValueXY, null, 2)}
      </Text>
      <Animated.View
        style={[style, transformStyle]}
        {...panResponder.panHandlers}>
        <Avatar uri={avatarUrl} size={60} />
      </Animated.View>
    </View>
  );
};

export default DragAvatar;
