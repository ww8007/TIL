import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import Basic from './Basic';
import Monitor from './Monitor';
import Toggle from './Toggle';
import Interpolate from './Interpolate';

export default function MainNavigator() {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    {key: 'basic', title: 'Basic', icon: 'alpha-b-box'},
    {key: 'monitor', title: 'Monitor', icon: 'eye-circle'},
    {key: 'toggle', title: 'Toggle', icon: 'file-eye'},
    {key: 'interpolate', title: 'Interpolate', icon: 'bullseye'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    basic: Basic,
    monitor: Monitor,
    toggle: Toggle,
    interpolate: Interpolate,
  });
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
