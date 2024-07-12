import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput as TextInputType,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import {
  COLORS,
  heightPixel,
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  STRINGS,
  IMAGE_PATH,
} from '../../constants';
import {UserInputs, PlainButton, CustomButtonIcon} from '../../components';

const LoginScreen = () => {
  const {
    container,
    loginHeader,
    loginTitle,
    welcomeText,
    contentWrapper,
    forgotPasswordText,
    pressedItem,
    orLoginText,
    buttonsWrapper,
    accountTextWrapper,
    createAccountText,
    haveAccountText,
  } = styles;
  const usernameRef = useRef<TextInputType>(null);
  const passwordRef = useRef<TextInputType>(null);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: '',
  });

  const handlePasswordSecureText = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <SafeAreaView style={container}>
      <View style={loginHeader}>
        <Text style={loginTitle}>Login</Text>
        <Text style={welcomeText}>{STRINGS.WELCOME_Text}</Text>
      </View>
      <View style={contentWrapper}>
        <UserInputs
          inputRef={usernameRef}
          icon="person-outline"
          blurOnSubmit={false}
          placeholder="User name"
          returnKeyType="next"
          placeholderTextColor={COLORS.PRIMARY}
          selectionColor={COLORS.PRIMARY}
          containerStyle={{marginTop: pixelSizeVertical(40)}}
          onChangeText={text =>
            setLoginCredentials({...loginCredentials, username: text})
          }
          onSubmitEditing={() => {
            if (passwordRef.current) {
              passwordRef.current.focus();
            }
          }}
        />
        <UserInputs
          inputRef={passwordRef}
          icon="lock-closed"
          blurOnSubmit={false}
          placeholder="Password"
          secureIcon={'eye-off-outline'}
          onPress={handlePasswordSecureText}
          secureTextEntry={secureTextEntry}
          returnKeyType="done"
          placeholderTextColor={COLORS.PRIMARY}
          selectionColor={COLORS.PRIMARY}
          containerStyle={{marginTop: pixelSizeVertical(20)}}
          onChangeText={text =>
            setLoginCredentials({...loginCredentials, password: text})
          }
        />
        <Pressable style={({pressed}) => pressed && pressedItem}>
          <Text style={forgotPasswordText}>{STRINGS.FORGOT}</Text>
        </Pressable>
        <PlainButton
          containerStyle={{
            height: heightPixel(50),
            marginVertical: pixelSizeVertical(30),
            borderRadius: pixelSizeVertical(30),
          }}
          textStyle={{
            color: COLORS.WHITE,
          }}
          onPress={() => {}}>
          {STRINGS.SIGN_IN}
        </PlainButton>
        <Text style={orLoginText}>{STRINGS.OR_LOGIN}</Text>
        <View style={buttonsWrapper}>
          <CustomButtonIcon
            icon={IMAGE_PATH.GOOGLE}
            containerStyle={{
              backgroundColor: COLORS.WHITE,
              flex: 1,
              marginRight: 10,
            }}
            textStyle={{color: COLORS.TEXT_PRIMARY}}>
            {STRINGS.GOOGLE}
          </CustomButtonIcon>
          <CustomButtonIcon
            icon={IMAGE_PATH.FACEBOOK}
            containerStyle={{
              backgroundColor: COLORS.SURFACE,
              flex: 1,
              marginLeft: 10,
            }}
            textStyle={{color: COLORS.TEXT_PRIMARY}}>
            {STRINGS.FACEBOOK}
          </CustomButtonIcon>
        </View>
        <View style={accountTextWrapper}>
          <Text style={haveAccountText}>{STRINGS.HAVE_ACOOUNT}</Text>
          <Pressable
            onPress={() => {}}
            style={({pressed}) => pressed && pressedItem}>
            <Text style={createAccountText}>{STRINGS.CREATE_ACCOUNT}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  loginHeader: {
    height: heightPixel(250),
    backgroundColor: COLORS.PRIMARY,
    borderBottomLeftRadius: 50,
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: fontPixel(30),
    fontWeight: '700',
    letterSpacing: 2,
    color: COLORS.WHITE,
    marginTop: heightPixel(150),
  },
  welcomeText: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLORS.WHITE,
    marginTop: 10,
  },
  contentWrapper: {
    paddingHorizontal: pixelSizeHorizontal(20),
  },
  forgotPasswordText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: fontPixel(18),
    fontWeight: '500',
    textAlign: 'right',
    marginTop: pixelSizeVertical(10),
  },
  pressedItem: {
    opacity: 0.5,
  },
  orLoginText: {
    fontSize: fontPixel(18),
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: pixelSizeVertical(60),
  },
  accountTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pixelSizeVertical(50)
  },
  haveAccountText: {
    fontSize: fontPixel(18),
    color: COLORS.TEXT_PRIMARY,
  },
  createAccountText: {
    color: COLORS.SECONDARY,
    fontSize: fontPixel(20),
    fontWeight: 'bold',
    marginLeft: 8,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.SECONDARY,
  },
});
