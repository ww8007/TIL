/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useRef, useEffect, useMemo} from 'react';
import type {FC} from 'react';
import {View, Text, Image, Alert, Animated, Easing} from 'react-native';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment-with-locales-es6';
import {
  useToggle,
  useAnimatedValue,
  useStyle,
  useLayout,
  useTransformStyle,
} from '../hooks'; // add
import * as D from '../data';
import {Avatar, IconText} from '../components';
import {styles} from './Person.style';
import {interpolate} from '../utils';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesomeIcon);
const iconSize = 50;

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const Person: FC<PersonProps> = ({person: initialPerson, deletePressed}) => {
  const [person, setPerson] = useState<D.IPerson>(initialPerson);
  const [started, toggleStarted] = useToggle(false);

  const animValue = useAnimatedValue(0);

  const avatarPressed = useCallback(() => {
    Animated.timing(animValue, {
      useNativeDriver: false,
      toValue: started ? 0 : 1,
      duration: 1000,
      easing: Easing.bounce,
    }).start(toggleStarted);
  }, [started]);

  const [layout, setLayout] = useLayout();
  const iconAnimStyle = useTransformStyle(
    {
      translateX: interpolate(animValue, [0, layout.width - iconSize]),
      rotate: interpolate(animValue, ['0deg', '720deg']),
    },
    [layout.width],
  );
  return (
    <View style={[styles.view]}>
      <View style={[styles.leftView]}>
        <Avatar
          imageStyle={[styles.avatar]}
          uri={person.avatar}
          size={50}
          onPress={avatarPressed}
        />
      </View>
      <View style={[styles.rightView]}>
        <Animated.Text style={[styles.name]}>{person.name}</Animated.Text>
        <Animated.Text style={[styles.email]}>{person.email}</Animated.Text>
        <View style={[styles.dateView]}>
          <Text style={[styles.text]}>
            {moment(person.createdDate).startOf('day').fromNow()}
          </Text>
          <Icon
            name="trash-can-outline"
            size={26}
            color={Colors.lightBlue500}
            onPress={deletePressed}
          />
        </View>
        <Animated.Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={[styles.text, styles.comments]}>
          {person.comments}
        </Animated.Text>
        <View onLayout={setLayout} style={[{flexDirection: 'row', padding: 5}]}>
          <AnimatedIcon
            style={[iconAnimStyle]}
            name="soccer-ball-o"
            size={iconSize}
            color={Colors.blue500}
          />
        </View>
      </View>
    </View>
  );
};
export default Person;
