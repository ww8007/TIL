import React from 'react';
import {Text} from 'react-native';
import * as D from '../data';

const person = D.createRandomPerson();
const ArrowComponent = () => {
  return <Text>{JSON.stringify(person, null, 2)}</Text>;
};

export default ArrowComponent;
