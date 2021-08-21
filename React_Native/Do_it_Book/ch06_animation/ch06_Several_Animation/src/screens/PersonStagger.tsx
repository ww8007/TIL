/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useMemo} from 'react';
import type {FC} from 'react';
import {View, Text, Image, Animated, Platform} from 'react-native';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment-with-locales-es6';
import {useAnimatedValues, useToggle, useLayout} from '../hooks'; // add
import * as D from '../data';
import {Avatar} from '../components';
import {styles} from './Person.style';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome';
import {interpolate} from '../utils';
moment.locale('ko');

const AnimatedIcon = Animated.createAnimatedComponent(FontawesomeIcon);
const iconSize = 30;
const delay = 1000;

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const Person: FC<PersonProps> = ({person, deletePressed}) => {
  const [started, toggleStarted] = useToggle();
  const [layout, setLayout] = useLayout();

  const balls = useMemo(
    () => [Colors.pink500, Colors.lime500, Colors.lightBlue500],
    [],
  );

  const animValues = useAnimatedValues(balls.length);

  const startAnimations = useMemo(
    () =>
      balls
        .map((notUsed, index) =>
          Animated.spring(animValues[index], {
            useNativeDriver: true,
            toValue: 1,
          }),
        )
        .reverse(),
    [],
  );
  const endAnimations = useMemo(
    () =>
      balls.map((notUsed, index) =>
        Animated.spring(animValues[index], {
          useNativeDriver: true,
          toValue: 0,
        }),
      ),
    [],
  );
  const avatarPressed = useCallback(() => {
    if (Platform.OS === 'ios') {
      Animated.stagger(delay, [...startAnimations, ...endAnimations]).start(
        toggleStarted,
      );
    } else {
      Animated.sequence([...startAnimations, ...endAnimations]).start(
        toggleStarted,
      );
    }
  }, [started]);
  const icons = useMemo(
    () =>
      balls.map((color, index) => {
        const numberOfIcons = balls.length;
        const animValue = animValues[index];
        const animStyle = {
          transform: [
            {
              translateX: interpolate(animValue, [
                0,
                layout.width - numberOfIcons * iconSize,
              ]),
            },
            {rotate: interpolate(animValue, ['0deg', '720deg'])},
          ],
        };
        return (
          <AnimatedIcon
            key={color}
            style={[animStyle]}
            name="soccer-ball-o"
            size={iconSize}
            color={color}
          />
        );
      }),
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
        <Text style={[styles.name]}>{person.name}</Text>
        <Text style={[styles.email]}>{person.email}</Text>
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
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={[styles.text, styles.comments]}>
          {person.comments}
        </Text>
        <Image style={[styles.image]} source={{uri: person.image}} />
        <View
          onLayout={setLayout}
          style={[styles.countsView, {justifyContent: 'flex-start'}]}>
          {icons}
        </View>
      </View>
    </View>
  );
};
export default Person;
