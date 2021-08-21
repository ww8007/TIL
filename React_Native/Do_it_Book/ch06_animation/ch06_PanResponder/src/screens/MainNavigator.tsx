import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import PanRes from './PanRes';
import Drag from './Drag';
import LeftSwipe from './LeftSwipe';
export default function MainNavigator() {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    {key: 'panRes', title: 'PanRes', icon: 'drag'},
    {key: 'drag', title: 'Drag', icon: 'drag-horizontal'},
    {key: 'leftSwipe', title: 'LeftSwipe', icon: 'arrow-expand-right'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    panRes: PanRes,
    drag: Drag,
    leftSwipe: LeftSwipe,
  });
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
