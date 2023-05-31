import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const MapScreen = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [directionSteps, setDirectionSteps] = useState([]);

  useEffect(() => {
    if (origin && destination) {
      getDirections();
    }
  }, [origin, destination]);

  const handleOriginSelect = (data, details) => {
    const { description, geometry } = details;
    const { location } = geometry;

    setOrigin({
      description,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const handleDestinationSelect = (data, details) => {
    const { description, geometry } = details;
    const { location } = geometry;

    setDestination({
      description,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const getDirections = () => {
    const originLatLng = `${origin.latitude},${origin.longitude}`;
    const destinationLatLng = `${destination.latitude},${destination.longitude}`;


    const url = `http://localhost:3000/directions?origin=${originLatLng}&destination=${destinationLatLng}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          const { routes } = data;
          const { overview_polyline, legs } = routes[0];
          const { steps } = legs[0];

          const coordinates = decodePolyline(overview_polyline.points);

          setRouteCoordinates(coordinates);
          setDirectionSteps(steps);
        } else {
          console.error('Error getting directions:', data);
        }
      })
      .catch(error => {
        console.error('Error getting directions:', error);
      });
  };

  const decodePolyline = polyline => {
    const points = [];
    let index = 0;
    const len = polyline.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;

      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return points;
  };

  const getMapRegion = () => {
    if (routeCoordinates.length > 0) {
      const latitudes = routeCoordinates.map(coordinate => coordinate.latitude);
      const longitudes = routeCoordinates.map(coordinate => coordinate.longitude);
      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);

      const margin = 0.1;

      return {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: (maxLat - minLat) + margin,
        longitudeDelta: (maxLng - minLng) + margin,
      };
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={origin && { ...origin, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        region={getMapRegion()}
      >
        {origin && <Marker coordinate={origin} title="Origem" />}
        {destination && <Marker coordinate={destination} title="Destino" />}
        {routeCoordinates.length > 0 && (
          <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="#1a66ff" />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        {/* Componente para selecionar a origem */}
        <GooglePlacesAutocomplete
          placeholder="Sua localização"
          onPress={handleOriginSelect}
          fetchDetails
          query={{
            key: 'AIzaSyDnp6LRTU4hYJM0XjY57ywva2hfmiLweH4',
            language: 'pt-BR',
          }}
        />
        {/* Componente para selecionar o destino */}
        <GooglePlacesAutocomplete
          placeholder="Seu destino"
          onPress={handleDestinationSelect}
          fetchDetails
          query={{
            key: 'AIzaSyDnp6LRTU4hYJM0XjY57ywva2hfmiLweH4',
            language: 'pt-BR',
          }}
        />
      </View>
      <View style={styles.directionsContainer}>
        {directionSteps.map((step, index) => (
          <View key={index} style={styles.directionStep}>
            <Text>{step.instructions}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
  },
  directionsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  directionStep: {
    marginBottom: 10,
  },
});

export default MapScreen;
