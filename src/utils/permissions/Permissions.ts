import {check, request, RESULTS, Permission} from 'react-native-permissions';

const checkPermissions = async (permission: Permission) => {
  try {
    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const requestPermissions = async (permission: Permission) => {
  try {
    const result = await request(permission);

    return result === RESULTS.GRANTED;
  } catch (error) {
    return false;
  }
};

export {checkPermissions, requestPermissions};