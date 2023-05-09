import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo a Página Inicial</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Notificações')}>
        <Text style={styles.buttonText}>Ver notificações</Text>
      </TouchableOpacity>
    </View>
  );
};

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar para a página inicial</Text>
      </TouchableOpacity>
    </View>
  );
};

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Página Inicial"
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
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
                  ☺
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e91e63',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
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