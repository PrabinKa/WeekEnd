import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Alert,
  Linking,
} from 'react-native';
import {TabHeader} from '../../components';
import {COLORS} from '../../constants';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {container} = styles;
  const [notificationPermission, setNotificationPermission] =
    useState<boolean>(false);

  useEffect(() => {
    checkAndRequestPermission();
  }, []);

  const checkAndRequestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      setNotificationPermission(true);
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ).then(result => {
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          getFcmToken();
          setNotificationPermission(true);
        } else {
          Alert.alert(
            'Permission denied.',
            'Please allow permission to send you notifications.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'OK', onPress: () => Linking.openSettings()},
            ],
          );
        }
      });
    }
  };

  const getFcmToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();

      if (fcmToken) {
        console.log('token', fcmToken);
        return fcmToken;
      } else {
        console.log('Failed to generate FCM token');
      }
    } catch (error) {
      console.log('Error registering app with FCM');
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the foreground!', remoteMessage);

      await onDisplayNotification(remoteMessage);
    });
    // Handle notification actions for Android
    const handleForegroundEvent = async () => {
      await notifee.onForegroundEvent(async ({type, detail}) => {
        if (type === EventType.PRESS && detail.pressAction) {
          switch (detail.pressAction.id) {
            case 'cancel':
              console.log('User pressed cancel');
              break;
            case 'open':
              console.log('User pressed open');
              navigation.navigate('Profile');
              break;
            default:
              break;
          }
        }
      });
    };

    handleForegroundEvent();

    return unsubscribe;
  }, []);

  const onDisplayNotification = async (message: any) => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'default',
      vibration: true,
      importance: AndroidImportance.HIGH,
    });
    const screenName = 'Main';

    try {
      await notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
        data: {
          ...message.data,
          screenName,
        },
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      });
    } catch (error) {
      console.log('error displaying notification', error);
    }
  };

  return (
    <TabHeader navigation={navigation}>
      <View style={container}>
        <Text>HomeScreen</Text>
      </View>
    </TabHeader>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
