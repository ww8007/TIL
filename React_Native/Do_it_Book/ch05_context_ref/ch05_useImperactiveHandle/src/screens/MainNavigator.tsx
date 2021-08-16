import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import Themed from './Themed';
import Imeractive from './Imperative';

export default function MainNavigator() {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    {key: 'themed', title: 'Themed', icon: 'home'},
    {key: 'imperactive', title: 'Imperative', icon: 'keyboard-settings'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    themed: Themed,
    imperactive: Imeractive,
  });
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
