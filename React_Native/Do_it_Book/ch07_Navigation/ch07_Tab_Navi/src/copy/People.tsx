import React, {useState, useCallback, useEffect} from 'react'
import {StyleSheet, FlatList} from 'react-native'
import {SafeAreaView, View, UnderlineText, TopBar} from '../theme/navigation'
import {ScrollEnabledProvider, useScrollEnabled} from '../contexts'
import * as D from '../data'
import Person from './Person'

export default function People() {
  const [scrollEnabled] = useScrollEnabled()
  const [people, setPeople] = useState<D.IPerson[]>([])

  const addPerson = useCallback(() => {
    setPeople(people => [D.createRandomPerson(), ...people])
  }, [])
  const removeAllPersons = useCallback(() => {
    setPeople(notUsed => [])
  }, [])
  const deletePerson = useCallback(
    (id: string) => () =>
      setPeople(people => people.filter(person => person.id != id)),
    []
  )
  useEffect(() => D.makeArray(5).forEach(addPerson), [])

  return (
    <SafeAreaView>
      <ScrollEnabledProvider>
        <View style={[styles.view]}>
          <TopBar>
            <UnderlineText onPress={addPerson} style={styles.text}>
              add
            </UnderlineText>
            <UnderlineText onPress={removeAllPersons} style={styles.text}>
              remove all
            </UnderlineText>
          </TopBar>
          <FlatList
            scrollEnabled={scrollEnabled}
            data={people}
            renderItem={({item}) => (
              <Person person={item} deletePressed={deletePerson(item.id)} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollEnabledProvider>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  view: {flex: 1},
  text: {marginRight: 10, fontSize: 20}
})
