import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styled';
import { getRideDetails } from './detailsApi';

const RideDetailsScreen = () => {
  const navigation = useNavigation();
  const [ride, setRide] = useState(null);

  const goBackToHome = () => {
    navigation.navigate('HomeScreen');
  };

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const rideDetails = await getRideDetails();
        setRide(rideDetails);
      } catch (error) {
        console.error('Erro ao buscar os detalhes da viagem:', error);
      }
    };

    fetchRideDetails();
  }, []);

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