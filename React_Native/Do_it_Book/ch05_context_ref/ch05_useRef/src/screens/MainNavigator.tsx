import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import Home from './Home';
import Input from './Input';
import KeyboardAvoid from './KeyboardAvoid';
import KeyboardAware from './KeyboardAware';
import AutoFocus from './AutoFocus';
export default function MainNavigator() {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    {key: 'home', title: 'Home', icon: 'home'},
    {key: 'input', title: 'Input', icon: 'apple-keyboard-caps'},
    {key: 'avoid', title: 'KeyboardAvoid', icon: 'keyboard-variant'},
    {key: 'aware', title: 'KeyboardAware', icon: 'keyboard-settings-outline'},
    {key: 'auto', title: 'AutoFocus', icon: 'home-automation'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    input: Input,
    avoid: KeyboardAvoid,
    aware: KeyboardAware,
    auto: AutoFocus,
  });
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
