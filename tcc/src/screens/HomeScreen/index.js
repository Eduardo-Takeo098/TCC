import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 100,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerBackground: {
    width: '100%',
    height: 450,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#7a7878',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  button1: {
    backgroundColor: '#fff',
    width: 200,
    height: 40,
    borderRadius: 10,
    marginTop: 25,
    marginLeft: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5F58',
    marginLeft: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  mapContainer: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseListContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseListBackground: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  courseListImage: {
    resizeMode: 'cover',
    borderRadius: 20,
  },
  courseListTitle: {
    color: '#2e2c2c',
    fontSize: 16,
    paddingHorizontal: 20,
    width: 200,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#55f2ab',
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  additionalTextContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  additionalText: {
    fontSize: 16,
    color: '#2e2c2c',
    textAlign: 'center',
    marginTop: 10,
  },
});

const HomeScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [showAdditionalText, setShowAdditionalText] = useState(false);

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
    setShowAdditionalText(true);
  };

  const CourseList = ({ img, title, bg }) => (
    <TouchableOpacity
      onPress={handleNavigateDetails}
      style={styles.courseListContainer}
    >
      <ImageBackground
        source={bg}
        style={styles.courseListBackground}
        imageStyle={styles.courseListImage}
      >
        <Image
          source={img}
          style={{ width: 60, height: 60, marginRight: 20 }}
        />
        <View>
          <Text style={styles.courseListTitle} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Carona Solidária</Text>
            <ImageBackground
              source={require('./images/image1.png')}
              style={styles.headerBackground}
            >

              <Pressable
                style={styles.button1}
                onPress={() => Alert.alert('Bem-vindo ao Carona Solidária.')}
              >
                <Ionicons
                  name="md-information-circle"
                  size={24}
                  color="#FF5F58"
                />
                <Text style={styles.buttonText1}>Termos do aplicativo</Text>
              </Pressable>
            </ImageBackground>
          </View>
          <Text style={styles.title}>Sua localização</Text>
          {userLocation && (
            <MapView
              style={styles.mapContainer}
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
          <CourseList
            img={require('./images/icon2.png')}
            title="Atualize seu perfil"
            bg={require('./images/back2.png')}
          />

          {showAdditionalText && (
            <View style={styles.additionalTextContainer}>
              <Text style={styles.additionalText}>
                Para poder utilizar o aplicativo precisamos que você atualize seu perfil com documentos importantes
              </Text>
              <Text style={styles.additionalText}>
                Para fazer isso vai até "Perfil"
              </Text>
            </View>
          )}

          <CourseList
            img={require('./images/icon1.png')}
            title="Atualize seu perfil"
            bg={require('./images/back2.png')}
          />

          {showAdditionalText && (
            <View style={styles.additionalTextContainer}>
              <Text style={styles.additionalText}>
                Para poder virar um motorista e ajudar outras pessoas precisamos que você atualize seu perfil com documentos importantes
              </Text>
              <Text style={styles.additionalText}>
                Para fazer isso vai até "Motorista"
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
