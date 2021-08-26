import {StyleSheet} from 'react-native'
import {Colors} from 'react-native-paper'
import color from 'color'

export const styles = StyleSheet.create({
  view: {flexDirection: 'row', padding: 5},
  leftView: {padding: 5},
  avatar: {
    borderColor: color(Colors.blue500).lighten(0.5).string(),
    borderWidth: 2
  },
  rightView: {flex: 1, padding: 5, marginRight: 10},
  name: {marginRight: 5, fontSize: 22, fontWeight: '500'},
  email: {},
  dateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    marginTop: 5
  },
  text: {fontSize: 16},
  comments: {marginTop: 10, fontSize: 16},
  image: {height: 150, marginTop: 15},
  countsView: {
    flexDirection: 'row',
    padding: 3,
    justifyContent: 'space-around'
  },
  countView: {flexDirection: 'row', alignItems: 'center'},
  touchableIcon: {flexDirection: 'row', padding: 5, alignItems: 'center'}
})
