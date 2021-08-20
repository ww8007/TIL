import React, {createContext, useCallback, useContext, useRef} from 'react';
import {findNodeHandle} from 'react-native';
import type {FC, ComponentProps} from 'react';
import type {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export type FocusEvent = NativeSyntheticEvent<TextInputFocusEventData>;

export type FocusContextType = {autoFocus: (e: FocusEvent) => void};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultFocusContext = {autoFocus: (e: FocusEvent) => {}};
const AutoFocusContext = createContext<FocusContextType>(defaultFocusContext);
export type AutoFocusProviderProps = ComponentProps<
  typeof KeyboardAwareScrollView
>;

export type AutoFocusContextType = {
  autoFocus: (e: FocusEvent) => void;
};

export const AutoFocusProvider: FC<AutoFocusProviderProps> = ({
  children,
  ...props
}) => {
  const scrollRef = useRef<KeyboardAwareScrollView | null>(null);
  const scrollInput = useCallback((reactNode: any) => {
    scrollRef.current?.scrollToFocusedInput(reactNode);
  }, []);
  const autoFocus = useCallback((e: FocusEvent) => {
    scrollInput(findNodeHandle(e.target));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const value = {autoFocus};
  return (
    <AutoFocusContext.Provider value={value}>
      <KeyboardAwareScrollView
        {...props}
        style={{flex: 1, width: '100%'}}
        ref={scrollRef}>
        {children}
      </KeyboardAwareScrollView>
    </AutoFocusContext.Provider>
  );
};

export const useAutoFocus = () => {
  const {autoFocus} = useContext(AutoFocusContext);
  return autoFocus;
};
