import React, {memo} from 'react';
import {StyleSheet, ActivityIndicator, View, Modal, Text} from 'react-native';
import {COLORS, fontPixel, heightPixel} from '../../constants';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({isLoading}) => {
  const {modalContainer, modalWrapper, loadingText} = styles;

  return (
    <Modal animationType="fade" transparent={true} visible={isLoading}>
      <View style={modalContainer}>
        <View style={modalWrapper}>
          <ActivityIndicator size={'large'} color={COLORS.ERROR} />
          <Text style={loadingText} >Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default memo(Loader);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalWrapper: {
    height: heightPixel(100),
    width: '50%',
    backgroundColor: COLORS.BACKGROUND,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: fontPixel(26),
    color: COLORS.SECONDARY,
    marginLeft: 10
  }
});
