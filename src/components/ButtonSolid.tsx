import React from 'react';
import {ViewStyle, StyleSheet, Text, Pressable, TextStyle} from 'react-native';
import GetColors from '../utils/CommonColors';

export interface ButtonSolidProps {
  style?: ViewStyle | ViewStyle[];
  title: string;
  onPress(): void;
  disabled?: boolean;
  titleStyle?: TextStyle;
}

const ButtonSolid = (props: ButtonSolidProps) => {
  const onPress = () => {
    if (props.disabled) return;
    props.onPress();
  };
  return (
    <Pressable
      style={[
        styles.btnContainer,
        {opacity: props.disabled ? 0.5 : 1},
        props.style,
      ]}
      key={props.disabled ? 'disabledBtn' : 'enableBtn'}
      onPress={onPress}>
      <Text style={[styles.normalText, props.titleStyle]}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GetColors().MAIN,
  },
  normalText: {
    color: GetColors().WHITE,
    fontSize: 16,
  },
});

export default ButtonSolid;
