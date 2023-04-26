import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import GetColors from '../utils/CommonColors';
import DeviceInfo from '../utils/DeviceInfo';
import ButtonSolid from './ButtonSolid';

interface Props {
  style?: ViewStyle | ViewStyle[];
  buttonStyle?: ViewStyle;
  title: string;
  onPress(): void;
  disabled?: boolean;
}

const ButtonFooter = (props: Props) => {
  return (
    <View style={[styles.container, props.style]}>
      <ButtonSolid {...props} style={props.buttonStyle} />
      <View style={styles.bottomNotch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: GetColors().WHITE,
    shadowColor: '#E1E1E1',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },
  bottomNotch: {
    height: DeviceInfo.BOTTOM_PADDING,
  },
});

export default ButtonFooter;
