import React, {useRef, useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TextInput as TextInputType,
} from 'react-native';
import {UserInputs, TabHeader} from '../../components';
import {
  COLORS,
  fontPixel,
  heightPixel,
  IMAGE_PATH,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../../constants';
import {RouteProp} from '@react-navigation/native';
import {ParamListBase} from '@react-navigation/routers';
import {refreshAccessToken} from '../../services/auth/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decryptData} from '../../utils/encryption/Encryption';
import {getRefreshToken} from '../../utils';
import {fetchCurrentUser} from '../../services/auth/AuthService';
import {AppContext} from '../../context/AppContext';

type ProfileScreenProps = {
  route: RouteProp<ParamListBase, 'Profile'>;
  navigation: any;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const {
    container,
    userImageWrapper,
    profileWrapper,
    imageStyles,
    userNameText,
    designationText,
    inputTitle,
  } = styles;

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const emailRef = useRef<TextInputType>(null);
  const phoneRef = useRef<TextInputType>(null);
  const webRef = useRef<TextInputType>(null);
  const passwordRef = useRef<TextInputType>(null);
  const {token} = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profileImage: '',
    phone: '',
  });

  console.log(currentUser);

  const hanldePasswordSecureText = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const user = await fetchCurrentUser(token);
          if (user) {
            const {email, firstName, lastName, password, phone, image} = user;
            setCurrentUser({
              ...currentUser,
              email,
              firstName,
              lastName,
              password,
              phone,
              profileImage: image,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <TabHeader navigation={navigation}>
      <View style={container}>
        <View style={userImageWrapper}>
          <View style={profileWrapper}>
            {currentUser.profileImage ? (
              <Image
                source={{uri: currentUser.profileImage}}
                style={imageStyles}
              />
            ) : (
              <Image source={IMAGE_PATH.PROFILE} style={imageStyles} />
            )}
          </View>
          <Text
            style={
              userNameText
            }>{`${currentUser?.firstName} ${currentUser?.lastName}`}</Text>
          <Text style={designationText}>React Native</Text>
        </View>
        <View style={{paddingVertical: pixelSizeVertical(20)}}>
          <View style={{marginTop: pixelSizeVertical(20)}}>
            <Text style={inputTitle}>Your Email</Text>
            <UserInputs
              inputRef={emailRef}
              placeholder="xxx@gmail.com"
              icon="mail"
              value={currentUser?.email}
              blurOnSubmit={false}
              returnKeyType="next"
              placeholderTextColor={COLORS.PRIMARY}
              selectionColor={COLORS.PRIMARY}
              containerStyle={{marginTop: pixelSizeVertical(10)}}
              onSubmitEditing={() => {
                if (phoneRef.current) {
                  phoneRef.current.focus();
                }
              }}
            />
          </View>
          <View style={{marginTop: pixelSizeVertical(20)}}>
            <Text style={inputTitle}>Phone Number</Text>
            <UserInputs
              inputRef={phoneRef}
              placeholder="9811....."
              icon="phone-portrait-outline"
              value={currentUser?.phone}
              blurOnSubmit={false}
              returnKeyType="next"
              placeholderTextColor={COLORS.PRIMARY}
              selectionColor={COLORS.PRIMARY}
              containerStyle={{marginTop: pixelSizeVertical(10)}}
              onSubmitEditing={() => {
                if (webRef.current) {
                  webRef.current.focus();
                }
              }}
            />
          </View>
          <View style={{marginTop: pixelSizeVertical(20)}}>
            <Text style={inputTitle}>Website</Text>
            <UserInputs
              inputRef={webRef}
              placeholder="www.gfx.com"
              blurOnSubmit={false}
              returnKeyType="next"
              placeholderTextColor={COLORS.PRIMARY}
              selectionColor={COLORS.PRIMARY}
              containerStyle={{marginTop: pixelSizeVertical(10)}}
              onSubmitEditing={() => {
                if (passwordRef.current) {
                  passwordRef.current.focus();
                }
              }}
            />
          </View>
          <View style={{marginTop: pixelSizeVertical(20)}}>
            <Text style={inputTitle}>Password</Text>
            <UserInputs
              inputRef={passwordRef}
              placeholder="xxxxxxxx"
              returnKeyType="done"
              icon="lock-closed"
              value={currentUser?.password}
              placeholderTextColor={COLORS.PRIMARY}
              selectionColor={COLORS.PRIMARY}
              containerStyle={{marginTop: pixelSizeVertical(10)}}
              secureIcon="eye-off-outline"
              secureTextEntry={secureTextEntry}
              onPress={hanldePasswordSecureText}
            />
          </View>
        </View>
      </View>
    </TabHeader>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: pixelSizeHorizontal(20),
  },
  userImageWrapper: {
    paddingVertical: pixelSizeVertical(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileWrapper: {
    height: heightPixel(120),
    width: heightPixel(120),
  },
  imageStyles: {
    height: '100%',
    width: '100%',
  },
  userNameText: {
    fontSize: fontPixel(26),
    color: COLORS.TEXT_PRIMARY,
    fontWeight: 'bold',
  },
  designationText: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
});
