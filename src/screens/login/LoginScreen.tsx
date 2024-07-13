import React, {useRef, useState, useContext} from 'react';
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
import {
  UserInputs,
  PlainButton,
  CustomButtonIcon,
  Loader,
  ErrorMessage,
} from '../../components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {login} from '../../services';
import {AppContext} from '../../context/AppContext';
import {encryptData} from '../../utils/encryption/Encryption';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId:
    '960758974085-vcvj2edd4lpju7qtdute77m56ho3ho7t.apps.googleusercontent.com',
});

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
  const {tokenHandler} = useContext(AppContext);

  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordSecureText = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onGoogleButtonPressed = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      console.log('google token', idToken);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      console.log('google credentials', googleCredential);
    } catch (error) {
      console.log('google signin', error);
    }
  };

  const loginHandler = async () => {
    const {username, password} = loginCredentials;

    setIsLoading(true);

    try {
      await login(username, password).then(async response => {
        if (response.data) {
          const {token, refreshToken} = response.data;
          tokenHandler(token);

          const encryptedRefreshToken = encryptData(
            refreshToken,
            'refresh_token',
          );

          await AsyncStorage.setItem('refresh_token', encryptedRefreshToken);
        }
      });
    } catch (error: any) {
      const {message} = error.response.data;

      setIsErrorVisible(true);
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleErrorModal = () => {
    setIsErrorVisible(!isErrorVisible);
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
          onPress={() => {
            loginHandler();
          }}>
          {STRINGS.SIGN_IN}
        </PlainButton>
        <Text style={orLoginText}>{STRINGS.OR_LOGIN}</Text>
        <View style={buttonsWrapper}>
          <CustomButtonIcon
            onPress={onGoogleButtonPressed}
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
      <Loader isLoading={isLoading} />
      <ErrorMessage
        isVisible={isErrorVisible}
        message={errorMessage}
        onClose={toggleErrorModal}
      />
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
    marginTop: pixelSizeVertical(50),
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
