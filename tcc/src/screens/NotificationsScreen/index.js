import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styled';

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Nova notificação 1</Text>
      </View>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Nova notificação 2</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar para a página inicial</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationsScreen;
