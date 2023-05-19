import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styled';

const RideDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const ride = route.params?.ride;

  const goBackToHome = () => {
    navigation.navigate('HomeScreen');
  };

  if (!ride) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>Detalhes do passeio não disponíveis.</Text>
        <TouchableOpacity style={styles.button} onPress={goBackToHome}>
          <Text style={styles.buttonText}>Voltar para a tela inicial</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{ride.title}</Text>
        <Text style={styles.detailsText}>Origem: {ride.origin}</Text>
        <Text style={styles.detailsText}>Destino: {ride.destination}</Text>
        <Text style={styles.detailsText}>Data: {ride.date}</Text>
        <Text style={styles.detailsText}>Horário: {ride.time}</Text>
        {/* Outras informações sobre a carona, como o nome do motorista, o número de assentos disponíveis, etc. */}
      </View>
      <TouchableOpacity style={styles.button} onPress={goBackToHome}>
        <Text style={styles.buttonText}>Voltar para a tela inicial</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RideDetailsScreen;
