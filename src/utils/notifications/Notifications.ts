import {Linking} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const NAVIGATION_IDS = ['Splash', 'Main'];

function buildDeepLinkFromNotificationData(data: any): string | null {
  console.log('deep link', data);
  //   const navigationId = data?.navigationId;
  //   if (!NAVIGATION_IDS.includes(navigationId)) {
  //     console.log('Unverified navigationId', navigationId);
  //     return null;
  //   }
  //   if (navigationId === 'Splash') {
  //     return 'myapp://Splash';
  //   }
  //   if (navigationId === 'Main') {
  //     return 'myapp://Main';
  //   }
  return null;
}

export const linking = {
  prefixes: ['myapp://'],
  config: {
    initialRouteName: 'Main' as 'Main' | 'Splash',
    screens: {
      Splash: 'Splash',
      Main: 'Main',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    console.log('initial url', url);
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification caused app to open from background state:', remoteMessage)
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};
