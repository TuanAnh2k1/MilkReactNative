import React from 'react';
import {
  FlexAlignType,
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import GetColors from '../utils/CommonColors';
import DeviceInfo from '../utils/DeviceInfo';

interface Props {
  title?: string;
  onPressLeft?(): void;
  alignItems?: FlexAlignType;
  titleStyle?: ViewStyle | TextStyle;
  style?: ViewStyle;
  iconStyle?: ImageStyle;
}

const NavBar = (props: Props) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.row}>
        {props.onPressLeft && (
          <Pressable style={styles.backBtn} onPress={props.onPressLeft}>
            <Image
              source={require('../assets/arrow-left.png')}
              style={[styles.icon, props.iconStyle]}
            />
          </Pressable>
        )}
        <View
          style={[
            styles.titleContainer,
            {alignItems: props.alignItems ? props.alignItems : 'center'},
          ]}>
          <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
        </View>
        {props.onPressLeft && <View style={styles.backBtn} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: DeviceInfo.STATUSBAR_HEIGHT,
    backgroundColor: GetColors().WHITE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    height: 48,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: GetColors().WHITE,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default NavBar;
