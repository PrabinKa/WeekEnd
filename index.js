/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';
import { useEffect } from 'react';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'default',
    vibration: true,
    importance: AndroidImportance.HIGH,
  });

  try {
    await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
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
});

function HeadlessCheck({isHeadless}) {
  useEffect(() => {
    const unsubscribe = notifee.onBackgroundEvent(async ({type, detail}) => {
      switch (type) {
        case EventType.PRESS:
          console.log('user pressed notification');
          await notifee.cancelNotification(detail.notification.id);
          break;
        case EventType.DISMISSED:
          console.log('User dismissed the notification');
          break;
      }
    });

    return unsubscribe;
  }, []);

  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
