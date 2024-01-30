import { isAndroid } from '@/theme/platform';
import { getFromLS, saveToLS } from '@/utils/storage';
import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  isAndroid &&
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

  if (enabled) {
    getToken();
  }
};

const getToken = async () => {
  let fcmToken = await getFromLS('__fcmtoken__');

  // console.log(fcmToken, 'OLD TOKEN');
  if (!fcmToken) {
    try {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        // console.log(fcmToken, 'NEW TOKEN');
        await saveToLS('__fcmtoken__', fcmToken);
      }
    } catch (error: any) {
      crashlytics().recordError(error, Platform.OS);
      console.log('ERROR OCCUURRED TOKEN: ', isAndroid, error);
    }
  }
};

export const NoficationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    const title = remoteMessage?.notification?.title as string;
    Alert.alert(title, remoteMessage.notification?.body);
    console.log(
      'Notification caused the app to open:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state: ',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    const title = remoteMessage?.notification?.title as string;
    Alert.alert(title, remoteMessage?.notification?.body);
    console.log('notification on foreground state', remoteMessage);
  });
};
