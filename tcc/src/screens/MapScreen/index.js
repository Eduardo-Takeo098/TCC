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
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
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

  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };

  const onPlaceSelected = (details, flag) => {
    const set = flag === "origin" ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  return (
    <LinearGradient
      colors={["#667eea", "#764ba2"]}
      style={styles.container}
    >
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
        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Ionicons name="car" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Buscar Motorista</Text>
        </TouchableOpacity>
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
    margin: 10,
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
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#6c63ff",
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  infoContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  infoText: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
