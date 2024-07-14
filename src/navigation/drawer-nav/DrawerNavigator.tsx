import React, {useState, useContext, useEffect} from 'react';
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import BottomTabNav from '../bottom-tab/BottomTabNav';
import {ProfileScreen, UsersList} from '../../screens';
import {
  COLORS,
  DRAWER_ICONS,
  DRAWER_SCREENS,
  fontPixel,
  heightPixel,
  IMAGE_PATH,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../../constants';
import {AppContext} from '../../context/AppContext';
import {fetchCurrentUser} from '../../services';

const Drawer = createDrawerNavigator();

interface CustomDrawerItemProps {
  icon: ImageProps;
  label: string;
  isFocused?: boolean;
  onPress: () => void;
}

const CustomDrawerItem: React.FC<CustomDrawerItemProps> = ({
  icon,
  label,
  isFocused,
  onPress,
}) => {
  // console.log("label", label)
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        flexDirection: 'row',
        height: heightPixel(45),
        marginBottom: pixelSizeVertical(20),
        alignItems: 'center',
        paddingLeft: pixelSizeHorizontal(15),
        borderRadius: 10,
        backgroundColor: isFocused ? COLORS.WHITE : COLORS.PRIMARY,
      }}
      onPress={onPress}>
      <Image
        source={icon}
        style={{
          width: heightPixel(25),
          height: heightPixel(25),
          tintColor: isFocused ? COLORS.PRIMARY : COLORS.WHITE,
        }}
      />
      <Text
        style={{
          marginLeft: pixelSizeHorizontal(10),
          color: isFocused ? COLORS.PRIMARY : COLORS.WHITE,
          fontSize: fontPixel(18),
          fontWeight: 'bold',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface CustomDrawerContentProps {
  navigation: any;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
  navigation,
}) => {
  const [selectedTab, setSelectedTab] = useState('Home');
  const {token, tokenHandler} = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profileImage: '',
    phone: '',
  });

  const logoutHanlder = () => {
    Alert.alert('logout', 'You want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => tokenHandler('')},
    ]);
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
  }, []);

  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{flex: 1}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: pixelSizeHorizontal(10),
          paddingTop: pixelSizeVertical(10),
        }}>
        <View>
          {currentUser.profileImage ? (
            <Image
              source={{uri: currentUser.profileImage}}
              resizeMode="contain"
              style={{
                width: heightPixel(80),
                height: heightPixel(80),
                borderRadius: 40,
              }}
            />
          ) : (
            <Image
              source={IMAGE_PATH.PROFILE}
              resizeMode="contain"
              style={{
                width: heightPixel(80),
                height: heightPixel(80),
                borderRadius: 40,
              }}
            />
          )}
          <View style={{marginLeft: 5, justifyContent: 'center'}}>
            <Text
              style={{
                color: COLORS.WHITE,
                fontWeight: 'bold',
                fontSize: fontPixel(18),
                marginTop: pixelSizeVertical(10),
              }}>
              {`${currentUser?.firstName} ${currentUser?.lastName}`}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: fontPixel(14),
              }}>
              {currentUser?.email}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, marginTop: pixelSizeVertical(40)}}>
          <CustomDrawerItem
            label={DRAWER_SCREENS.home}
            icon={DRAWER_ICONS.home}
            isFocused={selectedTab == DRAWER_SCREENS.home}
            onPress={() => {
              setSelectedTab(DRAWER_SCREENS.home);
              navigation.navigate('Home');
            }}
          />
          <CustomDrawerItem
            label={DRAWER_SCREENS.profile}
            icon={DRAWER_ICONS.profile}
            isFocused={selectedTab == DRAWER_SCREENS.profile}
            onPress={() => {
              setSelectedTab(DRAWER_SCREENS.profile);
              navigation.navigate('Profile');
            }}
          />
          <CustomDrawerItem
            label={DRAWER_SCREENS.users}
            icon={DRAWER_ICONS.users}
            isFocused={selectedTab == DRAWER_SCREENS.users}
            onPress={() => {
              setSelectedTab(DRAWER_SCREENS.users);
              navigation.navigate('Users List');
            }}
          />
        </View>
        <View>
          <CustomDrawerItem
            label={DRAWER_SCREENS.logout}
            icon={DRAWER_ICONS.logout}
            onPress={() => {
              logoutHanlder();
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.BACKGROUND}}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'front',
          drawerStyle: {
            flex: 1,
            width: '60%',
            paddingRight: pixelSizeHorizontal(10),
            backgroundColor: COLORS.SURFACE,
          },
          headerShown: false,
        }}
        drawerContent={props => {
          return <CustomDrawerContent navigation={props.navigation} />;
        }}
        initialRouteName="Home">
        <Drawer.Screen name="Home">
          {props => <BottomTabNav {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Profile">
          {props => <ProfileScreen {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Users List">
          {props => <UsersList {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default DrawerNavigator;
