import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
  ReactNode,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput as TextInputType,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {UserInputs, TabHeader, Loader} from '../../components';
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
import {fetchCurrentUser} from '../../services/auth/AuthService';
import {AppContext} from '../../context/AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PERMISSIONS} from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import {checkPermissions, requestPermissions} from '../../utils';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

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
    bottomSheetContainer,
    sheetButton,
    buttonIconWrapper,
    buttonTextStyles,
  } = styles;

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const emailRef = useRef<TextInputType>(null);
  const phoneRef = useRef<TextInputType>(null);
  const webRef = useRef<TextInputType>(null);
  const passwordRef = useRef<TextInputType>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {token} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [snapPoints, setSnapPoints] = useState([1, 300, 300]);
  const [currentUser, setCurrentUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profileImage: '',
    phone: '',
  });

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  };

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const hanldePasswordSecureText = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const fetchUser = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const onPressOpenMediaLibrary = async () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    checkPermissions(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(res => {
      if (!res) {
        requestPermissions(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(res => {
          if (res) {
            ImageCropPicker.openPicker({
              cropping: true,
              mediaType: 'photo',
            })
              .then(image => {
                setCurrentUser({...currentUser, profileImage: image.path});
              })
              .catch(error => {
                console.log('error', error);
              });
          } else {
            Alert.alert(
              'Permission denied.',
              'Please allow permission to open Gallery.',
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK', onPress: () => Linking.openSettings()},
              ],
            );
          }
        });
      } else {
        ImageCropPicker.openPicker({
          cropping: true,
          mediaType: 'photo',
        })
          .then(image => {
            setCurrentUser({...currentUser, profileImage: image.path});
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  const onPressOpenCamera = async () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    checkPermissions(PERMISSIONS.ANDROID.CAMERA).then(res => {
      if (!res) {
        requestPermissions(PERMISSIONS.ANDROID.CAMERA).then(res => {
          if (res) {
            ImageCropPicker.openCamera({
              cropping: true,
            })
              .then(image => {
                setCurrentUser({...currentUser, profileImage: image.path});
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            Alert.alert(
              'Permission denied.',
              'Please allow permission to open camera.',
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK', onPress: () => Linking.openSettings()},
              ],
            );
          }
        });
      } else {
        ImageCropPicker.openCamera({
          cropping: true,
        })
          .then(image => {
            setCurrentUser({...currentUser, profileImage: image.path});
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  interface SheetButtonsProps {
    children: ReactNode;
    icon: string;
    onPress: () => void;
  }

  const SheetButtons = ({children, icon, onPress}: SheetButtonsProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={sheetButton}>
        <View style={buttonIconWrapper}>
          <Ionicons name={icon} size={25} color={COLORS.WHITE} />
        </View>
        <Text style={buttonTextStyles}>{children}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <TabHeader navigation={navigation}>
      <View style={container}>
        <View style={userImageWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => openBottomSheet()}
            style={profileWrapper}>
            {currentUser.profileImage ? (
              <Image
                source={{uri: currentUser.profileImage}}
                style={imageStyles}
              />
            ) : (
              <Image source={IMAGE_PATH.PROFILE} style={imageStyles} />
            )}
          </TouchableOpacity>
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
        {/* <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <BottomSheetView style={bottomSheetContainer}>
            <SheetButtons
              onPress={() => onPressOpenCamera()}
              icon="camera-outline">
              Pick By Camera
            </SheetButtons>
            <SheetButtons
              onPress={() => onPressOpenMediaLibrary()}
              icon="images-outline">
              Choose By Gallery
            </SheetButtons>
            <SheetButtons onPress={() => {}} icon="person-circle-outline">
              Remove Profile Picture
            </SheetButtons>
          </BottomSheetView>
        </BottomSheet> */}
      </View>
      <Loader isLoading={isLoading} />
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
    borderRadius: heightPixel(60),
    borderColor: COLORS.SURFACE,
    borderWidth: 3,
    overflow: 'hidden'
  },
  imageStyles: {
    height: '100%',
    width: '100%',
    borderRadius: heightPixel(60),
    resizeMode: 'stretch',
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
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: pixelSizeHorizontal(15),
  },
  sheetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: pixelSizeVertical(10),
  },
  buttonIconWrapper: {
    padding: 10,
    backgroundColor: `${COLORS.PRIMARY}30`,
    borderRadius: 30,
  },
  buttonTextStyles: {
    color: COLORS.WHITE,
    fontSize: fontPixel(22),
    marginLeft: pixelSizeHorizontal(5),
  },
});
