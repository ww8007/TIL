import React, {useCallback, useState, useRef, useEffect, useMemo} from 'react';
import type {FC} from 'react';
import {View, Text, Image, Alert, Animated, Easing} from 'react-native';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment-with-locales-es6';
import {useAnimatedValue, useStyle, useToggle} from '../hooks'; // add
import * as D from '../data';
import {Avatar, IconText} from '../components';
import {styles} from './Person.style';

moment.locale('ko');

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const Person: FC<PersonProps> = ({person, deletePressed}) => {
  const animValue = useAnimatedValue(10);
  const [fontSize, setFontSize] = useState<number>(0);
  const _fontSize = new Animated.Value(fontSize);

  const nameAnimStyle = useStyle(
    {
      fontSize: Animated.add(_fontSize, animValue),
    },
    [fontSize],
  );
  const increaseFontSize = useCallback(
    (fontSize: number) => () => {
      setFontSize(() => fontSize);
    },
    [],
  );
  return (
    <View style={[styles.view]}>
      <View style={[styles.rightView]}>
        <Animated.Text style={[styles.name, nameAnimStyle]}>
          {person.name}
        </Animated.Text>
        <Text style={[styles.email]}>{person.email}</Text>

        <View style={[styles.countsView]}>
          <Text
            onPress={increaseFontSize(20)}
            style={[styles.text, styles.iconText]}>
            set fontSize +20
          </Text>
          <Text
            onPress={increaseFontSize(30)}
            style={[styles.text, styles.iconText]}>
            set fontSize +30
          </Text>
          <Text
            onPress={increaseFontSize(40)}
            style={[styles.text, styles.iconText]}>
            set fontSize +40
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Person;
