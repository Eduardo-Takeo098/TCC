import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '../Database/dbConfig';

const UserScreen = () => {
  const [address, setAddress] = useState('');
  const [cpf, setCPF] = useState('');
  const [number, setNumber] = useState('');
  const [rg, setRG] = useState('');
  const [placa, setPlaca] = useState('');
  const [carteiraMotorista, setCarteiraMotorista] = useState('');
  const [documentoCarro, setDocumentoCarro] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const handleAddData = async () => {
    try {
      await addDoc(collection(db, 'users'), {
        address,
        cpf,
        number,
        rg,
        placa,
        carteiraMotorista,
        documentoCarro,
      });

      setAddress('');
      setCPF('');
      setNumber('');
      setRG('');
      setPlaca('');
      setCarteiraMotorista('');
      setDocumentoCarro('');

      setSnackbarVisible(true);
    } catch (error) {
      console.error('Erro ao adicionar dados:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Comece a ajudar!😁</Text>
        <Text style={styles.subtitle}>Vire um motorista e ganhe dinheiro dirigindo!</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Endereço</Text>
          <TextInput
            label="Endereço"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>CPF</Text>
          <TextInput
            label="CPF"
            value={cpf}
            onChangeText={setCPF}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Número</Text>
          <TextInput
            label="Número"
            value={number}
            onChangeText={setNumber}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>RG</Text>
          <TextInput
            label="RG"
            value={rg}
            onChangeText={setRG}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Placa</Text>
          <TextInput
            label="Placa"
            value={placa}
            onChangeText={setPlaca}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Carteira de Motorista</Text>
          <TextInput
            label="Carteira de Motorista"
            value={carteiraMotorista}
            onChangeText={setCarteiraMotorista}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Documento do Carro</Text>
          <TextInput
            label="Documento do Carro"
            value={documentoCarro}
            onChangeText={setDocumentoCarro}
            style={styles.input}
          />
        </View>
        <Button title="Adicionar dados" onPress={handleAddData} style={styles.button} />
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        style={styles.snackbar}
        duration={3000}
      >
        <Text style={styles.snackbarText}>Dados adicionados com sucesso!</Text>
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputTitle: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
  },
  snackbar: {
    backgroundColor: '#333',
  },
  snackbarText: {
    color: '#FFF',
  },
});

export default UserScreen;
