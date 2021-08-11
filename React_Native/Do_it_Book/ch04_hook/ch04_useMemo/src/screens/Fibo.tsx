import React, {useMemo} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Colors} from 'react-native-paper';
import * as D from '../data';
import {fibonacci} from './fibonacci';

const title = 'Fibo';
export default function Fibo() {
  const memorizedFibonacci = useMemo(() => fibonacci, []);
  const fibos = useMemo(
    () =>
      D.makeArray(21).map((my, index) => ({
        number: index,
        fibonacci: memorizedFibonacci(index),
      })),
    [],
  );
  return (
    <View style={[styles.view]}>
      {console.log(fibos)}
      <Text style={[styles.text]}>{title}</Text>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.flatList}
        data={fibos}
        renderItem={({item}) => (
          <Text style={styles.text}>
            {item.number} : {item.fibonacci}
          </Text>
        )}
        keyExtractor={item => item.number.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  view: {flex: 1, padding: 5, backgroundColor: Colors.blue900},
  text: {fontSize: 20, color: 'white'},
  flatList: {width: '100%'},
  contentContainerStyle: {alignItems: 'center'},
});
