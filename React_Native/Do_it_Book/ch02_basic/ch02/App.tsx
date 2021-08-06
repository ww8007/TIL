import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import Person from './src/screens/Person';
import * as D from './src/data';

const people = D.makeArray(100).map(D.createRandomPerson);

export default function App() {
  // const children = people.map(person => (
  //   <Person key={person.id} person={person} />
  // ));
  return (
    <SafeAreaView>
      <ScrollView>
        {people.map(person => (
          <Person key={person.id} person={person} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
