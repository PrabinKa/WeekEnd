import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import { COLORS } from '../../constants';

interface ErrorMessageProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({isVisible, message, onClose}) => {
  const {
    modalContainer,
    modalContent,
    modalTitle,
    modalMessage,
    closeButton,
    closeButtonText,
  } = styles;

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={modalContainer}>
        <View style={modalContent}>
          <Text style={modalTitle}>Error !</Text>
          <Text style={modalMessage}>{message}</Text>
          <TouchableOpacity style={closeButton} onPress={onClose}>
            <Text style={closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.TEXT_PRIMARY,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: COLORS.ERROR,
  },
  closeButton: {
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    backgroundColor: COLORS.ERROR,
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
});