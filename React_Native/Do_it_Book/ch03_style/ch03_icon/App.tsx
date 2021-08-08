import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
  Text,
  View,
} from 'react-native';
import * as D from './src/data';

const avatarUrl = D.randomAvatarUrl();
const avatarSize = 50;

const text = 'Almost before we knew it, we had left the ground';

export default function App() {
  return (
    <SafeAreaView style={[styles.flex]}>
      <ImageBackground
        style={[styles.imageBackground, styles.flex]}
        source={require('./src/assets/images/bg.jpg')}>
        <Image source={{uri: avatarUrl}} style={styles.image} />
        <View style={[styles.flex, styles.padding10]}>
          <Text style={[styles.regular, styles.text]}>{text} []</Text>
          <Text style={[styles.medium, styles.text]}>{text} []</Text>
          <Text style={[styles.semiBold, styles.text]}>{text} []</Text>
          <Text style={[styles.bold, styles.text]}>{text} []</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  imageBackground: {padding: 10},
  image: {width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2},
  padding10: {padding: 10},
  text: {textAlign: 'center', fontSize: 25, color: 'black', marginBottom: 10},

  regular: {fontFamily: 'DancingScript-Regular', fontWeight: '400'},
  medium: {fontFamily: 'DancingScript-Medium', fontWeight: '500'},
  semiBold: {fontFamily: 'DancingScript-SemiBold', fontWeight: '600'},
  bold: {
    fontFamily: 'DancingScript-Bold',
    fontWeight: Platform.select({ios: '700', android: '600'}),
  },
});
