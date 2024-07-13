import AsyncStorage from '@react-native-async-storage/async-storage';
import {decryptData} from '../encryption/Encryption';

const getRefreshToken = async () => {
  const refresh = await AsyncStorage.getItem('refresh_token');
  if (refresh) {
    const decryptedRefreshToken = await decryptData(refresh, 'refresh_token');
    console.log(decryptedRefreshToken);
    return decryptedRefreshToken;
  } else {
    throw new Error('Invalid Refresh Token');
  }
};

export {getRefreshToken};
