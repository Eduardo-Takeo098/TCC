import React from 'react';
import { View, Text, Image } from 'react-native';
import { getUserData } from './database'; 
import styles from './styled';

const UserScreen = () => {
  // Obtenha os dados do usuário do banco de dados
  const userData = getUserData();

  if (!userData) {
    // Caso as informações do usuário estejam vazias, renderize o formulário
    return (
      <View style={styles.container}>
        {/* Aqui você pode adicionar os campos para o usuário preencher */}
        <Text>Formulário de Informações do Usuário</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={{ uri: userData.photo }} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userAge}>{userData.age}</Text>
        </View>
      </View>
      <Text style={styles.history}>Histórico de Viagens:</Text>
      {/* Aqui você pode adicionar o histórico de viagens do usuário */}
      <Text style={styles.rating}>Avaliação: {userData.rating}/5</Text>
    </View>
  );
};

export default UserScreen;
