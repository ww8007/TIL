import React, {ReactNode, ComponentProps} from 'react';
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  PanResponderGestureState,
  Platform,
  LayoutChangeEvent,
  Animated,
} from 'react-native';
import type {FC} from 'react';
import {
  useAnimatedValue,
  useLayout,
  usePanResponder,
  useToggle,
  useTransformStyle,
} from '../hooks';
import {useScrollEnabled} from '../contexts';

type Event = GestureResponderEvent;
type State = PanResponderGestureState;

const ios = Platform.OS === 'ios';

type SwipeComponent = (setLayout: (e: LayoutChangeEvent) => void) => ReactNode;

export type LeftSwipeProps = ComponentProps<typeof View> & {
  left?: SwipeComponent;
};

export const LeftSwipe: FC<LeftSwipeProps> = ({
  left,
  children,
  style,
  ...viewProps
}) => {
  const [scrollEnabled, setScrollEnabled] = useScrollEnabled();
  const [{width: leftWidth}, setLayout] = useLayout();

  const translateX = useAnimatedValue(0);

  const transformStyle = useTransformStyle(
    {
      translateX: translateX.interpolate({
        inputRange: [0, leftWidth],
        outputRange: [-leftWidth, 0],
      }),
    },
    [leftWidth],
  );

  const [show, toggleShow] = useToggle();

  const panResponder = usePanResponder(
    {
      onPanResponderGrant() {
        ios && setScrollEnabled(false);
      },
      onPanResponderMove(e: Event, s: State) {
        const {dx} = s;
        if (!show && dx < 0) {
          return;
        }
        translateX.setValue(dx);
      },
      onPanResponderRelease(e: Event, s: State) {
        ios && setScrollEnabled(true);

        const {dx} = s;
        if (!show && dx < 0) {
          return; // 이 움직임 무시
        }
        Animated.spring(translateX, {
          useNativeDriver: false,
          toValue: show ? 0 : leftWidth,
        }).start(toggleShow);
      },
    },
    [show, leftWidth],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <Animated.View style={[transformStyle, styles.animViewStyle, style]}>
      {left && left(setLayout)}
      <View style={[{width: '100%'}]} {...panResponder.panHandlers}>
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animViewStyle: {flexDirection: 'row', width: '100%'},
});
