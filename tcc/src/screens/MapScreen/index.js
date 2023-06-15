import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_API_KEY = 'AIzaSyDnp6LRTU4hYJM0XjY57ywva2hfmiLweH4';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 40.76711,
  longitude: -73.979704,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

function InputAutocomplete({ label, placeholder, onPlaceSelected }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "pt-BR",
        }}
      />
    </>
  );
}

export default function App() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [isDriverFound, setIsDriverFound] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRideCancelled, setIsRideCancelled] = useState(false);
  const [isRequestCreated, setIsRequestCreated] = useState(false);
  const [isSearchingDriver, setIsSearchingDriver] = useState(false);
  const [cancelButtonVisible, setCancelButtonVisible] = useState(true);
  const mapRef = useRef(null);

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (result) => {
    if (result) {
      const { distance, duration } = result;

      setDistance(distance);
      setDuration(duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], {
        edgePadding,
      });
      setIsRequestCreated(true);
      setIsSearchingDriver(true);

      setTimeout(() => {
        setIsSearchingDriver(false);
        setIsDriverFound(true);
        setCancelButtonVisible(true);
      }, 2000);
    }
  };

  const cancelRide = () => {
    setIsRideCancelled(true);
    setIsRequestCreated(false);
    setOrigin(null);
    setDestination(null);
    setDistance(0);
    setDuration(0);
    setCancelButtonVisible(false);
  };

  const resetRide = () => {
    setIsRideCancelled(false);
    setCancelButtonVisible(true);
  };

  const onPlaceSelected = (details, type) => {
    const { geometry } = details;
    const { location } = geometry;
    const { lat, lng } = location;
    const position = {
      latitude: lat,
      longitude: lng,
    };

    if (type === "origin") {
      setOrigin(position);
    } else if (type === "destination") {
      setDestination(position);
    }

    moveTo(position);
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="map" size={24} color="#fff" style={styles.headerIcon} />
        <Text style={styles.headerText}>Mapa</Text>
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        <InputAutocomplete
          label="Origem"
          placeholder="Digite a origem"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "origin");
          }}
        />
        <InputAutocomplete
          label="Destino"
          placeholder="Digite o destino"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "destination");
          }}
        />
        {!isRequestCreated && (
          <TouchableOpacity style={styles.button} onPress={traceRoute}>
            <Ionicons
              name="car"
              size={24}
              color="#fff"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Buscar Motorista</Text>
          </TouchableOpacity>
        )}
        {isSearchingDriver && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Buscando motorista...</Text>
          </View>
        )}
        {isDriverFound && cancelButtonVisible && (
          <View style={styles.driverFoundContainer}>
            <Text style={styles.driverFoundText}>Motorista encontrado!</Text>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelRide}>
              <Text style={styles.cancelButtonText}>Cancelar Corrida</Text>
            </TouchableOpacity>
          </View>
        )}
        {distance && duration ? (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Distância: {distance.toFixed(2)}</Text>
            <Text style={styles.infoText}>Duração: {Math.ceil(duration)} min</Text>
          </View>
        ) : null}
      </View>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 9,
  },
  headerIcon: {
    marginLeft: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    position: "absolute",
    top: Constants.statusBarHeight + 16,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#667eea",
    padding: 8,
    borderRadius: 4,
    elevation: 2,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  driverFoundContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  driverFoundText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: "#ff0000",
    padding: 8,
    borderRadius: 4,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    marginTop: 16,
  },
  infoText: {
    fontSize: 16,
  },
});
