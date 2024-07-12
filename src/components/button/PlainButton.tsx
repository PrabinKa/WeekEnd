import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {COLORS, pixelSizeHorizontal} from '../../constants';

interface PlainButtonProps {
  children: ReactNode;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const PlainButton: React.FC<PlainButtonProps> = ({
  children,
  onPress,
  containerStyle,
  textStyle,
}) => {
  const {container, buttonText} = styles;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[container, containerStyle]}>
      <Text style={[buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default PlainButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: pixelSizeHorizontal(20),
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '700',
  },
});
