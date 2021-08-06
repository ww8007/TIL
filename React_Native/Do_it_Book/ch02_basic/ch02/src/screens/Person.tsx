import React from 'react';
import type {FC} from 'react';
import {Text} from 'react-native';
import * as D from '../data';

export type PersonProps = {
  person: D.IPerson;
};
export default function Person({person}: PersonProps) {
  return <Text>{JSON.stringify(person, null, 2)}</Text>;
}
export const Person2: FC<PersonProps> = ({person}) => {
  return <Text>{JSON.stringify(person, null, 2)}</Text>;
};
