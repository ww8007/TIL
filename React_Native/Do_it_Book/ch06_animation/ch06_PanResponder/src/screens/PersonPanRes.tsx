import React, {useCallback, useState, useRef, useEffect, useMemo} from 'react';
import type {FC} from 'react';
import {Platform, PanResponder} from 'react-native';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type {
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import moment from 'moment-with-locales-es6';
import {View, Text} from '../theme/paper';
import {useToggle} from '../hooks'; // add
import * as D from '../data';
import {Avatar, IconText} from '../components';
import {styles} from './Person.style';
import {useScrollEnabled} from '../contexts';

moment.locale('ko');

const ios = Platform.OS === 'ios';

type Event = GestureResponderEvent;
type State = PanResponderGestureState;

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const Person: FC<PersonProps> = ({person, deletePressed}) => {
  const [gestureState, setGestureState] = useState<State | null>(null);
  const [scrollEnabled, setScrollEnabled] = useScrollEnabled();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder() {
      return true;
    },
    onPanResponderGrant(e: Event, s: State) {
      ios && setScrollEnabled(false);
      setGestureState(s);
    },
    onPanResponderRelease(e: Event, s: State) {
      setGestureState(s);
      ios && setScrollEnabled(true);
    },
    onMoveShouldSetPanResponder() {
      return true;
    },
    onPanResponderMove(e: Event, s: State) {
      setGestureState(s);
    },
  });
  return (
    <View background style={[{width: '100%'}]}>
      <Text>scrollEnabled: {scrollEnabled ? 'true' : 'false'}</Text>
      <View accent {...panResponder.panHandlers} style={{height: 300, flex: 1}}>
        {gestureState && <Text>{JSON.stringify(gestureState, null, 2)}</Text>}
      </View>
    </View>
  );
};
export default Person;
