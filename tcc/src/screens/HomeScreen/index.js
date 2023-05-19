import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { styles } from './styled';
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de localização negada.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleNavigateDetails = () => {
    navigation.navigate('DetailsScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Encontre uma carona</Text>
          {userLocation && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker coordinate={userLocation} />
            </MapView>
          )}
          <TouchableOpacity style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite o seu destino"
              placeholderTextColor="#888"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNavigateDetails}
            style={styles.detailsButton}
          >
            <View style={styles.detailsButtonContent}>
              <Image
                source={require('./images/detalhes.png')}
                style={styles.detailsButtonImage}
              />
              <Text style={styles.detailsButtonText}>Ver detalhes</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Buscar Carona</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
