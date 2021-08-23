import React, {
  useCallback,
  useState,
  useEffect,
  ReactNode,
  ComponentProps,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  FlatList,
  GestureResponderEvent,
  PanResponderGestureState,
  Platform,
  LayoutChangeEvent,
} from 'react-native';
import type {FC} from 'react';
import {useTheme} from 'react-native-paper';
import {useToggleTheme} from '../contexts';
import {ScrollEnabledProvider, useScrollEnabled} from '../contexts';
import * as D from '../data';
import Person from './PersonLeftSwipe';

type SwipeComponent = (setLayout: (e: LayoutChangeEvent) => void) => ReactNode;

export type LeftSwipeProps = ComponentProps<typeof View> & {
  left?: SwipeComponent;
};

export default function LeftSwipe() {
  const [scrollEnabled] = useScrollEnabled();
  const [people, setPeople] = useState<D.IPerson[]>([]);
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  const addPerson = useCallback(() => {
    setPeople(people => [D.createRandomPerson(), ...people]);
  }, []);
  const removeAll = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setPeople(notUsed => []);
  }, []);

  const deletePerson = useCallback(
    (id: string) => () => {
      setPeople(people => people.filter(person => person.id !== id));
    },
    [],
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(addPerson, []);
  return (
    <View style={[styles.view, {backgroundColor: theme.colors.surface}]}>
      <View style={[styles.topBar, {backgroundColor: theme.colors.accent}]}>
        <Text onPress={addPerson} style={styles.text}>
          add
        </Text>
        <Text onPress={removeAll} style={styles.text}>
          remove all
        </Text>
        <View style={{flex: 1}} />
        <Switch value={theme.dark} onValueChange={toggleTheme} />
      </View>
      <FlatList
        scrollEnabled={scrollEnabled}
        data={people}
        renderItem={({item}) => (
          <Person person={item} deletePressed={deletePerson(item.id)} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {flex: 1},
  topBar: {flexDirection: 'row', padding: 5},
  text: {marginRight: 10, fontSize: 20},
});
