// 초기 모습
/*
import React from 'react'
import type {FC, ReactNode} from 'react'
import {TouchableOpacity, View} from 'react-native'

export type TouchableViewProps = {
  children?: ReactNode
}
export const TouchableView: FC<TouchableViewProps> = ({children}) => {
  return (
    <TouchableOpacity>
      <View>{children}</View>
    </TouchableOpacity>
  )
}
*/
// 타입스크립트 교집합 타입과 JSX 전개 연산자 구문 혼합 사용
/*
import React from 'react'
import type {FC, ReactNode, ComponentProps} from 'react'
import {TouchableOpacity, View} from 'react-native'

type TouchableOpacityProps = ComponentProps<typeof TouchableOpacity>
export type TouchableViewProps = TouchableOpacityProps & {
  children?: ReactNode
}

export const TouchableView: FC<TouchableViewProps> = ({
  children, ...touchableProps}) => {
  return (
    <TouchableOpacity {...touchableProps}>
      <View>{children}</View>
    </TouchableOpacity>
  )
}
*/
// FC 타입이 children 속성을 제공하는 것에 착안한 구현
/*
import React from 'react'
import type {FC, ReactNode, ComponentProps} from 'react'
import {TouchableOpacity, View} from 'react-native'

type TouchableOpacityProps = ComponentProps<typeof TouchableOpacity>
export type TouchableViewProps = TouchableOpacityProps

export const TouchableView: FC<TouchableViewProps> = ({
  children, ...touchableProps}) => {
  return (
    <TouchableOpacity {...touchableProps}>
      <View>{children}</View>
    </TouchableOpacity>
    )
  }
  */
// 최종 모습
import React from 'react'
import type {FC, ComponentProps} from 'react'
import {TouchableOpacity, View} from 'react-native'
import type {StyleProp, ViewStyle} from 'react-native'
type TouchableOpacityProps = ComponentProps<typeof TouchableOpacity>
export type TouchableViewProps = TouchableOpacityProps & {
  viewStyle?: StyleProp<ViewStyle>
}

export const TouchableView: FC<TouchableViewProps> = ({
  children,
  viewStyle,
  ...touchableProps
}) => {
  return (
    <TouchableOpacity {...touchableProps}>
      <View style={[viewStyle]}>{children}</View>
    </TouchableOpacity>
  )
}
