import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView, View, Text, TopBar} from '../theme/navigation';
import type FC from 'react';
import type {DrawerContentComponentProps} from '@react-navigation/drawer';
import {DrawerContentScrollView} from '@react-navigation/drawer';

const title = 'DrawerContent';

const DrawerContent: FC<DrawerContentComponentProps> = props => {
  const {navigation} = props;
  const go = useCallback(() => {}, []);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[styles.view]}>
      <TopBar />
      <View style={[styles.content]}>
        <Text style={[styles.text]}>{title}</Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  view: {flex: 1},
  text: {fontSize: 20},
  content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
