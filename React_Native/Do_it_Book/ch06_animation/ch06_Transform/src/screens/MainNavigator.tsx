import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import Transform from './Transform';
import InsideLayout from './InsideLayout';
import Arithmetic from './Arithmetic';
import Carousel from './Carousel';

export default function MainNavigator() {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    {key: 'transform', title: 'Transform', icon: 'arrow-collapse-right'},
    {key: 'layout', title: 'InsideLayout', icon: 'animation-play-outline'},
    {key: 'arithmetic', title: 'Arithmetic', icon: 'format-annotation-plus'},
    {key: 'Carousel', title: 'Carousel', icon: 'border-vertical'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    transform: Transform,
    layout: InsideLayout,
    arithmetic: Arithmetic,
    Carousel: Carousel,
  });
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
