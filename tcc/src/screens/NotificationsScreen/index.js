import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styled';

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const goBackToHome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Nova notificação 1</Text>
      </View>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Nova notificação 2</Text>
      </View>
      <TouchableOpacity onPress={goBackToHome} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar para a página inicial</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationsScreen;
