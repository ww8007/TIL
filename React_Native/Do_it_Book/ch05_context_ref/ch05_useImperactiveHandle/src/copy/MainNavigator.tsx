import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';

export default function MainNavigator() {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    //{key: 'home', title: 'Home', icon: 'home'}
  ]);

  const renderScene = BottomNavigation.SceneMap({
    //home: Home,
  });
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
