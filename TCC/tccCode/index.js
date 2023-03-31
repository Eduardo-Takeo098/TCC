import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';

import { NavigationContainer } from '@react-navigation/native';


function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}

const Teste = () => {
    <SafeAreaView>
        <Text>...</Text>
    </SafeAreaView>
}

export default () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Teste />
        </PersistGate>
    </Provider>
)