import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import DetailsScreen from '../screens/DetailsScreen';
import UserScreen from '../screens/UserScreen';
import DriverScreen from '../screens/DriverScreen';
import ChatScreen from '../screens/MapScreen/ChatScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Página Inicial"
        screenOptions={{
          drawerActiveTintColor: '#e91e63',
          drawerItemStyle: { marginVertical: 5 },
        }}>
        <Drawer.Screen
          name="Página Inicial"
          component={HomeScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Text
                  style={[
                    styles.icon,
                    { color: focused ? '#e91e63' : '#ccc' },
                  ]}>
                  🏠
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="Perfil"
          component={UserScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Text
                  style={[
                    styles.icon,
                    { color: focused ? '#e91e63' : '#ccc' },
                  ]}>
                  ☺
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="Tela de Mapa"
          component={MapScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Text
                  style={[
                    styles.icon,
                    { color: focused ? '#e91e63' : '#ccc' },
                  ]}>
                  🗺️
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="Notificações"
          component={NotificationsScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Text
                  style={[
                    styles.icon,
                    { color: focused ? '#e91e63' : '#ccc' },
                  ]}>
                  📩
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="Detalhes do Motorista"
          component={DetailsScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Text
                  style={[
                    styles.icon,
                    { color: focused ? '#e91e63' : '#ccc' },
                  ]}>
                  🔍
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="Motorista"
          component={DriverScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Text
                  style={[
                    styles.icon,
                    { color: focused ? '#e91e63' : '#ccc' },
                  ]}>
                  🚗
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Text
                  style={[
                    styles.icon,
                    { color: focused ? '#e91e63' : '#ccc' },
                  ]}>
                  💬
                </Text>
              </View>
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
});

export default App;
