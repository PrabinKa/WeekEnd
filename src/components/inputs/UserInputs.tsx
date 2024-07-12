import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, heightPixel} from '../../constants';

interface UserInputsProps extends TextInputProps {
  inputRef?: any;
  secureTextEntry?: boolean;
  onPress?: () => void;
  secureIcon?: string;
  icon?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const UserInputs: React.FC<UserInputsProps> = ({
  inputRef,
  secureTextEntry,
  onPress,
  secureIcon,
  icon,
  containerStyle,
  ...props
}) => {
  const {container, textInputStyles, pressedItem} = styles;
  return (
    <View style={[container, containerStyle]}>
      {icon && (
        <View>
          <Ionicons name={icon} size={24} color={COLORS.PRIMARY} />
        </View>
      )}
      <TextInput
        ref={inputRef}
        secureTextEntry={secureTextEntry}
        style={[
          textInputStyles,
          {
            width: secureIcon ? '75%' : '90%',
            maxWidth: secureIcon ? '75%' : '90%',
          },
        ]}
        {...props}
      />
      {secureIcon && (
        <Pressable
          onPress={onPress}
          style={({pressed}) => pressed && pressedItem}>
          <Ionicons
            name={secureTextEntry ? secureIcon : 'eye-outline'}
            size={24}
            color={COLORS.PRIMARY}
          />
        </Pressable>
      )}
    </View>
  );
};

export default UserInputs;

const styles = StyleSheet.create({
  container: {
    height: heightPixel(60),
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  textInputStyles: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  pressedItem: {
    opacity: 0.5,
  },
});
