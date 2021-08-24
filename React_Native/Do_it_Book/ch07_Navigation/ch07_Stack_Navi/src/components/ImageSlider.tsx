/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useMemo, useRef} from 'react';
import type {FC} from 'react';
import {Animated, FlatList, Image, StyleSheet, View} from 'react-native';
import type {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {Colors} from 'react-native-paper';
import {TouchableView} from './TouchableView';

import {
  useAnimatedValue,
  useMonitorAnimatedValue,
  useTransformStyle,
} from '../hooks';

export type ImageSliderProps = {
  imageUrls: string[];
  imageWidth: number;
  showThumbnails?: boolean;
};

const circleWidth = 10,
  circleMarginRight = 5,
  thumbnailSize = 30;

export const ImageSlider: FC<ImageSliderProps> = ({
  imageUrls,
  imageWidth,
  showThumbnails,
}) => {
  const flatListRef = useRef<FlatList | null>(null);
  const selectedIndexAnimValue = useAnimatedValue(0);
  const selectedIndex = useMonitorAnimatedValue(selectedIndexAnimValue);

  const circleWidthAnimValue = useAnimatedValue(circleWidth);
  const circleMarginRightAnimValue = useAnimatedValue(circleMarginRight);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (imageWidth === 0) {
        return;
      } // imageWidth가 0일 시 아래 index 변수값 무한 방식
      const {contentOffset} = event.nativeEvent;
      const index = Math.round(contentOffset.x / imageWidth);
      selectedIndexAnimValue.setValue(index);
    },
    [imageWidth],
  );

  const selectImage = useCallback(
    (index: number) => () => {
      flatListRef.current?.scrollToIndex({index});
    },
    [],
  );
  const translateX = useTransformStyle({
    translateX: Animated.multiply(
      selectedIndexAnimValue,
      Animated.add(circleWidthAnimValue, circleMarginRightAnimValue),
    ),
  });
  const circles = useMemo(
    () =>
      imageUrls.map((uri, index) => <View key={index} style={styles.circle} />),
    [],
  );
  const thumbnails = useMemo(
    () =>
      imageUrls.map((uri, index) => (
        <TouchableView
          key={index}
          onPress={selectImage(index)}
          style={[
            styles.thumbnail,
            {
              borderColor:
                index == selectedIndex ? Colors.lightBlue900 : 'transparent',
            },
          ]}>
          <Image
            source={{uri}}
            style={{width: thumbnailSize, height: thumbnailSize}}
          />
        </TouchableView>
      )),
    [selectedIndex],
  );

  return (
    <>
      <FlatList
        ref={flatListRef}
        horizontal={true}
        scrollEnabled={true}
        onScroll={onScroll}
        contentContainerStyle={{width: imageUrls.length * imageWidth}}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={imageUrls}
        renderItem={({item}) => (
          <Image
            style={[styles.image, {width: imageWidth}]}
            source={{uri: item}}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={[styles.iconBar, {justifyContent: 'center'}]}>
        <View style={{flexDirection: 'row'}}>
          {circles}
          <Animated.View
            style={[styles.circle, styles.selectedCircle, translateX]}
          />
        </View>
      </View>
      {showThumbnails && (
        <View style={[styles.iconBar, {justifyContent: 'space-between'}]}>
          {thumbnails}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {height: 150, resizeMode: 'cover'},
  iconBar: {flexDirection: 'row', padding: 5},
  thumbnail: {borderWidth: 1, padding: 2},
  circle: {
    width: circleWidth,
    height: circleWidth,
    borderRadius: circleWidth / 2,
    marginRight: circleMarginRight,
    backgroundColor: Colors.pink100,
  },
  selectedCircle: {position: 'absolute', backgroundColor: Colors.pink700},
});
