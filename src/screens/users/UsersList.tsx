import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {ParamListBase} from '@react-navigation/routers';
import {ErrorMessage, Loader, TabHeader} from '../../components';
import {useAppDispatch, useAppSelector} from '../../redux/hooks/hooks';
import {fetchUsers} from '../../redux/user/UserSlice';
import {
  COLORS,
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../../constants';
import {FlatList} from 'react-native';

const {height} = Dimensions.get('window');

type UserListProps = {
  route: RouteProp<ParamListBase, 'Users List'>;
  navigation: any;
};

const UsersList: React.FC<UserListProps> = ({navigation}) => {
  const {
    container,
    userContainer,
    userImageStyles,
    contentWrapper,
    emailStyles,
    nameStyles,
  } = styles;
  const {usersCollection, status, error} = useAppSelector(state => state.users);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  console.log(status, error, usersCollection);

  useEffect(() => {
    if (status == 'idle') {
      dispatch(fetchUsers());
    }

    if (error) {
      setErrorMessage(error);
      setIsVisible(true);
    }

    if (status == 'pending') {
      setIsLoading(true);
    }
  }, [dispatch]);

  const toggleErrorModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <TabHeader navigation={navigation}>
      <View style={container}>
          <FlatList
            data={usersCollection}
            keyExtractor={(item, index) => `${index}User${item.age}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: pixelSizeHorizontal(15),
              marginTop: pixelSizeVertical(20)
            }}
            renderItem={({item, index}) => {
              return (
                <View style={userContainer}>
                  <Image source={{uri: item.image}} style={userImageStyles} />
                  <View style={contentWrapper}>
                    <Text
                      style={
                        nameStyles
                      }>{`${item.firstName} ${item.lastName}`}</Text>
                    <Text style={emailStyles}>{item.email}</Text>
                  </View>
                </View>
              );
            }}
          />
        <Loader isLoading={isLoading} />
        <ErrorMessage
          isVisible={isVisible}
          message={errorMessage}
          onClose={toggleErrorModal}
        />
      </View>
    </TabHeader>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    marginBottom: pixelSizeVertical(20),
    paddingVertical: pixelSizeVertical(10),
    paddingHorizontal: pixelSizeHorizontal(5),
    borderRadius: 7,
    elevation: 3,
  },
  userImageStyles: {
    height: heightPixel(55),
    width: heightPixel(55),
  },
  contentWrapper: {
    justifyContent: 'space-between',
    marginLeft: 5,
  },
  nameStyles: {
    fontSize: fontPixel(22),
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  emailStyles: {
    fontSize: fontPixel(16),
    fontWeight: '500',
    color: COLORS.TEXT_PRIMARY,
  },
});
